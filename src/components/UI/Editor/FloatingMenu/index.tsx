import { Editor, FloatingMenu as FloatingMenuTipTap } from '@tiptap/react';
import { ChangeEvent, FC, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';

type TFloatingMenu = {
  editor: Editor
};
type TFloatingMenuOptions = {
  title: string;
  description: string;
  imgSrc: string;
  slug: string;
  onClick: () => void;
}

export const FloatingMenu: FC<TFloatingMenu> = ({ editor }) => {

  const floatingMenuOptions: TFloatingMenuOptions[] = [
    {
      title: 'Título 1',
      slug: 'titulo1',
      description: 'Título de seção grande',
      imgSrc: 'https://www.notion.so/images/blocks/header.57a7576a.png',
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run()
    },
    {
      title: 'Título 2',
      slug: 'titulo2',
      description: 'Título de seção média',
      imgSrc: 'https://www.notion.so/images/blocks/subheader.9aab4769.png',
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run()
    },
    {
      title: 'Título 3',
      slug: 'titulo3',
      description: 'Título de seção pequena',
      imgSrc: 'https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png',
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run()
    },
    {
      title: 'Texto',
      slug: 'texto',
      description: 'Texto sem formatação',
      imgSrc: 'https://www.notion.so/images/blocks/text/en-US.png',
      onClick: () => editor.chain().focus().setParagraph().run()
    },
    {
      title: 'Lista com marcadores',
      slug: 'lista',
      description: 'Crie uma lista com marcadores',
      imgSrc: 'https://www.notion.so/images/blocks/bulleted-list.0e87e917.png',
      onClick: () => editor.chain().focus().toggleBulletList().run()
    },
    {
      title: 'Citação',
      slug: 'citação',
      description: 'Capture uma citação',
      imgSrc: 'https://www.notion.so/images/blocks/quote/en-US.png',
      onClick: () => editor.chain().focus().toggleBlockquote().run()
    },
    {
      title: 'Divisor',
      slug: 'divisor',
      description: 'Divida o conteúdo com uma linha',
      imgSrc: 'https://www.notion.so/images/blocks/divider.210d0faf.png',
      onClick: () => editor.chain().focus().setHorizontalRule().run()
    },
    {
      title: 'Imagem',
      slug: 'imagem',
      description: 'Adicione uma imagem no editor',
      imgSrc: 'https://www.notion.so/images/blocks/image.33d80a98.png',
      onClick: () => editor.commands.setImage({ src: 'https://www.notion.so/images/blocks/image.33d80a98.png' })
    }
  ];


  const [filteredString, setFilteredString] = useState('');

  const optionsFiltered = () => {
    const content = filteredString.slice(1, filteredString.length);
    return floatingMenuOptions.filter(i => i.slug.includes(content))
  }

  const removeCharacter = () => {
    const { state, dispatch } = editor.view;
    const { $from } = state.selection;
    const pos = $from.pos;

    if ($from.nodeBefore && $from.nodeBefore.textContent[0] === '/') {
      const tr = state.tr.delete(pos - filteredString.length, pos);
      dispatch(tr);
    }
  };

  const [uploadFile, setUploadFile] = useState(false);

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];
    if (!file) return console.error('File not found');

    try {
      //const downloadUrl = await FirebaseStorageService.addImage(file);

      return 'https://i.pinimg.com/736x/ea/88/8e/ea888e9c465bcdb6d373c54679a91efc.jpg';
    } catch (error) {
      console.error('Error on save file', error);
    }
  };

  return (
    <div>
      <FloatingMenuTipTap
        editor={editor}
        className='translate-y-[60%]'
        tippyOptions={{ duration: 100 }}
        shouldShow={({ state }) => {
          const { $from } = state.selection
          const currentLine = $from.nodeBefore?.textContent;

          const firstChar = currentLine?.[0] ?? '';
          if (firstChar === '/') {
            setFilteredString(currentLine!)
          }

          return firstChar === '/'
        }}
      >
        <ul className='bg-neutral-100 border max-h-[200px] overflow-y-scroll'>
          {optionsFiltered().map(action => {

            if (action.title === 'Imagem') {
              return (
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="bg-white flex items-center justify-center w-full h-full border  border-dashed cursor-pointer p-2 gap-4">
                    <article className='relative'>
                      <img src={action.imgSrc} alt='Image upload' className='w-10 h-10 rounded-md' />
                      {uploadFile && <AiOutlineLoading className='absolute text-white inset-0 animate-spin w-8 h-8 top-[4px] left-[2px]  ' />}
                    </article>
                    <article>
                      <p className='text-sm font-bold text-neutral-600'>{action.title}</p>
                      <p className='text-xs text-neutral-400'>{action.description}</p>
                    </article>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="absolute w-0 h-0 opacity-0 overflow-hidden"
                      onChange={async (e) => {
                        setUploadFile(true)

                        const imagePath = await handleUploadFile(e);

                        removeCharacter();
                        setUploadFile(false)
                        editor.commands.setImage({
                          src: imagePath as string
                        })
                      }}
                    />
                  </label>
                </div>)
            }
            return (
              <button
                key={action.slug}
                className={`bg-white flex p-2 gap-2 hover:bg-neutral-100 w-full border border-white focus:outline-none focus:border-blue-300`}
                onClick={() => {
                  removeCharacter();
                  action.onClick();
                }}
              >
                <img src={action.imgSrc} className='w-10 h-10' alt='heading 1' />
                <div className='flex flex-col items-start justify-center'>
                  <p className='text-sm font-bold text-neutral-600'>{action.title}</p>
                  <p className='text-xs text-neutral-400'>{action.description}</p>
                </div>
              </button>
            )
          })}
        </ul>
      </FloatingMenuTipTap>
    </div >
  );
};
