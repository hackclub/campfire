import { z } from 'zod';

export const SatelliteContentSchema = z.object({
    version: z.number().optional(),
    error: z.string().optional(),
    cancelled: z.boolean().optional(),
    localization: z.object({
        hero: z.object({
            campfire: z.string(),
            subtitle: z.string(),
            hostedAt: z.string(),
            emailPlaceholder: z.string(),
            ctaPrimary: z.string(),
            ctaSecondary: z.string(),
            ctaSecondaryPrefix: z.string(),
            ctaSecondarySuffix: z.string(),
            videoLabel: z.string().optional(),
            mapLabel: z.string(),
        }).strict(),
        nav: z.record(z.string(), z.string()),
        steps: z.object({
            stepLabel: z.string().optional(),
            step1: z.string(),
            step2: z.string(),
            step3: z.string(),
            step4: z.string(),
            guideButton: z.string(),
        }).strict(),
        letter: z.object({
            greeting: z.string(),
            paragraph1: z.string(),
            paragraph2: z.string(),
            paragraph3: z.string(),
            paragraph4: z.string(),
            closing: z.string(),
            signature: z.string(),
        }).strict(),
        schedule: z.object({
            title: z.string(),
        }).strict(),
        sponsors: z.object({
            title: z.string(),
        }).strict(),
        signatures: z.object({
            title: z.string(),
        }).strict(),
        footer: z.object({
            tagline: z.string(),
            copyright: z.string(),
            description: z.string(),
            closing: z.string(),
            links: z.array(z.object({
                text: z.string(),
                href: z.string(),
            }).strict()),
        }).strict(),
    }).strict(),
    event: z.object({
        city: z.string(),
        date: z.string(),
        venue: z.object({
            name: z.string(),
            link: z.string(),
        }).strict(),
        schedule: z.object({
            days: z.array(z.object({
                date: z.string(),
                items: z.array(z.object({
                    time: z.string(),
                    activity: z.string(),
                }).strict()),
            }).strict()),
        }).strict(),
        sponsors: z.object({
            cards: z.array(z.object({
                sponsor: z.string(),
                logo: z.string(),
                link: z.string(),
            }).strict()),
        }).strict(),
        signatures: z.union([
            z.literal(false),
            z.object({ img: z.string() }).strict(),
        ]).optional(),
        faq: z.object({
            title: z.string(),
            participant: z.object({
                title: z.string(),
                questions: z.array(z.object({
                    question: z.string(),
                    answer: z.string(),
                }).strict()),
                buttonText: z.string(),
                buttonLink: z.string().optional()
            }).strict(),
            organizer: z.object({
                title: z.string(),
                questions: z.array(z.object({
                    question: z.string(),
                    answer: z.string(),
                }).strict()),
                buttonText: z.string(),
                buttonLink: z.string().optional()
            }).strict().optional(),
        }).strict(),
        contactUs: z.object({
            email: z.string().optional(),
            instagram: z.string().optional(),
            linkedin: z.string().optional(),
        }).strict().optional(),
    }).strict(),
}).strict();

export type SatelliteContent = z.infer<typeof SatelliteContentSchema>;
