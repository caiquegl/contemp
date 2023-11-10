import React from 'react';
import Editor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const CustomEditor = ({ onChange, editorLoaded, name, value }) => {
  return (
    <>
      {editorLoaded ? (
        <CKEditor
          editor={Editor}
          type=""
          name={name}
          data={value}
          mediaEmbed={{ previewsInData: true }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log(data);
            onChange(data);
          }}
          style={{ height: 200 }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
};

export default CustomEditor
