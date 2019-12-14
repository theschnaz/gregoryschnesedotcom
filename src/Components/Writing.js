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
           <h1><span>&nbsp;</span></h1>
        </div>

        <div className="nine columns main-col">
           <div className="row item">
              <div className="twelve columns">
               <h3>Market like Schnese: A Series of Growth Marketing Lessons</h3>
               <p class="info">The modern standard for SaaS growth and marketing.</p>
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
                <p class="info">What is yield based marketing and how can bounties help you achieve your marketing goals?</p>
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
                <p class="info">Unlock growth by breaking down metrics into meaningful segments and targeting the winners.</p>
               </div>
            </div>
         </div>
      </div>


   </section>
    );
  }
}

export default Resume;
