import React from 'react';
import DialogUI from './DialogUI';
import TextPage from './textPage';

class AudioToText extends React.Component
{
    constructor()
    {
        super();
        this.state={
            textPageStatus : false
        };
        this.textPageStatusHandler=this.textPageStatusHandler.bind(this);
    }

    textPageStatusHandler()
    {
    this.setState({
        textPageStatus : !this.state.textPageStatus
    });
    }

    render()
    {
        return (
            <div>
                {this.state.textPageStatus ? <TextPage textPageStatusHandler={this.textPageStatusHandler}/> : null}
            <DialogUI audioToTextStatusHandler={this.props.audioToTextStatusHandler} textPageStatusHandler={this.textPageStatusHandler}/>
            </div>
        );
    }
};

export default AudioToText;