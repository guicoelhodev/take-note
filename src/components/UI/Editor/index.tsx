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
import { useEditor } from '@tiptap/react';
import { useState } from 'react';

const extensions = [
  StarterKit,
  Placeholder.configure({
    placeholder: 'Digite aqui ...',
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
  })

  return (
    <div>

    </div>
  );
};
