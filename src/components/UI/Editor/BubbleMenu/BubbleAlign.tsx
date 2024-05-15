import { Editor } from '@tiptap/react';
import { Children, FC } from 'react';
import { IconType } from 'react-icons';
import {
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
} from 'react-icons/fa';

type TBubbleAlign = {
  editor: Editor;
};

type TAlign = {
  icon: IconType;
  onClick: () => void;
  title: string;
};

export const BubbleAlign: FC<TBubbleAlign> = ({ editor }) => {
  const alignButtons: TAlign[] = [
    {
      icon: FaAlignLeft,
      title: 'Align left',
      onClick: () => editor.commands.setTextAlign('left'),
    },
    {
      icon: FaAlignCenter,
      title: 'Align Center',
      onClick: () => editor.commands.setTextAlign('center'),
    },
    {
      icon: FaAlignRight,
      title: 'Align right',
      onClick: () => editor.commands.setTextAlign('right'),
    },
    {
      icon: FaAlignJustify,
      title: 'Align Justify',
      onClick: () => editor.commands.setTextAlign('justify'),
    },
  ];
  return (
    <ul className='flex items-center'>
      {Children.toArray(
        alignButtons.map((i) => (
          <button
            className='text-neutral-500 hover:bg-neutral-100 p-2 first:border-l-neutral-100 first:border-2 first:border-transparent '
            onClick={i.onClick}
            title={i.title}
          >
            {<i.icon size={16} />}
          </button>
        )))
      }
    </ul>
  );
};
