import React, { Component } from 'react'
import Editor from 'ckeditor5-custom-build';
import { CKEditor } from '@ckeditor/ckeditor5-react';

export default class EditorComp extends Component {
  constructor(props){
    super(props);
  }
  
  render() {
    let data = "<p>hello <br>hi</p><p>hello <br>hi</p>"
  
    return (
      <div className='App' style={{margin : "50px"}}>
        <CKEditor
            editor={ Editor }
            data={this.props.data}
            onReady={editor => {
                console.log("editor is ready");
            }}
            onChange={(e,editor) => {
                const data = editor.getData();
                console.log(e,editor,data);
            }}
            onBlur={(e,editor) => {
                console.log('blur.',editor);
            }}
            onFocus={(e, editor) => {
                console.log('Focus.', editor);
            }}
        />
      </div>
    )
  }
}