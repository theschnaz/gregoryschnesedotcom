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
              <h1 className="responsive-headline">How to Run a Proper A/B Test</h1>
              <h2>Market like Schnese:</h2>
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
                <h2><How to run a proper A/B Test</h2>
                <p>"Let's just run a test." -every startup ever</p>
                <p>Testing gets thrown around a lot at companies, but many people don't appreciate what are good test candidates and how much effort and time are required to run a proper test.</p>
                <p>What is an A/B test?</p>
                <p>In simple terms, an A/B test is used to see how a change impacts a metric. If we change our signup button from green to blue, how does that impact our signup rate? We use an A/B test, where the only difference between our two groups is the change we introduced. This way, any extraneous events (news, seasonality, etc.) will impact both groups equally so we can focus only on the change we introduce.</p>
                <p>To run a proper A/B test we need to anticipate what we expect the impact to be, calculate our required sample size, and then see if the results are statically significant. Sample size and statistical significance are important because we want to make sure change in results is caused by our actions and not something else, or something random.</p>
                <p>In general, the larger the impact of a test will be, the smaller the required sample size will be. This is just a fancy way of saying when you have lower amounts of traffic, you want to see bigger changes in your tests. You want to swing for the fences here as the number of people needed to run a proper test decreases. We'll get into that more below.</p>
                <p>What are things people don't know about A/B tests?</p>
                <p>People generally underestimate the amount of traffic (time) required to generate a proper sample size.</p>
                <p>According to <a href="https://www.abtasty.com/sample-size-calculator/">abtasty.com</a> you would need 30,244 people per test bucket (60,488 in total) to detect a 10% change in a metric, with 95% stasticial signifiance:</p>
                <p><img src="/images/writing/chapterthree/samplesize1.png" /></p>
                <p>To detect a 30% lift, you would only need 3,449 people per group or 6,898 in total.</p>
                <p><img src="/images/writing/chapterthree/samplesize2.png" /></p>
                <p>What does this mean on a day to day basis for a growth marketer? When our traffic for a test is low, we want the outcome of the test to be more dramtic. We want to target improvements around 30% or higher. We need to have some reason to think our test could deliver a gain like this, if it can't, we need to think of a new idea to test.</p>
                <blockquote class="twitter-tweet"><p lang="en" dir="ltr">Since your startup has less traffic, that means test duration is inherently longer. Making small changes (like moving a button) compounds that issue since it’s a small relative change on a small sample size. Resolving a test with 5% lift could take months. That’s useless.</p>&mdash; Andy Johns (@ibringtraffic) <a href="https://twitter.com/ibringtraffic/status/1215752564924268545?ref_src=twsrc%5Etfw">January 10, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
                <p>An example of a proper A/B test</p>
                <p><img src="/images/writing/chapterthree/sampletest.png" /></p>
                <p>Let's say we want to increase the View Homepage -> Newsletter Signup rate for this site. The above example (controll on the left, test on the right) would be a good test to run. The anticipated change is large so the overall sample size is relaitvly small:</p>
                <p><img src="/images/writing/chapterthree/samplesize3.png" /></p>
                <p>Assuming we want to increase the Newsletter Signup rate by 40%, with 500 visitors per day, we could run this test for 20 days. This sounds reasonable.</p>
                <p><img src="/images/writing/chapterthree/testresults.png" /></p>
                <p>After 20 days, we plug our numbers into a <a href="https://www.socscistatistics.com/tests/ztest/default2.aspx">stasticial significance calculator</a></p>
                <p>In the above example, we can see our test version won and we have 90% confidence the change is due to efforts and not chance.</p>
                <p>What happens when the results are not stasticial significant?</p>
                <p><img src="/images/writing/chapterthree/testresults2.png" /></p>
                <p>While a successful test is great, we find ourselves in the gray area where the test is not sucessful becuase it is not stastically significant. In other words, we can't tell if the change is actully due to our efforts or something else. When we find ourselves in this situation we can allow the test to contineut to run to collect addtional data, accecpt the test, or reject the test. When possible, I like to continue to collect data as stastical signficance is important to me, it's like setting a solid foundation to build upon. Each situation and team will be differnt here.<p>
                <p>Feel free to reach out with any questions. I’d love to hear about your success with A/B tests!</p>
                <br /><br />
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
