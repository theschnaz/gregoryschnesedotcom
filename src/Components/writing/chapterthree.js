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
        <header id="home" className="toc3">
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
                <h2>How to Run a Proper A/B Test</h2>
                <p>"Let's just run a test." -every startup ever</p>
                <p>Testing gets thrown around a lot at companies, but many people don't appreciate what are good test candidates and how much time is required to run a proper test.</p>
                <p><strong>What is an A/B test?</strong></p>
                <p>In simple terms, an A/B test is used to see how a change impacts a metric. If we change our signup button from green to blue, how does that impact our signup rate? By using two (A or B) or more groups, any extraneous influences (news, seasonality, etc.) will impact both groups equally so we can focus only on the change we introduce. We isolate our change so it is the only difference between the groups. This way, we can be confident the change in metrics is due to our effort.</p>
                <p><strong>First A/B Test</strong></p>
                <p>To run a proper A/B test we need to anticipate what we expect the impact to be, calculate our required sample size, and then see if the results are statically significant. Sample size and statistical significance are important because we want to make sure the change in a metric is caused by our actions and not something else.</p>
                <p>In general, the larger the impact of a test, the smaller the required sample size. This is just a fancy way of saying when we have lower amounts of traffic, we want to see bigger changes in our tests. Think of improving our metric by 30% or more, not by 5%. With low traffic, we need big wins to finish a test within an acceptable amount of time.</p>
                <p><strong>People are Bad at A/B Tests</strong></p>
                <p>People generally underestimate the amount of traffic (time) required to generate a proper sample size.</p>
                <p>According to <a target="_blank" href="https://www.abtasty.com/sample-size-calculator/">abtasty.com</a> we would need 30,244 people per test group (60,488 in total) to detect a 10% change, with 95% statistical significance, given a 5% starting conversion rate:</p>
                <p><img src="/images/writing/chapterthree/samplesize1.png" /></p>
                <p>How long does it take to generate over 60k unique visitors? Probably too long...</p>
                <p><img src="/images/writing/chapterthree/samplesize2.png" /></p>
                <p>To detect a 30% lift, we would only need 3,449 people per group or 6,898 in total.</p>
                <p>What does this mean on a day-to-day basis for a growth marketer? When our traffic for a test is low, we want the outcome to be dramatic. We want to target improvements 30% or higher. We need to have some reason to think our test could deliver a gain like this, if it can't, we need to think of a new idea.</p>
                <blockquote ><p lang="en" dir="ltr">Since your startup has less traffic, that means test duration is inherently longer. Making small changes (like moving a button) compounds that issue since it’s a small relative change on a small sample size. Resolving a test with 5% lift could take months. That’s useless.</p>&mdash; Andy Johns (@ibringtraffic) <a target="_blank" href="https://twitter.com/ibringtraffic/status/1215752564924268545?ref_src=twsrc%5Etfw">January 10, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
                <p><strong>A Proper A/B Test</strong></p>
                <p><img src="/images/writing/chapterthree/sampletest.png" /></p>
                <p>Let's say we want to increase the View Homepage -> Newsletter Signup rate for this site. The above example (control on the left, test on the right) would be a good test to run. The anticipated change is large so the overall sample size is relatively small:</p>
                <p><img src="/images/writing/chapterthree/samplesize3.png" /></p>
                <p>Assuming we want to increase the Newsletter Signup rate by 40%, with 500 visitors per day, we could run this test for 20 days. This sounds reasonable.</p>
                <p><strong>Statistical Significance</strong></p>
                <p><img src="/images/writing/chapterthree/testresults.png" /></p>
                <p>After 20 days, we plug our numbers into a <a href="https://www.socscistatistics.com/tests/ztest/default2.aspx">statistical significance calculator</a> (above.)</p>
                <p>In our example, we can see our test version won and we have 95% confidence the change is due to our efforts and not chance.</p>
                <p>What happens when the results are not statistically significant?</p>
                <p><img src="/images/writing/chapterthree/testresults2.png" /></p>
                <p>While a successful test is great, we sometimes find ourselves in this gray area where we haven't reached statistical significance. In other words, we can't tell if the change is actually due to our efforts or something else. To address this, we can allow the test to continue to collect data, accept the test, or reject the test. When possible, I like to continue to collect data as statistical significance is important to me, it's like setting a solid foundation to build upon. Each situation and team will be different here.</p>
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
