import React from "react";

export default class SpotifyPlayer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <iframe
        className="spotifyplayer"
        src="https://open.spotify.com/embed/playlist/0RHfBBUnAECI9EsqA1IoPi?utm_source=generator&theme=0"
        width="60%"
        height="80"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
    );
  }
}
