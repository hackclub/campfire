import { prisma } from "./prisma";

export async function getSatelliteSlugs(): Promise<string[]> {
    const slugs = await prisma.satellite.findMany({
        select: {
            slug: true,
        },
    })

    return slugs.map((s: { slug: string }) => s.slug)
}

export async function getSatelliteData(slug: string) {
  return prisma.satellite.findUnique({
    where: {
      slug,
    },
  });
}

export type SatelliteContent = {
    hero: {
        title: string;
        city: string;
        subtitle: string;
        date: string;
        emailPlaceholder: string;
        ctaPrimary: string;
        ctaSecondary: string;
        ctaSecondaryPrefix: string;
        ctaSecondarySuffix: string;
        videoLabel: string;
    },
    nav: {
        howToOrganize: string;
        schedule: string;
        gamesMade: string;
        faq: string;
    },
    steps: {
        step1: string;
        step1Highlight: string;
        step1Suffix: string;
        step2: string;
        step2Highlight: string;
        step2Suffix: string;
        step3: string;
        step3Highlight1: string;
        step3Middle: string;
        step3Highlight2: string;
        step3Suffix: string;
        step4: string;
        step4Highlight1: string;
        step4Middle: string;
        step4Highlight2: string;
        step4Suffix: string;
        guideButton: string;
    },
    letter: {
        greeting: string;
        paragraph1: string;
        paragraph2: string;
        paragraph3: string;
        paragraph4: string;
        paragraph5: string;
        closing: string;
        signature: string;
    },
    schedule: {
        title: string;
        days: {
            date: string;
            items: {
                time: string;
                activity: string;
            }[];
        }[];
    },
    sponsors: {
        title: string;
        cards: {
            sponsor: string;
            logo: string;
            link: string;
        }[];
    },
    signatures?: {
        title: string;
        img: string;
    };
    faq: {
        title: string;
        participant: {
            title: string;
            questions: {
                question: string;
                answer: string;
            }[];
            buttonText: string;
        },
        organizer: {
            title: string;
            questions: {
                question: string;
                answer: string;
            }[];
            buttonText: string;
        }
    },
    footer: {
        tagline: string;
        copyright: string;
        description: string;
        closing: string;
    }
}

