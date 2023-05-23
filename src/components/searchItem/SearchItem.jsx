import React from 'react'
import "./searchitem.css"
import { Link } from 'react-router-dom';

function SearchItem({ trip }) {
    const { name, location, description, total_per_day, base_expenses, food_cuisine, currency, images,id } = trip;
    return (
      <div className='searchItem'>
          <img
              src= {`${images[0].url.replace("/upload","/upload/w_200")} `}
              alt=""
              className="siImg"
          />
          <div className="siDesc">
              <h1 className="siTitle">{name}</h1>
                <span className='siAirport'>{ location }</span>
                <span className='siTaxiOp'>{description}</span>
                <span className='siSubtitle' ></span>
              <span className='siFeatures'>Bed & Breakfast, Free drinks</span>
              <span className='siCancelOp'>{food_cuisine ==="Other"? "" : "Food cuisine: " + food_cuisine}</span>
          </div>
          <div className="siDetails">
              <div className="siRating">
                  <span className='siRatingText'>Perfect</span>
                  <button>9.5</button>
              </div>
                <div className="siDetailsText">
                    <span className='siPrice'>{base_expenses + " " + currency}</span>
                    <span className='siPriceDesc'>Flight cost</span>
                    <span className='siPrice'>{total_per_day + " " + currency}</span>
                    <span className='siPriceDesc'>per night</span>
                  <Link to={`/trips/${id}`} state={{data: trip}}><button className='siCheckButton'>Check Trip</button></Link>
              </div>
          </div>
      </div>
  )
}

export default SearchItem