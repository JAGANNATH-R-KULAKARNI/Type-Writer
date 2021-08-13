import React from 'react';
import DialogUI from './DialogUI';
import TextELayout from './textELayout';

class TextExtraction extends React.Component
{
    render()
    {
        return (
            <div>
            <DialogUI textExtractionStatusHandler={this.props.textExtractionStatusHandler} textelayout={<TextELayout />}/>}/>
            </div>
        );
    }
};

export default TextExtraction;