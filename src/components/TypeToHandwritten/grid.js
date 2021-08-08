import React, {useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { SketchPicker, CirclePicker } from 'react-color'
import domtoimage from 'dom-to-image';
import Fade from '@material-ui/core/Fade';
import { Paper, Button, MenuItem, Select, FormControl, InputLabel, Slider, FormControlLabel, Switch, Tooltip } from '@material-ui/core'
import './FontConverter.css'
import './Fonts.css'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 493,
    width: 498,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function SpacingGrid(props) {
  const [spacing, setSpacing] = React.useState(10);
  const [typing,setTyping]=React.useState(false);
  const classes = useStyles();

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const TYPING=(e)=>{

    props.textChangeHandler(e.target.value);
          setTyping(true);
         setTimeout(()=>{
          setTyping(false);
         },300);
  };
  
  const [text, setText] = useState("Myself Jagannath R Kulakarni. Programmer ? Yes . And ya I can't fix your computer.");
  const [fontFamily, setFontFamily] = useState("'Beth Ellen', cursive")
  const [fontSize, setFontSize] = useState(17)
  const [color, setColor] = useState('blue')
  const [pageColor, setPageColor] = useState('white')
  const [letterSpacing, setLetterSpacing] = useState(1)
  const [wordSpacing, setWordSpacing] = useState(1)
  const [lineHeight, setLineHeight] = useState(30)
  const [fontWeight, setFontWeight] = useState(300)
  const [line, setLine] = useState(false)
  const [shadow, setShadow] = useState(false)
  const [margin, setMargin] = useState(false)
  const [marginTop, setMarginTop] = useState(false)

  const [showColorPicker1, setShowColorPicker1] = useState(false)
  const [showColorPicker2, setShowColorPicker2] = useState(false)

  const colorList = ['#ffffff', '#f2f2f2', '#e6e6e6', '#d9d9d9', '#cccccc', '#bfbfbf', '#ffffe6', ' #ffffcc', '#ffffb3', '#ffff99', '#e6ffff', '#e6ffe6']

  
  const handleLineHeight = (event, newValue) => {
    setLineHeight(newValue);
};

const handleFontWeight = (event, newValue) => {
    setFontWeight(newValue);
};

const handlePageLines = (event) => {
    setLine(!line);
  };

const handleShadow = (event) => {
setShadow(!shadow);
};

const handleMargin = (event) => {
    setMargin(!margin);
};

const handleMarginTop = (event) => {
    setMarginTop(!marginTop);
};

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
         
            <Grid item>
            <div className="fontStyler">
                <div className="input_container">
                    <Paper elevation={15} className="paper_input" >
                        <textarea onChange={e => setText(e.target.value)} 
                            className="inputTextField" cols='36' rows='19'>
                            {text}
                        </textarea>
                    </Paper>
                </div>
                </div>
            </Grid>
            {typing ? null : null}
            <Grid item>
            <div className="output_container">
                    <Paper elevation={15} square={true} className="paper" id="page" style={{backgroundImage: 
                            line? 'repeating-linear-gradient(transparent 0px, transparent 24px, #333333 25px)' : 'none', backgroundColor: `${pageColor}`,
                            WebkitBoxShadow: shadow ? 'inset 18px 0px 50px -7px rgba(106,110,101,1)' : 'none', MozBoxShadow: shadow ? 'inset 18px 0px 50px -7px rgba(106,110,101,1)' : 'none',
                            boxShadow: shadow ? 'inset 18px 0px 50px -7px rgba(106,110,101,1)' : 'none'}}>
                        <p className="output_text" 
                            style={{fontFamily: `${fontFamily}`, fontSize: `${fontSize}px`, color: `${color}`, 
                                letterSpacing: `${letterSpacing}px`, wordSpacing: `${wordSpacing}px`, lineHeight: `${lineHeight}px`, paddingTop: marginTop? '2rem' : '0',
                                fontWeight: `${fontWeight}`, left: margin? '2rem' : '0', borderLeft: margin? '2px solid #666666' : 'none', paddingLeft: margin? '0.5rem' : '0'}}>
                            {text}
                        </p>
                    </Paper>
            
                </div>
            </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
 
      </Grid>
    </Grid>
  );
}
