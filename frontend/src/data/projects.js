import { normalizeProject } from '../utils/projects';

// Used only when the CMS can't be reached or has no projects yet. Same field names as the API.
// Once your projects are in the admin panel you can empty this list.
const RAW_PROJECTS = [
  {
    id: 1,
    slug: 'atharv-preschool',
    title: 'Atharv Preschool Management',
    short_description:
      'Full-stack school management platform with Razorpay integration, automated PDF receipt generation via PDFKit, and role-based dashboards.',
    description:
      'Full-stack platform built for managing student enrollment, teacher allocation, and fee tracking.\n\nIt includes Razorpay integration, automated PDF receipt generation via PDFKit, and role-based dashboards.',
    thumbnail: '/images/atharv.png',
    images: [],
    tech_stack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Razorpay'],
    github_url: 'https://github.com/bellaleprasann20/ATHARV-PRESCHOOL',
    live_url: 'https://atharv-preschool.vercel.app',
    is_featured: true,
  },
  {
    id: 2,
    slug: 'chat-app',
    title: 'Real-Time Chat App',
    short_description:
      'Instant messaging platform utilizing WebSocket connections for live typing indicators, online status, and secure JWT-based auth.',
    description:
      'Instant messaging platform utilizing WebSocket connections for live typing indicators, online status, and secure JWT-based auth.\n\nSocket.io messaging supporting live chat rooms, user authentication, and online status updates.',
    thumbnail: '/images/chat-app.png',
    images: [],
    tech_stack: ['React', 'Socket.io', 'Express', 'Node.js', 'JWT'],
    github_url: 'https://github.com/bellaleprasann20/Chat-App',
    live_url: 'https://chat-app-eight-sand-86.vercel.app/',
    is_featured: true,
  },
  {
    id: 3,
    slug: 'vaulta-cloud-storage',
    title: 'Vaulta Cloud Storage',
    short_description:
      'Secure cloud-based media storage and sharing service using FastAPI, JWT authentication, and S3 integration.',
    description:
      'Secure cloud-based media storage and sharing service using FastAPI, JWT authentication, and S3 integration.',
    thumbnail: '/images/vaulta.png',
    images: [],
    tech_stack: ['Python', 'FastAPI', 'JWT', 'Docker'],
    github_url: 'https://github.com/bellaleprasann20/vaulta',
    live_url: 'https://vaulta-bay.vercel.app',
    is_featured: false,
  },
  {
    id: 4,
    slug: 'equipshare-tracker',
    title: 'EquipShare Construction Tracker',
    short_description:
      'Construction equipment allocation and efficiency tracking system built with a robust backend API.',
    description:
      'Construction equipment allocation and efficiency tracking system built with a robust backend API.',
    thumbnail: '/images/equipshare.png',
    images: [],
    tech_stack: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    github_url: 'https://github.com/bellaleprasann20/Equipshare',
    live_url: null, // you had the GitHub repo here; with no live site the card shows "View details" instead
    is_featured: false,
  },
];

export const FALLBACK_PROJECTS = RAW_PROJECTS.map(normalizeProject);

export function findFallbackProject(slug) {
  return FALLBACK_PROJECTS.find((project) => project.slug === slug) ?? null;
}