// setSatelliteData('shelburne', {
//   hero: {
//     title: "CAMPFIRE",
//     city: "Shelburne",
//     subtitle: "Game jam for high schoolers in 200+ cities",
//     date: "Feb 28 - Mar 1, 2026",
//     emailPlaceholder: "you@hackclub.com",
//     ctaPrimary: "RSVP!",
//     ctaSecondary: "Find a Campfire near you",
//     ctaSecondaryPrefix: "Not in Shelburne? ",
//     ctaSecondarySuffix: ".",
//     videoLabel: "watch the video"
//   },
//   nav: {
//     howToOrganize: "How to organize",
//     schedule: "Schedule",
//     gamesMade: "Games made",
//     faq: "FAQ"
//   },
//   steps: {
//     step1: "Find a team of ",
//     step1Highlight: "CO-ORGANIZERS",
//     step1Suffix: " to help you organize your hackathon",
//     step2: "Find a ",
//     step2Highlight: "VENUE",
//     step2Suffix: " to host your hackathon",
//     step3: "Find ",
//     step3Highlight1: "SPONSORS",
//     step3Middle: " to buy merch and prizes, and make your event ",
//     step3Highlight2: "SPECIAL!",
//     step4: "Buy supplies, order food, learn ",
//     step4Highlight1: " GAME DEV",
//     step4Middle: ", and teach ",
//     step4Highlight2: "WORKSHOPS",
//     guideButton: "RSVP NOW"
//   },
//   letter: {
//     greeting: "Dear hacker,",
//     paragraph1: "You can make a change: inspire someone to build a game for the first time, help someone fall in love with computers, run an incredible game jam that you can invite all your friends to.",
//     paragraph2: "This February, what if you organized a game jam in your city?",
//     paragraph3: "Hack Club will provide guides, funding, merch, and 1-on-1 mentorship. Our goal? Run 200 game jams in 200 cities worldwide. All on the same day. All run by high schoolers like us.",
//     paragraph4: "To kick off 2026, we're so excited to invite you to Campfire. In just a couple months, you will learn how to raise money for your event, buy food and drinks for your attendees, and make your own video games with your friends!",
//     paragraph5: "Let's go on an adventure together.",
//     closing: "With love,",
//     signature: "The Campfire Team"
//   },
//   schedule: {
//     title: "SCHEDULE",
//     days: [
//       {
//         date: "Feb 28th",
//         items: [
//           { time: "7:45 AM", activity: "Doors open" },
//           { time: "8:00-8:45 AM", activity: "Icebreakers" },
//           { time: "9:00-9:45 AM", activity: "Opening Ceremony" },
//           { time: "10:15 AM-12:15 PM", activity: "Godot Workshop" },
//           { time: "12:45-1:45 PM", activity: "Lunch" },
//           { time: "2:00-3:00 PM", activity: "Ren'py Workshop" },
//           { time: "3:00-3:30 PM", activity: "Hackathon Hosting 101 With Hack Canada" },
//           { time: "4:00-4:15 PM", activity: "Typing Contest" },
//           { time: "6:00-7:00 PM", activity: "Project Pitch and Dinner" },
//           { time: "6:45-7:30 PM", activity: "Just Dance" },
//           { time: "7:35-7:45 PM", activity: "Semi-Closing" },
//         ]
//       }
//     ]
//   },
//   sponsors: {
//     title: "Our sponsors",
//     cards: [
//       {
//         sponsor: "Hack Club",
//         logo: "https://assets.hackclub.com/flag-standalone-wtransparent.svg",
//         link: "https://hackclub.com"
//       }
//     ]
//   },
//   signatures: false as any,
//   // signatures: {
//   //   title: "Campfire Shelburne is possible by...",
//   //   img: "https://assets.hackclub.com/flag-standalone-wtransparent.svg"
//   // },
//   faq: {
//     title: "FAQ",
//     participant: {
//       title: "Participant",
//       questions: [
//         {
//           question: "What is a game jam?",
//           answer: "A game jam is an event where you build a game from scratch in a short time period! It's all about creativity, teamwork, and having fun while learning new skills."
//         },
//         {
//           question: "Am I eligible?",
//           answer: "If you're a high schooler (or younger), you're eligible! No prior experience required - just bring your enthusiasm and willingness to learn."
//         },
//         {
//           question: "But I've never hacked before!",
//           answer: "Perfect! Game jams are designed for beginners. You'll have workshops, mentors, and teammates to help you every step of the way."
//         },
//         {
//           question: "All this, for free?",
//           answer: "Yes! Everything is completely free - venue, food, swag, workshops, and prizes. Hack Club covers all costs so you can focus on creating."
//         },
//         {
//           question: "What do I need to bring?",
//           answer: "Just bring yourself, a laptop, charger, and any personal items you need. We'll provide food, drinks, and everything else!"
//         }
//       ],
//       buttonText: "Check out the parent guide"
//     },
//     organizer: {
//       title: "Organizer",
//       questions: [
//         {
//           question: "Can I organize a Campfire in my city?",
//           answer: "Absolutely! We're always looking for passionate organizers. If you're ready to bring the magic of game development to your community, we'd love to help."
//         },
//         {
//           question: "What are the steps to organizing?",
//           answer: "First, apply through our organizer form. Then we'll guide you through venue booking, team building, workshop planning, and day-of coordination."
//         },
//         {
//           question: "Do we get funding?",
//           answer: "Yes! Hack Club provides funding for venue, food, swag, and other event costs. We want to remove financial barriers for amazing events."
//         },
//         {
//           question: "Do we get volunteer hours?",
//           answer: "Many schools accept organizing hours as community service. Check with your school's requirements - we can provide documentation."
//         },
//         {
//           question: "Can I join an organizing team?",
//           answer: "Of course! Many cities have organizing teams. Reach out to organizers in your area or apply to join an existing team."
//         }
//       ],
//       buttonText: "Apply to be an organizer"
//     }
//   },
//   footer: {
//     tagline: "made with love by Hack Club & Open Sauce",
//     copyright: "© 2026 Hack Club. 501(c)(3) nonprofit (EIN: 81-2908499)",
//     description: "Hack Club is a 501(c)(3) nonprofit and network of 60k+ technical high schoolers. We believe you learn best by building so we're creating community and providing grants so you can make awesome projects. In the past few years, we've partnered with GitHub to run ",
//     closing: "At Hack Club, students aren't just learning, they're shipping."
//   }
// })

