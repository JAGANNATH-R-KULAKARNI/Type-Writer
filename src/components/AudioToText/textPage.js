import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Spinner from './spinner';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Button, AppBar, Toolbar, IconButton, Typography, Paper} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Close';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import Slide from '@material-ui/core/Slide';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert'; 
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import PauseIcon from '@material-ui/icons/Pause';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import CancelIcon from '@material-ui/icons/Cancel';
import HearingIcon from '@material-ui/icons/Hearing';
import ErrorPage from './errorPage';

export default function ScrollDialog(props) {
  const [open, setOpen] = React.useState(true);
  const [scroll, setScroll] = React.useState('paper');
  const [listen,setListen]=React.useState(true);
  const [Open, SetOpen] = React.useState(false);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  function Alert(props) {
    return <MuiAlert elevation={16} variant="filled" {...props} />;
  }

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);


  const HEADING=(
    <div>
      {listen ? "Click on Listen to Speak" : <div>
      <Spinner/>
      <p>Listening...</p>
      </div>
      }
    </div>
  );
  const { transcript, interimTranscript, finalTranscript, resetTranscript, listening } = useSpeechRecognition();
  useEffect(() => {
    if (finalTranscript !== '') {
     console.log('Final Text', finalTranscript);
    }
}, [interimTranscript, finalTranscript]);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <ErrorPage textPageStatusHandler={props.textPageStatusHandler}/>;
    }

    const listenToSpeaker = ()=>{
      setListen(false);
      SpeechRecognition.startListening({
        continuous: true,
        language: 'en-GB',
    });
    }

    const PauseSpeaker= ()=>{
      setListen(true);
      SpeechRecognition.stopListening();
    }

    const handleClose = () => {
      SpeechRecognition.stopListening();
      setOpen(false);
      props.textPageStatusHandler();
    };

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
    <div>
      <Snackbar open={Open} autoHideDuration={1000} onClose={HandleClose}>
        <Alert onClose={HandleClose} severity="success">
         Copied To Clipboard
        </Alert>
      </Snackbar>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{HEADING}</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
        {transcript}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <CopyToClipboard text={transcript}>
        <Button
        variant="outlined"
        color="primary"
        startIcon={<FileCopyIcon />}
        onClick={HandleClick}
      >
        Copy 
      </Button>
      </CopyToClipboard>
          <Button onClick={listen ? listenToSpeaker : PauseSpeaker}  variant="outlined" color={listen ? "primary" : "secondary"}   startIcon={listen ? <HearingIcon/> : <PauseIcon />}>
           {listen ? "Listen" : "Pause"}
          </Button>
          <Button onClick={resetTranscript}  variant="outlined" color="secondary"   startIcon={<ClearAllIcon />}>
           Reset
          </Button>
          <Button onClick={handleClose} color="seconadry" variant="outlined" startIcon={<CancelIcon />}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
