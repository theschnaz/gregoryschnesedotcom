import React, { Component } from 'react';

class About extends Component {
  render() {

    if(this.props.data){
      var name = this.props.data.name;
      var profilepic= "images/"+this.props.data.image;
      var bio = this.props.data.bio;
      var poker = this.props.data.poker;
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone= this.props.data.phone;
      var email = this.props.data.email;
      var resumeDownload = this.props.data.resumedownload;
    } 

    return (
      <div id="target">
        <section id="about">
          <div className="row">
             <div className="three columns">
                <img className="profile-pic"  src={profilepic} alt="Gregory Schnese Profile Pic" />
             </div>
             <div className="nine columns main-col">
                <h2>I make SaaS companies grow.</h2>

                <p>{bio}</p>
                <p>{poker}</p>
                <div className="row">
                   <div className="columns contact-details">
                      <h2>Let's Work Together</h2>
                      <p className="address">
                         <span>{email}</span>
    					        </p>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </div>
    );
  }
}

export default About;
