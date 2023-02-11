import { SearchBar } from "../Components/SearchBar/SearchBar";
import {clientId as id} from "./config"

let userAccessToken = '';
const clientId = id;
const redirectUri = 'http://jammmingwithradu.surge.sh';

const Spotify = {
    getAccessToken() { 
        if (userAccessToken) {
            return userAccessToken;
        } else {
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
            if (accessTokenMatch && expiresInMatch) {
                userAccessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);
                window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return userAccessToken;
            } else {
                window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            }
        }},
    async search(term) {
        const accessToken = Spotify.getAccessToken();
        const endpoint = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        try {
            const response = await fetch(endpoint, {
                headers: { Authorization: `Bearer ${accessToken}`

            }
        });
        if (response.ok) {
            const responseJson = await response.json();
            if(responseJson.tracks.items.length > 0) {
                return responseJson.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }))} else {
                    return [];
                }}}
            catch(error) {
                console.log(error);
            }
        },
    
    async getUserID() {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        const userID = '';
        const userIdEndpoint = 'https://api.spotify.com/v1/me';
        
        try {
            const response = await fetch(userIdEndpoint, {
                headers: headers});
            if (response.ok) {
                const responseJson = await response.json();
                if(responseJson.id) {
                    userID = responseJson.id;
                    return userID;
                }
            } 
        } catch (error) {
            console.log(error);           
            }
        },

    async createPlaylist(name) {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: 
                `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            };
        const userID = await Spotify.getUserID();
        const createPlayURL = `https://api.spotify.com/v1/users/${userID}/playlists`;
        const playlistID = '';

        try {
            const response = await fetch(createPlayURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    name: name
                    })
                });
            
            if (response.ok) {
                const responseJson = await response.json();
                
                if (responseJson.id) {
                    playlistID = responseJson.id;
                    return playlistID;
                }
            }
        } catch (error) {
            console.log(error);
        }
    },

    async savePlaylist(name, trackURIs) {
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: 
            `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        const playlistID = await Spotify.createPlaylist(name);
        const addTracksURL = `/v1/playlists/${playlistID}/tracks`;

        try {
            const response = await fetch(addTracksURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    uris: trackURIs
                })
            })
             
            if (response.ok) {
                const responseJson = await response.json();
                
                if (responseJson['snapshot_id']) {
                    const snapshot_id = responseJson['snapshot_id'];
                    console.log(`Great, the songs have been added. Snapshot: ${snapshot_id}`);
                } else {
                    throw new Error('The track has not been added to the playlist!')
                }
            }
        } catch (error) {
            console.log(error)
        }


    }

}

//savePlaylist requires the following methods:
// 1. getUserID()
// 2. create a new playlist and return playlist ID: createPlaylist(name)
// 3. savePlaylist(trackURIs)

console.log(`This is the app's access token: ${Spotify.getAccessToken()}`)

export default Spotify