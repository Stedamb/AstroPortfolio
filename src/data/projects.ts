import animanoire from '@/assets/animanoire.webp';
import blog from '@/assets/blog.webp';
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
    title: 'AnimaNoire Tattoo Atelier',
    description: 'Website for a tattoo shop. Built with Astro and Sanity CMS.',
    image: animanoire,
    color: 'pink',
    border: 'hover:border-pink-600',
    github: 'https://github.com/Stedamb/AnimaNoire/tree/astro-sanity',
    demo: 'http://animanoire.it',
  },
  {
    title: 'Next Blog',
    description: 'My personal blog built with Next.js and Sanity CMS.',
    image: blog,
    color: 'green',
    border: 'hover:border-teal-600',
    github: 'https://github.com/Stedamb/next-blog',
    demo: 'http://stedamb.vercel.app',
  },
  {
    title: 'Video Portfolio',
    description: 'A video portfolio showcasing my work and skills. Built with Astro.',
    image: videoJournal,
    color: 'blue',
    border: 'hover:border-cyan-600',
    github: 'https://github.com/Stedamb/Videomaker-portfolio/tree/dev',
    demo: 'http://video-journal.vercel.app',
  },
];

export default projects;
