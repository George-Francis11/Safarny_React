import React from 'react'
import Button from 'react-bootstrap/Button';
import './landing.css'
import { Link } from 'react-router-dom';

function Landing() {
  return (
      <div className='landing'>
          <div className='landingContainer'>
              <div className='landingText'>
                  <h1 className='landingTitle'>Safarny</h1>
                  <h2 className='landingSubtitle'>Your next trip is one click away</h2>   
                  <div className="buttons">
                      <Link to={"/trips"} state={{ data: {season : "Summer"} }}><button className='landingButton summer' variant="primary" size="lg" href='/trips?season=winter'>Summer Vacation</button></Link>
                      <Link to={"/trips"} state={{ data: {season: "Winter"} }}><button className='landingButton winter' variant="primary" size="lg" href='/trips?season=winter'>Winter Vacation</button></Link>                   
                  </div>
                  </div>
                  </div>
                  

      </div>
  )
}

export default Landing