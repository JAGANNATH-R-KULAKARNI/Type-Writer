import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import {useDropzone} from 'react-dropzone';
import { createWorker } from 'tesseract.js';
import DBContainerUI from './DBContainer';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



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
    const useStyles = makeStyles((theme) => ({
        icon: {
          marginRight: theme.spacing(2),
        },
        heroContent: {
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
          marginTop: theme.spacing(4),
        },
        cardGrid: {
          paddingTop: theme.spacing(8),
          paddingBottom: theme.spacing(8),
        },
        card: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
        cardMedia: {
          paddingTop: '56.25%', // 16:9
        },
        cardContent: {
          flexGrow: 1,
        },
        footer: {
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(6),
        },
      }));
      
      const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [files, setFiles] = React.useState([]);
  const {getRootProps, getInputProps} = useDropzone({
      maxFiles : 1,
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });
  const [image, setImage] = React.useState(null);
  const [text, setText] = React.useState(true)
  const [scanText, setScanText] = React.useState('Scanned Text Will Appear Here. Please be patient, it might take 1-2 mins');
  const [enable,setEnable]=React.useState(false);
  const imageUpload = async (event) => {
    await setImage(URL.createObjectURL(event.target.files[0]));
    setEnable(true);
}
const ScanText = () => {
    const worker = createWorker({
        logger: m => console.log(m)
      });
      
      (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(image);
        setScanText(text)
        setImage(null);
        setEnable(false);
        setText(true);
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
  const classes = useStyles();

  React.useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const DROPBOX=(
<div {...getRootProps({className: 'dropzone'})}>
        <p>Choose the image you want to extract the text from</p>
        <input id="fileUpload" type="file" onChange={imageUpload} accept="image/*" name="image" 
                            onClick={() => setText(false)}/>
      </div>
  );

  return (
    <React.Fragment>
    <CssBaseline />
    <main>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
          
    <section className="container">
       <DBContainerUI dropbox={DROPBOX}/>
      <aside style={thumbsContainer}>
          <p>{scanText}</p>
          <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={ScanText} disabled={!enable}>
                   Extract
                  </Button>
                </Grid>
                <img src={image}></img>
              </Grid>
            </div>
      </aside>
    </section>
    </Typography>
    
          </Container>
        </div>
      </main>

    </React.Fragment>
  );
}

<Previews />
