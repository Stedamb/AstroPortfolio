import bigbenchapp from '@/assets/bigbenchapp.webp';
import daleninbarbershop from '@/assets/daleninbarbershop.webp';
import videoJournal from '@/assets/video-journal.webp';
import type { ImageMetadata } from 'astro';

export type ProjectColor = 'pink' | 'green' | 'blue';
export type ProjectBorder = `hover:border-${string}`;

export interface Project {
  title: string;
  description: string;
  image: ImageMetadata;
  color: ProjectColor;
  border: ProjectBorder;
  github: string;
  demo: string;
}

export const projects: Project[] = [
  {
    title: 'BigBenchApp',
    description:
      'A web application for tracking progress in the Big Bench project. Built with Next.js and Supabase.',
    image: bigbenchapp,
    color: 'pink',
    border: 'hover:border-pink-600',
    github: 'https://github.com/Stedamb/BigBenchApp',
    demo: 'https://big-bench-app.vercel.app',
  },
  {
    title: 'Da Lenin Barber Shop',
    description: 'A simple barber shop website built with Astro.',
    image: daleninbarbershop,
    color: 'green',
    border: 'hover:border-teal-600',
    github: 'https://github.com/Stedamb/DaLeninBarberShop',
    demo: 'https://www.daleninbarbershop.it',
  },
  {
    title: 'Video Portfolio',
    description: 'A video portfolio showcasing my work and skills. Built with Astro.',
    image: videoJournal,
    color: 'blue',
    border: 'hover:border-cyan-600',
    github: 'https://github.com/Stedamb/Videomaker-portfolio/tree/dev',
    demo: 'https://video-journal.vercel.app',
  },
];

export default projects;
