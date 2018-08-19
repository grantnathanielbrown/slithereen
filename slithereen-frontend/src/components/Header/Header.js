import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <h1>Slithereen</h1>
                <p> A multiplayer trivia game built with React and socket.io. If you're an employer / recruiter, please test out
                    the multiplayer functionality by opening multiple tabs, or <a href="https://www.linkedin.com/in/grant-brown-a6b87a92/">shoot me a message on LinkedIn</a> and we can play together. </p>
            </div>
        );
    }
}

export default Header;