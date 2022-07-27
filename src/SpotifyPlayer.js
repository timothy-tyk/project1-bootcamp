import React from "react";

export default class SpotifyPlayer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let src_url = `https://open.spotify.com/embed/playlist/${this.props.url}utm_source=generator&theme=0`;
    return (
      <iframe
        className="spotifyplayer"
        src={src_url}
        width="60%"
        height="80"
        frameBorder="0"
        allowFullScreen=""
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
    );
  }
}

// https://open.spotify.com/playlist/37i9dQZF1E4BmUBMjxwNOl?si=addc7a9f4db44b7b
