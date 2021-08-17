import React from 'react';

import Button from '@material-ui/core/Button';





import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {useDropzone} from 'react-dropzone';
import { createWorker } from 'tesseract.js';
import DBContainerUI from './DBContainer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Spinner from './spinner';
import TextModalUI from './finalResultModal';




function Alert(props) {
    return <MuiAlert elevation={16} variant="filled" {...props} />;
  }

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
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
      

  const [files, setFiles] = React.useState([]);
  const {getRootProps} = useDropzone({
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
  const [spinnerStatus,enableSpinner]=React.useState(false);
  const [modalStatus,setModalStatus]=React.useState(false);
  const imageUpload = async (event) => {
    await setImage(URL.createObjectURL(event.target.files[0]));
    setEnable(true);
}

const [open, setOpen] = React.useState(false);
const handleClick = () => {
  setOpen(true);
};

const CloseModalStatusText=()=>{
    setModalStatus(false);
}

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }

  setOpen(false);
};

const ScanText = () => {
    const worker = createWorker({
        logger: m => console.log(m)
      });
      handleClick();
      enableSpinner(true);
      (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(image);
        handleClose();
        setScanText(text)
        setImage(null);
        setEnable(false);
        setText(true);
        enableSpinner(false);
        setModalStatus(true);
        console.log(text);
        await worker.terminate();
      })();
}

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
  const [Open, SetOpen] = React.useState(false);

  const HandleClick = () => {
    SetOpen(true);
  };

  const HandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    SetOpen(false);
  };

  return (
    <React.Fragment>
        {modalStatus ? <TextModalUI CloseModalStatusText={CloseModalStatusText} scanText={scanText} HandleClick={HandleClick}/> : null}
      <Snackbar open={open} autoHideDuration={9000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
         Extraction can take 2-3 minutes max please wait 
        </Alert>
      </Snackbar>
      <Snackbar open={Open} autoHideDuration={1000} onClose={HandleClose}>
        <Alert onClose={HandleClose} severity="success">
         Copied To Clipboard
        </Alert>
      </Snackbar>
    <CssBaseline />
    {spinnerStatus ? <Spinner/> : 
    <main>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
          
    <section className="container">
       <DBContainerUI dropbox={DROPBOX}/>
      <aside style={thumbsContainer}>
          <div className={classes.heroButtons}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={ScanText} disabled={!enable}>
                   Extract
                  </Button>
                </Grid>
                <img src={image} alt="extract image"></img>
              </Grid>
            </div>
      </aside>
    </section>
    </Typography>
    
          </Container>
        </div>
      </main>
}
    </React.Fragment>
  );
}

<Previews />
