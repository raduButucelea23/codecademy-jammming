import React, { Component } from 'react';
import './Track.css';

export class Track extends React.Component {
    constructor(props) {
        super(props);
    }

    // renderAction() {
    //     if (isRemoval) {
    //         return <button> - </button>;
    //     } else {
    //         return <button> + </button>;
    //     }
    // }
    
    render() {
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3><!-- track name will go here --></h3>
                    <p><!-- track artist will go here--> | <!-- track album will go here --></p>
                </div>
                <button className="Track-action">{isRemoval ? '-' : '+'}</button>
            </div>
        )
    }
}