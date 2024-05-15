'use client';

import { TPageLink } from '@/app/auth/home/page';
import Link from 'next/link';
import { Children, FC, MutableRefObject, useRef } from 'react';

type TPageList = {
  list: TPageLink[]
};

export const PageList: FC<TPageList> = (props) => {
  return (
    <ul className="w-full flex gap-4 overflow-x-auto">
      {Children.toArray(props.list.map(page => (
        <Link href={page.href} className="p-2 rounded-md bg-secondary aspect-square w-40 h-40">
          {page.name}
        </Link>
      )))}
    </ul>
  );
};
