import { render } from '@testing-library/react';
import './App.css';
import React, { Component } from 'react';
import { SearchBar } from '../SearchBar/SearchBar.js'; 
import { SearchResults } from '../SearchResults/SearchResults.js';
import { Playlist } from '../Playlist/Playlist.js';


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {searchResults: []}
  }


  render() {
    return (
      <div>
        <h1>Ja<span class="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults />
            <Playlist />
          </div>
        </div>
      </div>
  );
}}
