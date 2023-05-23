import React, { useState } from 'react'
//import css
import './header.css'
//import fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCab, faCalendarDays, faCar, faHotel, faPerson, faPlane } from '@fortawesome/free-solid-svg-icons'
//import date-range library
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';






export default function Header({ type }) {
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        rooms: 1,
        adults: 1,
        children: 0
    });

    const navigate = useNavigate()

    const handleSearch = () => {
        navigate('/trips', {state: {destination,date,options}})
    }
  return (
      <div className='header'>
          <div className={ type === "list" ? "headerContainer listMode" : "headerContainer" }>
              <div className='headerList'>
                  <div className='headerListItem active'>
                      <FontAwesomeIcon icon={faHotel} />
                      <span>Rooms</span>
                  </div>
                  <div className='headerListItem'>
                      <FontAwesomeIcon icon={faCab} />
                      <span>Airport cab</span>
                  </div>
                  <div className='headerListItem'>
                      <FontAwesomeIcon icon={faCar} />
                      <span>Car rental</span>
                  </div>
                  <div className='headerListItem'>
                      <FontAwesomeIcon icon={faPlane} />
                      <span>Flight</span>
                  </div>
              </div>
              
              {type !== "list" &&
                  <>
                      <div className="headerSearch">
                          <div className="headerSearchItem">
                              <FontAwesomeIcon icon={faBed} className='headerIcon' />
                          <input type="text" placeholder='where are you going?' className='headerSearchInput'
                              value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                          />
                          </div>
                          <div className="headerSearchItem">
                              <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                              <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate, "dd/MM//yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
                              {openDate && <DateRange
                                  editableDateInputs={true}
                                  onChange={item => setDate([item.selection])}
                                  moveRangeOnFirstSelection={false}
                                  ranges={date}
                                  className='headerSearchDate'
                              />}
                          </div>
                          <div className="headerSearchItem">
                              <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                              <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.rooms} rooms, ${options.adults} adults, ${options.children} children`}</span>
                              {openOptions && <div className="headerSearchOptions">
                                  <div className="headerSearchOptionItem">
                                      <span>Rooms</span>
                                      <div className="optionCounter">

                                          <button onClick={() => setOptions({ ...options, rooms: options.rooms - 1 < 1 ? 1 : options.rooms - 1 })} className="headerSearchOptionBtn">-</button>
                                          <span>{options.rooms}</span>
                                          <button onClick={() => setOptions({ ...options, rooms: options.rooms + 1 })} className="headerSearchOptionBtn">+</button>
                                      </div>
                                  </div>
                                  <div className="headerSearchOptionItem">
                                      <span>Adults</span>
                                      <div className="optionCounter">
                                          <button onClick={() => setOptions({ ...options, adults: options.adults - 1 < 1 ? 1 : options.adults - 1 })} className="headerSearchOptionBtn">-</button>
                                          <span>{options.adults}</span>
                                          <button onClick={() => setOptions({ ...options, adults: options.adults + 1 })} className="headerSearchOptionBtn">+</button>
                                      </div>
                                  </div>
                                  <div className="headerSearchOptionItem">
                                      <span>Children</span>
                                      <div className="optionCounter">
                          
                                          <button onClick={() => setOptions({ ...options, children: options.children - 1 < 0 ? 0 : options.children - 1 })} className="headerSearchOptionBtn">-</button>
                                          <span>{options.children}</span>
                                          <button onClick={() => setOptions({ ...options, children: options.children + 1 })} className="headerSearchOptionBtn">+</button>
                                      </div>
                                  </div>
                              </div>}
                          </div>
                          <button className="headerBtn" onClick={handleSearch}>Search</button>
                  </div>
                    </>}
                      </div>
      </div>
  )
}
