import { render } from '@testing-library/react';
import './App.css';
import React, { Component } from 'react';
import { SearchBar } from '../SearchBar/SearchBar.js'; 
import { SearchResults } from '../SearchResults/SearchResults.js';
import { Playlist } from '../Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';


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
  this.removeTrack = this.removeTrack.bind(this);
  this.updatePlaylistName = this.updatePlaylistName.bind(this);
  this.savePlaylist = this.savePlaylist.bind(this);
  this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (!this.state.playlistTracks.some(savedTrack => savedTrack.id === track.id)) {
      this.setState({
        playlistTracks: [...this.state.playlistTracks, track]
      });
    }
  }

  removeTrack(track) {
    if (this.state.playlistTracks.some(savedTrack => savedTrack.id === track.id)) {
      this.setState({
        //fill in the code here
        playlistTracks: [...this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id)]
      });
    }
  }

  updatePlaylistName(newName) {
    this.setState({playlistName: newName});
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResults => {
      //this might be wrong since searchResults is an array of objects
      this.setState({searchResults: searchResults});
    });
  }


  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName= {this.state.playlistName}
              playlistTracks= {this.state.playlistTracks}
              onRemove = {this.removeTrack}
              onNameChange = {this.updatePlaylistName}
            />
          </div>
        </div>
      </div>
  );
}}
