import 'dotenv/config';
const { AIRTABLE_API_KEY, AIRTABLE_BASE_ID } = process.env;

import Airtable from 'airtable';
let airtableBase: any = null;

if (AIRTABLE_API_KEY && AIRTABLE_BASE_ID) {
	airtableBase = new Airtable({ apiKey: AIRTABLE_API_KEY }).base(AIRTABLE_BASE_ID);
}

export interface EventLocation {
	slug: string;
	lat: number;
	long: number;
	event_name: string;
}

interface AirtableRecord {
	id: string;
	fields: EventLocation;
}

export interface EventLocationWithDistance extends EventLocation {
	distance: number;
}

export async function fetchEventsLoc() {
    return (await airtableBase('events').select({
        view: 'Everything',
        // filterByFormula: '{website_active} = 1', 
        fields: [
            'slug', //string
            'event_name', //string
            'lat', //number
            'long', //number
            'website_active' //boolean
        ]
    }).all()) as AirtableRecord[]
}


// Cache to avoid multiple geocoding during build
let cachedEvents: EventLocation[] | null = null;

export async function loadEventsLoc(): Promise<EventLocation[]> {
	// do nothing if the API keys aren't set
	if (!AIRTABLE_API_KEY || !AIRTABLE_BASE_ID) {
		return [];
	}
	
	if (cachedEvents) {
		return cachedEvents;
	}

	console.log("Geocoding all events")

	try {		
		// Fetch all approved events from Airtable with pagination
        const locations = await fetchEventsLoc();

        return locations.map(location => location.fields);
	} catch (error) {
		console.error('Failed to fetch event data:', error);
		cachedEvents = [];
		return [];
	}
}

// Haversine formula to calculate distance between two points in miles
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
	const R = 3959; // Earth's radius in miles
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLng = (lng2 - lng1) * Math.PI / 180;
	const a = 
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
		Math.sin(dLng / 2) * Math.sin(dLng / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // Distance in miles
}
