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
        <header id="home" className="toc2">
          <nav id="nav-wrap">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">Show navigation</a>
	          <a className="mobile-btn" href="#home" title="Hide navigation">Hide navigation</a>
            <ul id="nav" className="nav">
              <li className="current"><a href="/">Home</a></li>
            </ul>
          </nav>
          <div className="row banner">
            <div className="banner-text">
              <h1 className="responsive-headline">Metrics in Metrics:<br />Find the Winning Segments Within</h1>
              <h2>Marketing Unraveled</h2>
              <h2>The modern framework for SaaS growth and marketing.</h2>
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
                <center>
                  <img className="profile-pic"  src="/images/profilepic.jpg" alt="Gregory Schnese Profile Pic" />
                  <p>Gregory Schnese</p>
                </center>
              </div>
              <div className="nine columns main-col">
                <h2>Metrics in Metrics: Find the Winning Segments Within</h2>
                <p>Growth marketing is all about leveraging our winners and minimizing our losers. In chapter one, we discussed <a href="/yields-and-bounties">yields, bounties, and how to calculate them</a>. In this chapter, we will explore how our conversion rate metrics are really just averages, the segments that make up our metrics, and how to improve marketing by applying our yield and bounties framework to our winning segments.</p>
                <p>Many companies track Very Important Key Performance Indicators (KPIs) or metrics. A user sign up, an app download, a trialing customer upgrading to a paid plan are all good examples.</p>
                <p>For this chapter, let's pretend we are Netflix and we want to improve our trial to paying customer rate which is currently 13.3%. When we look at this metric, what we're reallying saying is <strong>on average</strong> our trialing accounts convert to paying customers 13.3% of the time.</p>
                <p>While this may be true, when we take data and average it, we throw away a lot of the nuance in order to generate a clean and crisp datapoint.</p>
                <p><strong>How can we improve our trial to paying customer rate?</strong></p>
                <p>To start, let's assume our trial to paying customer rate is currently 13.3%. Since we know this metric is an average of all of our users, we can start to break it down into meaningful segments. What could be a meaningful segment for us? Maybe it's location, age, or customer interest category. For this post, let's go with customer interest category:</p>
                <p><img src="/images/writing/chaptertwo/rate.png" /></p>
                <p>When we slice our data by customer interest category, we find:</p>
                <ul>
                  <li>Horror fans convert from trial to paid at 12%</li>
                  <li>Comedy fans convert from trial to paid at 25%</li>
                  <li>Reality TV fans convert from trial to paid at 3%</li>
                </ul>
                <p>We clearly want direct our marketing efforts at comedy fans and avoid reality TV fans.</p>
                <p><strong>How can we target comedy fans?</strong></p>
                <p>We can use a tool, like <a href="https://segment.com/docs/spec/track/" target="_blank">Segment</a>, and pass a trialing customer's most watched category as a datapoint when they upgrade to a paying customer:</p>
                <p><img src="/images/writing/chaptertwo/segment.png" /></p>
                <p>Now that we are passing the type of customer (mostWatchedCategory) when they upgrade to a paying customer, we can send that data to an ad partner such as Google or Facebook. With these services, we can create an audience that looks like (a <a href="https://www.facebook.com/business/help/164749007013531" target="_blank">lookalike audience</a>) our best converting segment (comedy).</p>
                <p>With our new comedy lookalike audience, we can target people who are similar to our best converting customers. We can even match the creative of our campaign to the type of incoming traffic. When people hit our landing page, we can show them funny shows and movies.</p>
                <p>If we want to get advanced, we can make audiences for our lower performing segments and exclude them (do not spend money advertising to these people.)</p>
                <p>By breaking our important metrics into meaningful segments, we can spend more money on high winners, less money on low performers, and we can match the creative to the type of people we target!</p>
                <p>Feel free to reach out with any questions. I’d love to hear about your success with segment based marketing!</p>
                <br />
                <br />
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
