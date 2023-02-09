import React from 'react';
import { Track } from '../Track/Track';
import './TrackList.css';

export class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                
                {this.props.tracks.map(track => 
                    <Track 
                        key = {track.id}
                        track={track}
                        onAdd={this.props.onAdd}
                        onRemove={this.props.onRemove}
                        isRemoval={this.props.isRemoval}                    
                    />
                    )}
            </div>
        )}}
//Potentially the rendering of track details (e.g name, artist) is required
/* /* <!-- You will add a map method that renders a set of Track components  --> */