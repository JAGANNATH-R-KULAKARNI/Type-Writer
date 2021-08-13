import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { createWorker } from 'tesseract.js';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


export default function Previews(props) {
  const [files, setFiles] = useState([]);
  const {getRootProps, getInputProps} = useDropzone({
      maxFiles : 1,
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  const [image, setImage] = useState(null);
  const [text, setText] = useState(true)
  const [scanText, setScanText] = useState('Scanned Text Will Appear Here. Please be patient, it might take 1-2 mins');
  const imageUpload = async (event) => {
    await setImage(URL.createObjectURL(event.target.files[0]));
    const worker = createWorker({
        logger: m => console.log(m)
      });
      
      (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(image);
        setScanText(text)
        console.log(text);
        await worker.terminate();
      })();
}

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
        />
      </div>
    </div>
  ));


  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <p>Drag 'n' drop some files here, or click to select files</p>
        <input id="fileUpload" type="file" onChange={imageUpload} accept="image/*" name="image" 
                            onClick={() => setText(false)}/>
      </div>
      <aside style={thumbsContainer}>
          <p>{scanText}</p>
        <img src={image}></img>
      </aside>
    </section>
  );
}

<Previews />