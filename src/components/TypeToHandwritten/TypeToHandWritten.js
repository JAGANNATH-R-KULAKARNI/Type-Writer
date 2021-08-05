import React from 'react';
import DialogUI from './DialogUI';
class TypeToHand extends React.Component
{
    render()
    {
        return (
            <div>
        <DialogUI typeToHandwrittenStatusHandler={this.props.typeToHandwrittenStatusHandler}/>
            </div>
        );
    }
};

export default TypeToHand;