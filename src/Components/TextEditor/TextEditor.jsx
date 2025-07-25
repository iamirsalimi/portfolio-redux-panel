import React, { useRef } from 'react'
import {
  ClassicEditor, Heading, Context, Bold, Essentials, Italic, Strikethrough, Subscript, Superscript, Underline, Code, Paragraph, ContextWatchdog, Alignment, Autoformat, Table, TableToolbar, AutoLink, Link, Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, LinkImage, CodeBlock, List, ListProperties, BlockQuote , Font
} from 'ckeditor5';
import { CKEditor, CKEditorContext } from '@ckeditor/ckeditor5-react';

import 'ckeditor5/ckeditor5.css';

export default function TextEditor() {
  const editorRef = useRef()
 
  return (
    <CKEditorContext
      context={Context}
      contextWatchdog={ContextWatchdog}
      onChangeInitializedEditors={(editors) => {
        console.info(editors.editor1?.instance, editors.editor1?.yourAdditionalData);
      }}
    >
      <CKEditor
        ref={editorRef}
        editor={ClassicEditor}
        config={{
          plugins: [Essentials, Heading, Bold, Italic, Strikethrough, Subscript, Superscript, Underline, Code, Paragraph, Alignment, Autoformat, Table, TableToolbar, AutoLink, Link, Image, ImageCaption, ImageResize, ImageStyle, ImageToolbar, LinkImage, CodeBlock, List, ListProperties, BlockQuote ,Font],
          toolbar: ['undo', 'redo', '|', 'heading', '|', 'bold', 'italic', 'underline', 'strikethrough', 'code', 'subscript', 'superscript', '|',  'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', '|' , 'insertTable', 'link', 'alignment', '|', 'codeBlock', 'bulletedList', 'numberedList', '|', 'blockQuote', 'insertImage',],
          alignment: {
            options: ['left', 'right']
          },
          table: {
            contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
          },
          image: {
            toolbar: [
              'imageStyle:block',
              'imageStyle:side',
              '|',
              'toggleImageCaption',
              'imageTextAlternative',
              '|',
              'linkImage',
              'ckboxImageEdit',
            ],
            insert: {
              type: ['auto' , 'upload', 'assetManager', 'url' ]
            }
          },
          list: {
            properties: {
              styles: true,
              startIndex: true,
              reversed: true
            }
          },
          heading: {
            options: [
              { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
              { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1 text-xl' },
              { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2 text-xl' },
              { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3 text-xl' },
              {
                model: 'headingFancy',
                view: {
                    name: 'h2',
                    classes: 'fancy'
                },
                title: 'Heading 2 (fancy)',
                class: 'ck-heading_heading2_fancy',
  
                // It needs to be converted before the standard 'heading2'.
                converterPriority: 'high'
            }
            ],
          }
        }}
        contextItemMetadata={{
          name: 'editor1',
          yourAdditionalData: 2
        }}
        onChange ={(event , editor) => {
          console.log(editor.getData())
        }}
      />

    </CKEditorContext>
  )
}

