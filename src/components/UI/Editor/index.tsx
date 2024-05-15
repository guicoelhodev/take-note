'use client'

import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align';

import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { EditorContent, useEditor } from '@tiptap/react';
import { useState } from 'react';
import { FloatingMenu } from './FloatingMenu';
import { BubbleMenu } from './BubbleMenu';

const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: 'Type here',
    emptyEditorClass: 'editor-placeholder',
  }),
  Color,
  Highlight.configure({
    multicolor: true
  }),
  Text,
  TextStyle,
  Link.configure({
    protocols: ['ftp', 'mailto'],
    HTMLAttributes: {
      class: 'tip-tap-link'
    }
  }),
  Image.configure({
    inline: true,
    HTMLAttributes: {
      class: 'tip-tap-image'
    }
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'center', 'right', 'justify'],
    defaultAlignment: 'left'
  })
]
export const Editor = () => {

  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const editor = useEditor({
    extensions,
    onTransaction({ editor }) {
      const currentImages: string[] = [];

      editor.state.doc.descendants((node) => {
        if (node.type.name === 'image') {
          currentImages.push(node.attrs.src);
        }
      });

      setImageUrls([...currentImages]);
      const removedImages = imageUrls.filter(url => !currentImages.includes(url));

      (async () => {
        for (const imageUrl of removedImages) {
          try {
            //await FirebaseStorageService.deleteImage(imageUrl);
            console.log(`Image successfully deleted: ${imageUrl}`);
          } catch (error) {
            console.error(`Error deleting image ${imageUrl}:`, error);
          }
        }
      })();
    },
    editorProps: {
      attributes: {
        class: 'prose bg-secondary rounded-md p-4 mx-auto min-h-96 !max-w-none mx-[4px] focus:outline-none',
      }
    }
  })

  return (
    <div className='flex-1 focus-within:outline-white'>
      {
        !editor ? <div className="skeleton w-full h-96"></div>
          : (
            <EditorContent editor={editor}>
              <FloatingMenu editor={editor} />
              <BubbleMenu editor={editor} />
            </EditorContent>
          )
      }
    </div >
  );
};
