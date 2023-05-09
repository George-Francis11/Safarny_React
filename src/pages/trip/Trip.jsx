import React from 'react'
import "./trip.css"
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

export default function Trip() {
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="tripContainer">
        <div className="tripWrapper">
          <h1 className="tripTitle">Barcelona 5-days</h1>
          <div className="tripLocation">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Barcelona, Spain</span>
          </div>
        </div>
      </div>
    </div>
  )
}
