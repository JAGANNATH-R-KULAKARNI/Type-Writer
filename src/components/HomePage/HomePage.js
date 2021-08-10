import React from 'react';
import HomePageUI from './HomePageUI';
import TypeToHand from '../TypeToHandwritten/TypeToHandWritten';
class HomePage extends React.Component
{

    constructor()
    {
        super();
        this.state={
            typeToHandwrittenStatus : false,
        };

        this.typeToHandwrittenStatusHandler=this.typeToHandwrittenStatusHandler.bind(this);
    }
    
    typeToHandwrittenStatusHandler()
    {
        this.setState({
            typeToHandwrittenStatus : !this.state.typeToHandwrittenStatus
        })
    }

    render()
    {
        return (
            <div>
                {this.state.typeToHandwrittenStatus ? <TypeToHand typeToHandwrittenStatusHandler={this.typeToHandwrittenStatusHandler}/>:null}
                <HomePageUI typeToHandwrittenStatusHandler={this.typeToHandwrittenStatusHandler}/>
            </div>   
        );
    }
};

export default HomePage;