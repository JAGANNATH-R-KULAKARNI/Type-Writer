import React from 'react';
import HomePageUI from './HomePageUI';
import TypeToHand from '../TypeToHandwritten/TypeToHandWritten';
import TextExtraction from '../TextExtraction/textExtraction';

class HomePage extends React.Component
{

    constructor()
    {
        super();
        this.state={
            typeToHandwrittenStatus : false,
            textExtractionStatus : false
        };

        this.typeToHandwrittenStatusHandler=this.typeToHandwrittenStatusHandler.bind(this);
        this.textExtractionStatusHandler=this.textExtractionStatusHandler.bind(this);
    }
    
    typeToHandwrittenStatusHandler()
    {
        this.setState({
            typeToHandwrittenStatus : !this.state.typeToHandwrittenStatus
        })
    }

    textExtractionStatusHandler()
    {
        this.setState({
            textExtractionStatus : !this.state.textExtractionStatus
        });
    }
    render()
    {
        return (
            <div>
                {this.state.typeToHandwrittenStatus ? <TypeToHand typeToHandwrittenStatusHandler={this.typeToHandwrittenStatusHandler}/>:null}
                {this.state.textExtractionStatus ? <TextExtraction textExtractionStatusHandler={this.textExtractionStatusHandler}/> : null}
                <HomePageUI typeToHandwrittenStatusHandler={this.typeToHandwrittenStatusHandler}
                textExtractionStatusHandler={this.textExtractionStatusHandler}/>
            </div>   
        );
    }
};

export default HomePage;