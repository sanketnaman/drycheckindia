import Image from 'next/image';
import { Guide } from '@/lib/guides';

interface GuideHeroBannerProps {
  guide: Guide;
  imageSrc?: string | null;
}

export default function GuideHeroBanner({ guide, imageSrc }: GuideHeroBannerProps) {
  if (!imageSrc) {
    return null;
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-3 sm:px-6 mb-6">
      <div className="relative w-full aspect-[2/1] overflow-hidden rounded-2xl border border-neutral-800/80 bg-neutral-950 shadow-2xl">
        <Image
          src={imageSrc}
          alt={guide.title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 900px, 1200px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
