import { Editor } from '@tiptap/react';
import { FC, useState } from 'react';
import { FaHighlighter } from 'react-icons/fa';
import { PiTextAUnderlineBold } from 'react-icons/pi';

type TBubbleColors = {
  editor: Editor
};

type TButtonColor = { hexCode: string; text: string; onClick: () => void };

export const BubbleColors: FC<TBubbleColors> = ({ editor }) => {

  const [showColors, setShowColors] = useState(false);

  const colorOptions: TButtonColor[] = [
    { text: 'Vermelho', hexCode: '#f00', onClick: () => editor.commands.setColor('#f00') },
    { text: 'Rosa', hexCode: '#ff98e9', onClick: () => editor.commands.setColor('#ff98e9') },
    { text: 'Azul escuro', hexCode: '#3c6ac1', onClick: () => editor.commands.setColor('#3c6ac1') },
    { text: 'Verde', hexCode: '#03a233', onClick: () => editor.commands.setColor('#03a233') },
    { text: 'Preto', hexCode: '#000', onClick: () => editor.commands.setColor('#000') },
  ];

  const highLightOptions: TButtonColor[] = [
    { text: 'Amarelo', hexCode: '#ffd30e', onClick: () => editor.commands.toggleHighlight({ color: '#fff08f' }) },
    { text: 'Vermelho', hexCode: '#ff3b3b', onClick: () => editor.chain().focus().toggleHighlight({ color: '#ffa8a8' }).run() },
    { text: 'Azul', hexCode: '#0bb6f7', onClick: () => editor.chain().focus().toggleHighlight({ color: '#a8e7ff' }).run() },
    { text: 'Remover marcador', hexCode: '#333', onClick: () => editor.commands.unsetHighlight() },
  ]
  return (
    <div className='flex rounded-r-md hover:bg-neutral-50 relative'>
      <button className='flex gap-2 items-center p-2 text-red-500' onClick={() => setShowColors(p => !p)}>
        <FaHighlighter />
      </button>

      {
        showColors && (
          <ul className="absolute border bg-white p-2 top-1/2 left-1/2 transform -translate-x-1/2 translate-y-6 w-60 rounded-md flex flex-col">
            <p className='text-neutral-600 p-2'>Cores</p>
            {colorOptions.map(color => (
              <button
                key={color.hexCode}
                className='flex items-center gap-2 hover:bg-neutral-100 rounded-md'
                onClick={() => {
                  color.onClick();
                  setShowColors(false);
                }}
                style={{ color: color.hexCode }}>
                <span className='p-2 rounded-md'>
                  <PiTextAUnderlineBold color={color.hexCode} />
                </span>
                {color.text}
              </button>
            ))}

            <p className='text-neutral-600 p-2'>Marcadores</p>

            {highLightOptions.map(color => (
              <button
                key={color.hexCode}
                className='flex items-center gap-2 hover:bg-neutral-100 rounded-md'
                onClick={() => {
                  color.onClick();
                  setShowColors(false);
                }}
                style={{ color: color.hexCode }}>

                <span className='p-2 rounded-md'>
                  <FaHighlighter color={color.hexCode} />
                </span>
                {color.text}
              </button>
            ))}
          </ul>
        )
      }
    </div>
  );
};
