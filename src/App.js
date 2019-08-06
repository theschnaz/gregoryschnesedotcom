import React, { Component } from 'react';
import ReactGA from 'react-ga';
import $ from 'jquery';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import About from './Components/About';
import Resume from './Components/Resume';
import Contact from './Components/Contact';
import Writing from './Components/Writing';
import Testimonials from './Components/Testimonials';
import Portfolio from './Components/Portfolio';
import Helmet from 'react-cap';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      foo: 'bar',
      resumeData: {}
    };

    ReactGA.initialize('UA-143183510-1');
    ReactGA.pageview(window.location.pathname);

  }

  getResumeData(){
    $.ajax({
      url:'/resumeData.json',
      dataType:'json',
      cache: false,
      success: function(data){
        this.setState({resumeData: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.log(err);
        alert(err);
      }
    });
  }

  componentDidMount(){
    this.getResumeData();
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <meta name="description" content="Writings, presentations, services, and resume from Gregory Schnese." />
          <meta property="og:type" content="website" />
          <meta property="og:image" content="http://www.gregoryschnese.com/images/ogbackground.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="GregorySchnese.com" />
          <meta property="og:url" content="http://www.gregoryschnese.com" />
          <meta property="og:title" content="GregorySchnese.com" />
         <title>Gregory Schnese | Marketing, Software, & Poker</title>
        </Helmet>

        <Header data={this.state.resumeData.main}/>
        <About data={this.state.resumeData.main}/>
        <Writing />
        <Portfolio data={this.state.resumeData.portfolio}/>
        <Resume data={this.state.resumeData.resume}/>
        <Footer data={this.state.resumeData.main}/>
      </div>
    );
  }
}

export default App;
