import { render } from '@testing-library/react';
import './App.css';
import React, { Component } from 'react';
import { SearchBar } from '../SearchBar/SearchBar.js'; 
import { SearchResults } from '../SearchResults/SearchResults.js';
import { Playlist } from '../Playlist/Playlist.js';


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: [
      {
        name: 'Redbone', 
        artist: 'Childish Gambino',
        album: 'Awaken, My Love!' 
      },
      {
        name: 'Sway', 
        artist: 'Charlie de Medici',
        album: 'Sway' 
      },
      {
        name: 'Ophelia', 
        artist: 'The Lumineers',
        album: 'Cleopatra' 
      }
    ],
    playlistName: 'MyLikedSongs',
    playlistTracks: [
      {
        name: 'Sway',
        artist: 'Charlie de Medici',
        album: 'Sway',
        id: 0
      }
    ]
  };

  this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.some(savedTrack => savedTrack.id === track.id)) {
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track]
      });
    }
  }

  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist 
              playlistName= {this.state.playlistName}
              playlistTracks= {this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
  );
}}
