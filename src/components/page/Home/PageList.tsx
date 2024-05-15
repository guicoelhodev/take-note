'use client';

import { TPageLink } from '@/app/auth/home/page';
import { Children, FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useRouter } from 'next/navigation';

type TPageList = {
  list: TPageLink[]
};

export const PageList: FC<TPageList> = (props) => {
  const router = useRouter();
  return (
    <Swiper
      className="mySwiper w-full flex gap-4 overflow-x-auto"
      slidesPerView={8}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
    >
      {Children.toArray(props.list.map(page => (

        <SwiperSlide
          className='bg-secondary aspect-square w-40 h-40 p-2 rounded-md flex cursor-pointer'
          onClick={() => router.push(page.href)}
          title={page.name}
        >
          <p className='font-semibold truncate'>{page.name}</p>
        </SwiperSlide>
      )))}
    </Swiper>
  );
};
