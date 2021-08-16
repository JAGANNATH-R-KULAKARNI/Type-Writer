import React from 'react';
import HomePageUI from './HomePageUI';
import TypeToHand from '../TypeToHandwritten/TypeToHandWritten';
import TextExtraction from '../TextExtraction/textExtraction';
import AudioToText from '../AudioToText/audioToText';

class HomePage extends React.Component {

    constructor() {
        super();
        this.state = {
            typeToHandwrittenStatus: false,
            textExtractionStatus: false,
            audioToTextStatus: false
        };

        this.typeToHandwrittenStatusHandler = this.typeToHandwrittenStatusHandler.bind(this);
        this.textExtractionStatusHandler = this.textExtractionStatusHandler.bind(this);
        this.audioToTextStatusHandler = this.audioToTextStatusHandler.bind(this);
    }

    typeToHandwrittenStatusHandler() {
        this.setState({
            typeToHandwrittenStatus: !this.state.typeToHandwrittenStatus
        })
    }

    textExtractionStatusHandler() {
        this.setState({
            textExtractionStatus: !this.state.textExtractionStatus
        });
    }

    audioToTextStatusHandler() {
        this.setState({
            audioToTextStatus: !this.state.audioToTextStatus
        });
    }

    render() {
        return ( <div> 
            {this.state.typeToHandwrittenStatus ? < TypeToHand typeToHandwrittenStatusHandler = { this.typeToHandwrittenStatusHandler }/>:null} 
            {this.state.textExtractionStatus ? < TextExtraction textExtractionStatusHandler = { this.textExtractionStatusHandler }/> : null}
             {this.state.audioToTextStatus ? < AudioToText audioToTextStatusHandler={this.audioToTextStatusHandler} /> : null}

            <HomePageUI typeToHandwrittenStatusHandler = { this.typeToHandwrittenStatusHandler }
            textExtractionStatusHandler = { this.textExtractionStatusHandler }
            audioToTextStatusHandler = { this.audioToTextStatusHandler }
            />  </div>
        );
    }
};

export default HomePage;