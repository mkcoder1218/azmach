import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import type { ReactNode } from 'react';
import './global.css';
import 'lenis/dist/lenis.css';
import './motion.css';
import SmoothScroll from '../components/motion/smooth-scroll';
import RevealEffects from '../components/motion/reveal-effects';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-space', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'AZMACH.E | Build Today. Lead Tomorrow.',
    template: '%s | AZMACH.E',
  },
  description: 'AZMACH.E — Ethiopian roots, global ambition. Build, innovate, lead and elevate.',
  applicationName: 'AZMACH.E',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable + ' ' + space.variable}>
      <head><script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('azmach-theme');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;else if(matchMedia('(prefers-color-scheme: dark)').matches)document.documentElement.dataset.theme='dark';}catch(e){}" }} /></head>
      <body>{children}<SmoothScroll /><RevealEffects /></body>
    </html>
  );
}
