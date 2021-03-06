import React, { Component } from 'react';

class Resume extends Component {
  render() {

    if(this.props.data){
      var skillmessage = this.props.data.skillmessage;
      var education = this.props.data.education.map(function(education){
        return <div key={education.school}><h3>{education.school}</h3>
        <p className="info">{education.degree} <span>&bull;</span><em className="date">{education.graduated}</em></p>
        <p>{education.description}</p></div>
      })
      var work = this.props.data.work.map(function(work){
        return <div key={work.company}><h3>{work.company}</h3>
            <p className="info">{work.title}<span>&bull;</span> <em className="date">{work.years}</em></p>
            <p>{work.description}</p>
        </div>
      })
      var skills = this.props.data.skills.map(function(skills){
        var className = 'bar-expand '+skills.name.toLowerCase();
        return <li key={skills.name}><span style={{width:skills.level}}className={className}></span><em>{skills.name}</em></li>
      })
    }

    return (
      <section id="writing">

      <div className="row education">
        <div className="three columns header-col">
           <h1><span></span></h1>
        </div>

        <div className="nine columns main-col">
           <div className="row item">
              <div className="twelve columns">
               <h3>Market like Schnese:<br />A Series of Growth Marketing Lessons</h3>
               <p className="info">The modern standard for SaaS growth and marketing.</p>
              </div>
           </div>
        </div>
        <br />
         <div className="three columns header-col">
            <h1><span>Lesson 1</span></h1>
         </div>

         <div className="nine columns main-col">
            <div className="row item">
               <div className="twelve columns">
                <h3><a href="/yields-and-bounties">Yield and Bounty:<br/>The Framework for Paid SaaS Growth</a></h3>
                <p className="info">Summary: Focus on events higher in your funnel when you don't geneate enough of the events you want to directly influence.</p>
               </div>
            </div>
         </div>
         <br />
         <div className="three columns header-col">
            <h1><span>Lesson 2</span></h1>
         </div>
         <div className="nine columns main-col">
            <div className="row item">
               <div className="twelve columns">
                <h3><a href="/metrics-in-metrics">Metrics in Metrics:<br/>Find the Winning Segments Within</a></h3>
                <p className="info">Short Version: Your metris are the sum of their parts. Find the best parts and focus on them.</p>
               </div>
            </div>
         </div>
         <br />
         <div className="three columns header-col">
            <h1><span>Lesson 3</span></h1>
         </div>
         <div className="nine columns main-col">
            <div className="row item">
               <div className="twelve columns">
                <h3><a href="/how-to-run-a-proper-ab-test">How to Run a Proper A/B Test</a></h3>
                <p className="info">TLDR: Tests are hard and people are bad at them. Learn how to be better at running A/B tests.</p>
               </div>
            </div>
         </div>
      </div>


   </section>
    );
  }
}

export default Resume;
