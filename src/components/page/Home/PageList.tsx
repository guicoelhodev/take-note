'use client';

import { TPageLink } from '@/app/auth/home/page';
import { Children, FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { useRouter } from 'next/navigation';
import { IoDocumentTextOutline } from "react-icons/io5";

type TPageList = {
  list: TPageLink[]
};

export const PageList: FC<TPageList> = (props) => {
  const router = useRouter();
  return (
    <Swiper
      className="mySwiper w-full flex gap-4 overflow-x-auto"
      slidesPerView={7.5}
      spaceBetween={20}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
    >
      {Children.toArray(props.list.map(page => (

        <SwiperSlide
          className='bg-secondary aspect-square w-40 h-40 p-2 rounded-md cursor-pointer flex'
          onClick={() => router.push(`/auth/${page.name}`)}
          title={page.name}
        >
          <div className='flex flex-col h-full justify-between items-end'>
            <article className='w-full'>
              <p className='font-semibold truncate'>{page.name}</p>
            </article>

            <IoDocumentTextOutline size={34} className='' />
          </div>
        </SwiperSlide>
      )))}
    </Swiper>
  );
};
