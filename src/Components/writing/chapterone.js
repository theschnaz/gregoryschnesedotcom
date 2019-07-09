import React, { Component } from 'react';

class About extends Component {
  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var profilepic= "../images/profilepic.jpg";
      var bio = this.props.data.bio;
      var poker = this.props.data.poker;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var resumeDownload = this.props.data.resumedownload;
      var networks= this.props.data.social.map(function(network){
        return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
      })
    }

    return (
      <div>
        <header id="home" className="toc">
          <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
	          <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>
            <ul id="nav" className="nav">
              <li className="current"><a href="/">Home</a></li>
            </ul>
          </nav>
          <div className="row banner">
            <div className="banner-text">
              <h1 className="responsive-headline">Marketing Unraveled</h1>
              <h2>The modern standard for SaaS growth and marketing.</h2>
              <hr />
              <ul className="social">
                {networks}
                </ul>
              </div>
            </div>
            <p className="scrolldown">
              <a className="smoothscroll" href="#target"><i className="icon-down-circle"></i></a>
            </p>
        </header>
        <div id="target">
          <section id="writing" >
            <div className="row">
              <div className="three columns">
                <img className="profile-pic"  src="/images/profilepic.jpg" alt="Gregory Schnese Profile Pic" />
              </div>
              <div className="nine columns main-col">
                <h2>Introduction and Table of Contents</h2>
                <p>
                  This is where the new post will go.
                </p>
              </div>
            </div>
          </section>
        </div>
        <footer>
          <div className="row">
            <div className="twelve columns">
              <ul className="social-links">
                <li key="twitter"><a href="https://twitter.com/theschnaz"><i className="fa fa-twitter"></i></a></li>
                <li key="linkedin"><a href="https://www.linkedin.com/in/gregory-schnese-608a952"><i className="fa fa-linkedin"></i></a></li>
                <li key="github"><a href="http://github.com/theschnaz"><i className="fa fa-github"></i></a></li>
              </ul>
              <ul className="copyright">
                <li>&copy; Copyright 2019 Gregory Schnese</li>
              </ul>
            </div>
            <div id="go-top"><a className="smoothscroll" title="Back to Top" href="#home"><i className="icon-up-open"></i></a></div>
          </div>
        </footer>
      </div>
    );
  }
}

export default About;
