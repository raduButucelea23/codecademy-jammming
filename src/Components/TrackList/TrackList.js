import React from 'react';
import { Track } from '../Track/Track';
import './TrackList.css';

export class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {/* <!-- You will add a map method that renders a set of Track components  --> */}
                {this.props.tracks.map(track => 
                    <Track 
                        key = {track.id}
                        track={track} />
                    )}
            </div>
        )}}
//Potentially the rendering of track details (e.g name, artist) is required