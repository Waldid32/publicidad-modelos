'use client';

import { Carousel } from 'flowbite-react';
import Image from 'next/image';

export function CarouselModel({ multimedias }: { multimedias: string[] }) {
  return (
    <div className="flex justify-center items-center w-full h-96 lg:w-[650px] lg:h-[672px]">
      <Carousel slide={true} slideInterval={2000}>
        {multimedias.map((item, index) => {
          const isVideo = item.toLowerCase().endsWith('.mp4');
          return isVideo ? (
            <video key={index} className="w-full h-full" controls>
              <source src={item} type="video/mp4" />
              Tu navegador no soporta la reproducción de este video.
            </video>
          ) : (
            <Image
              src={item}
              alt={`Multimedia ${index}`}
              className="w-full h-full object-fill rounded-2xl"
              width={300}
              height={300}
              key={index}
              unoptimized
            />
          );
        })}
      </Carousel>
    </div>
  );
}
