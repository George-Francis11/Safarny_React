import React from 'react'
import "./mailList.css"


function MailList() {
  return (
    <div className="mail">
          <h1 className="mailTitle">Save money, save Time!</h1>
          <span className="mailDesc">Sign up to save money</span>
          <div className="mailInputContainer">
              <input type="text" placeholder='Email address' />
              <button>Subscribe</button>
          </div>

    </div>
  )
}

export default MailList