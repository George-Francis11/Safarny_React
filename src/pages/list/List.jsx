import React, { useState, useEffect } from 'react'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import "./list.css"
import { useLocation } from 'react-router-dom'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItem/SearchItem'
import axiosApiInstance from '../../utils/axios-middleware'
import { calculateRange, sliceData } from '../../utils/table-pagination';


const List = () => {
  // get the state from location
  const location = useLocation();
  // const season = location.state?.data.season ? data.season : "";
  const data = location.state?.data;
  const season = data.season ? data.season : "";
  //set destination, date and options from location using setState
  const [destination, setDestination] = useState( "Cairo");
  const [date, setDate] = useState( [
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
  const [openDate, setopenDate] = useState(false);
  
  const [options, setOptions] = useState( {
        rooms: 1,
        adults: 1,
        children: 0
    });
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('');
  const [tripsShown, setTripsShown] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState(1);
  let effectLock = false;

  useEffect(() => {
    if (effectLock) return;
    const filters = data.season ? "?season=" + season : "";
    console.log(filters);
    axiosApiInstance.get('/trips'+filters)
      .then(res => {
        setTrips(res.data.trips)
        setPagination(calculateRange(res.data.trips, 5));
        setTripsShown(sliceData(res.data.trips, 1, 5));
        setLoading(false)
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    effectLock = true;
  }, [])

  const __handleSearch = (event) => {
    console.log(event);
    setSearch(event.target.value);
    if (event.target.value !== '') {
      let search_results = trips.filter((item) =>
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setTripsShown(search_results);
      setPagination(calculateRange(search_results, 5));
    }
    else {
      __handleChangePage(1);
      setPagination(calculateRange(trips, 5));
    }
  };

    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setTripsShown(sliceData(trips, new_page, 5));
    }


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
              <input type="text" placeholder="Destination" id='destination' value={destination}
                onChange={(e) => setDestination(e.target.value)} />
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
            <button
              className={"lsButton " + season}
              onClick= {__handleSearch}
            >Search</button>
          </div>
          <div className="listResult">
            {tripsShown.map((trip) => (
              <SearchItem trip={trip} />
            ))
               }
               {tripsShown&& tripsShown.length !== 0 ?
                         <div className='dashboard-content-footer'>
                             {pagination.map((item, index) => (
                                 <span 
                                     key={index} 
                                     className={item === page ? 'active-pagination' : 'pagination'}
                                     onClick={() => __handleChangePage(item)}>
                                         {item}
                                 </span>
                             ))}
                         </div>
                     : 
                         <div className='dashboard-content-footer'>
                             <span className='empty-table'>Loading</span>
                         </div>
                     }
          </div>
        </div>
        
          
          
      </div>
    </div>
  )
}


export default List