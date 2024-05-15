import { Editor, BubbleMenu as BubbleMenuTipTap } from '@tiptap/react';
import { FC, ReactNode } from 'react';
import { BubbleColors } from './BubbleColors';
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa';
import { BubbleAlign } from './BubbleAlign';

type TBubbleMenu = {
  editor: Editor
};

type TBubbleTextOptions = { icon: ReactNode; alt: string; onClick: () => void, className: string };

export const BubbleMenu: FC<TBubbleMenu> = ({ editor }) => {

  const textOptions: TBubbleTextOptions[] = [
    {
      icon: <FaBold />,
      alt: 'Make bold',
      onClick: () => editor.chain().focus().toggleBold().run(),
      className: 'w-5 h-5 object-contain'
    },
    {
      icon: <FaItalic />,
      alt: 'Make italic',
      onClick: () => editor.chain().focus().toggleItalic().run(),
      className: 'h-5 object-contain'
    },
    {
      icon: <FaUnderline />,
      alt: 'Make Underline',
      onClick: () => editor.chain().focus().toggleStrike().run(),
      className: 'h-5 object-contain'
    }
  ]
  return (
    <BubbleMenuTipTap editor={editor} tippyOptions={{ duration: 100 }}
      className='border bg-white rounded-md flex items-center'
    >
      {textOptions.map(textAction => (
        <button key={textAction.alt} onClick={textAction.onClick} className='text-neutral-500 hover:bg-neutral-100 p-2'>
          {textAction.icon}
        </button>
      ))}

      <BubbleColors editor={editor} />
      <BubbleAlign editor={editor} />
    </BubbleMenuTipTap>
  );
};
