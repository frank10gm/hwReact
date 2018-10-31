import React, { Component } from 'react';

class MessageView extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    renderSquare(i) {
        const status = 'Next player: X';
        return <div>{i}</div>;
    }

    render() {                        
        return(
            <div className="shopping-list">
                {this.renderSquare(24)}
                <br /><br />                
                <button className="square" onClick={() => this.props.onClick()}>
                    ciao {this.props.value}
                </button>
            </div>
        )
    }
}

export default MessageView;