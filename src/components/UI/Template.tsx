import { FC, ReactNode } from 'react';

type TTemplate = {
  children: ReactNode;
};

export const Template: FC<TTemplate> = (props) => {
  return (
    <div>
      {props.children}
    </div>
  );
};
