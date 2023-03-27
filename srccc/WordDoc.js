import React, { Component } from 'react'
// import { Document, Packer } from "docx";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

function WordDoc(){

  // function saveDocumentToFile(doc, fileName) {
  //   const packer = new Packer();
  //   const mimeType =
  //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  //   packer.toBlob(doc).then(blob => {
  //     const docblob = blob.slice(0, blob.size, mimeType);
  //     saveAs(docblob, fileName);
  //   });
  // }

  // const doc = new Document();

  // saveDocumentToFile(doc, "New Document.docx");

    // return (
      // <button>Generate Word Document</button>
      // )
  }


export default WordDoc;