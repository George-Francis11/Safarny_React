import React from 'react'
import "./searchitem.css"

function SearchItem() {
  return (
      <div className='searchItem'>
          <img
              src="https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt=""
              className="siImg"
          />
          <div className="siDesc">
              <h1 className="siTitle">Barcelona</h1>
              <span className='siAirport'>Barcelona International Airport</span>
              <span className='siTaxiOp'>Free Airport taxi</span>
              <span className='siSubtitle' >5 Stars Hotel</span>
              <span className='siFeatures'>Bed & Breakfast, Free drinks</span>
              <span className='siCancelOp'>Free cancellation</span>
          </div>
          <div className="siDetails">
              <div className="siRating">
                  <span className='siRatingText'>Perfect</span>
                  <button>9.5</button>
              </div>
              <div className="siDetailsText">
                  <span className='siPrice'>$ 100</span>
                  <span className='siPriceDesc'>per night</span>
                  <button className='siCheckButton'>Check Trip</button>
              </div>
          </div>
      </div>
  )
}

export default SearchItem