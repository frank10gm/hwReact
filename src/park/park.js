import React, { Component } from 'react';
import PropTypes from "prop-types";

import logo_park from '../images/logo-park.png';

class Park extends Component {
    
    static contextTypes = {
        router: PropTypes.object
    }

    constructor(props, context) {
        super(props, context) 

        this.props.state.changeLogo(logo_park)

        this.state = {
            
        };      
    }    

    componentWillUnmount(){
        this.props.state.changeLogo()
    }

    render(){
        return <div>Park</div>
    }
}

export default Park;