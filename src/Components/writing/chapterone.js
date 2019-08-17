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
              <h1 className="responsive-headline">Yield and Bounty:<br />The Framework for Paid SaaS Growth</h1>
              <h2>Marketing Unraveled</h2>
              <h2>The modern standard for SaaS growth and marketing.</h2>
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
                <h2>Yield and Bounty: The Framework for Paid SaaS Growth</h2>
                <p>What is yield based marketing and how can bounties help you achieve your marketing goals? I'm glad you asked. Get ready, we're going to dive in and answer those questions!</p>
                <p>In SaaS marketing, the goal is to generate a high return on marketing effort and spend. Many ad platforms support this through return on ad spend (ROAS) bidding. Google calculates ROAS by summing your sales, dividing by spend, then multiplying by 100%:</p>
                <p>
                  <img src="/images/writing/chapterone/roas.png" />
                  <br />
                  (<a href="https://support.google.com/google-ads/answer/6268637?hl=en" target="_blank">https://support.google.com/google-ads/answer/6268637?hl=en</a>)
                </p>
                <p>While this is easy to understand, it’s much harder to implement and actually generate marketing value. In this chapter, we’ll look at which steps we can take to build our marketing machine so we can generate a high return on ad spend (aka yield).</p>
                <p>At the beginning, the problem is volume or frequency of events. We need data to do fancy bidding like ROAS but when we're starting out, we don't have a large dataset and we can't generate it quickly enough. What's a SaaS marketer to do?</p>
                <p>Let’s say we have the following marketing funnel:
                	<ol>
                		<li>Suspect (landing page visitors, etc.)</li>
                		<li>MQL (marketing qualified lead)</li>
                		<li>SAL (sales accepted lead)</li>
                		<li>Customer (someone who can generate recurring revenue)</li>
                	</ol>
                </p>
                <p>We’ll have many more suspects than customers, sometimes as much as 100x. ROAS bidding assumes we have enough sales or customer data to pass back to an ad partner which will use this data to optimize our campaign.</p>
                <p>When we aren’t generating enough sales or customer events, we'll need to look higher up the funnel to a place where we generate enough volume of events. At minimum, we want at least 30 events per week. We can continue to move up our funnel until we find an event that generates enough volume.</p>
                <p>Now that we have selected the event, we’ll use the MQL event for this example, how do we calculate a return on MQL events? (This will be used as an approximation of events further down the funnel.)</p>
                <p>To do this, we’ll need to write out the funnel and the conversion rates from one step to the next. For our example, we can assume:</p>
                <p>
                  <img src="/images/writing/chapterone/spreadsheet.png" />
                  <br />
                  (<a href="https://docs.google.com/spreadsheets/d/1WYv0ySyocdrn8W8Dbz0Kv4zzJb4UrZ4Coiul8sgY0nI/edit?usp=sharing" target="_blank">via Google Sheets</a>)
                </p>
                <p>For every suspect we generate, 20% of them become MQLs, 30% of MQLs become SALs, and 50% of SALs become paying customers. If our goal was to generate a new paying customer for every $500 in spend, we could set a bounty of $75 for our MQL event.</p>
                <p>In other words, for every $75 we spend, we want to generate 1 MQL. For every $500 we spend, we want to generate a new customer.</p>
                <p><img src="/images/writing/chapterone/mql.jpg" /></p>
                <p>Now that we have a bounty value, what are we going to do with it? We’re going to create our yield (or return) metric!</p>
                <p>Yield is calculated like ROAS, but we are using our bounty values instead of customer ARR or sales:</p>
                <p>Yield = ((# of conversions * bounty per conversion) / spend) * 100%</p>
                <p><img src="/images/writing/chapterone/yield.jpg" /></p>
                <p>Let’s say we spent $1,300 and generated 15 MQLs. How much yield did we generate?</p>
                <p>((15 * $75) / $1,300) * 100% = 87%</p>
                <p>I typically aim for yields that are 70% or higher, but yield targets are highly dependent on your industry and product.</p>
                <p>As we build volume and spend more, we’ll generate more data. Once we hit the 30 SAL conversions per week, we can repeat this entire process again and find our SAL yield. We can grow our data, spend, and repeat this process until we generate enough customers or purchases. At that point, yield and ROAS become the same metric.</p>
                <p>Feel free to reach out with any questions. I’d love to hear about your success with yield based marketing!</p>
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
