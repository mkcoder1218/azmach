import Image from 'next/image';
import styles from './section-banner.module.css';

type BannerSection = 'services' | 'work' | 'about' | 'principles' | 'faqs' | 'contact';

export default function SectionBanner({ section }: { section: BannerSection }) {
  const directory = '/section-banners';

  return (
    <div className={styles.banner} aria-hidden="true">
      <Image
        className={styles.light}
        src={`${directory}/${section}-light.webp`}
        fill
        sizes="100vw"
        alt=""
      />
      <Image
        className={styles.dark}
        src={`${directory}/${section}-dark.webp`}
        fill
        sizes="100vw"
        alt=""
      />
    </div>
  );
}
