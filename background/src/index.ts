import 'dotenv/config';
import Airtable from 'airtable';
import { prisma } from './prisma';

Airtable.configure({
    apiKey: process.env.AIRTABLE_API_KEY,
    endpointUrl: 'https://api.airtable.com',
});
const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);
const eventsTable = base('events');

export async function listOfEventWebsiteData() {
    return (await eventsTable.select({
        view: 'Everything',
        // filterByFormula: '{website_active} = 1',
        fields: [
            'slug', //string
            'website_json', //string
            'website_active' //boolean
        ]
    }).all())
}

const POLL_INTERVAL = parseInt(process.env.AIRTABLE_POLL_INTERVAL || '300000', 10);

class AirtableSyncWorker {
    private intervalId: NodeJS.Timeout | null = null;
    private isRunning = false;

    async syncEvents() {
        console.log(`[${new Date().toISOString()}] Starting Airtable sync...`);
        
        try {
            const records = await listOfEventWebsiteData();

            console.log(`Fetched ${records.length} active events from Airtable`);

            for (const record of records) {
                const slug = record.get('slug') as string;
                const websiteJson = record.get('website_json') as string;
                const websiteActive = record.get('website_active') === true;
                
                if (!slug) {
                    console.warn(`Skipping record ${record.id}: missing slug`);
                    continue;
                }

                let data: any;
                try {
                    data = websiteJson ? JSON.parse(websiteJson) : {};
                } catch (error) {
                    console.error(`Error parsing JSON for slug ${slug}:`, error);
                    data = {};
                }

                await prisma.satellite.upsert({
                    where: { slug },
                    update: {
                        recordId: record.id,
                        data,
                        active: websiteActive,
                        updatedAt: new Date(),
                    },
                    create: {
                        recordId: record.id,
                        slug,
                        data,
                        active: websiteActive,
                    },
                });

                console.log(`✓ Synced: ${slug} - Active: ${websiteActive}`);
            }

            const inactiveCount = await prisma.satellite.updateMany({
                where: {
                    slug: {
                        notIn: records.map(r => r.get('slug') as string).filter(Boolean),
                    },
                    active: true,
                },
                data: {
                    active: false,
                },
            });

            if (inactiveCount.count > 0) {
                console.log(`Marked ${inactiveCount.count} events as inactive`);
            }

            console.log(`[${new Date().toISOString()}] Sync completed successfully`);
        } catch (error) {
            console.error(`[${new Date().toISOString()}] Sync failed:`, error);
        }
    }

    async start() {
        if (this.isRunning) {
            console.warn('Airtable sync worker already running');
            return;
        }

        this.isRunning = true;
        console.log(`Starting Airtable sync worker (interval: ${POLL_INTERVAL}ms)`);
        
        await this.syncEvents();
        
        this.intervalId = setInterval(async () => {
            await this.syncEvents();
        }, POLL_INTERVAL);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
        console.log('Airtable sync worker stopped');
    }
}

export const airtableSyncWorker = new AirtableSyncWorker();

airtableSyncWorker.start();
