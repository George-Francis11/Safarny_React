import React, { useState } from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import "./list.css"
import { useLocation } from 'react-router-dom'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'

const List = () => {

  const location = useLocation();
  //set destination, date and options from location using setState
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setopenDate] = useState(false);
  
  const [options, setOptions] = useState(location.state.options);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label htmlFor='destination' >Destination</label>
              <input type="text" placeholder="Destination" id='destination' value={destination}/>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={()=>setopenDate(!openDate)}>{
                date[0].startDate.getDate() + "/" + (date[0].startDate.getMonth() + 1) + "/" + date[0].startDate.getFullYear() + " to "
                + date[0].endDate.getDate() + "/" + (date[0].endDate.getMonth() + 1) + "/" + date[0].endDate.getFullYear()
              }</span>
              {openDate && (<DateRange onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                ranges={date}
              />)}
            </div>
            <div className="lsItem">
              <label>Option</label>
              <div className='lsOptions'>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Rooms
                </span>
                <input type="number" min={1} className='lsOptionInput' placeholder={options.rooms} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Adults
                </span>
                <input type="number" min={1} className='lsOptionInput' placeholder={options.adults} />
              </div>
              <div className="lsOptionItem">
                <span className="lsOptionText">
                  Children
                </span>
                <input type="number" min={0} className='lsOptionInput' placeholder={options.children } />
              </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
          </div>
        </div>
      </div>
    </div>
  )
}


export default List