import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardHeader from '../../../components/adminPanel/index';


import { calculateRange, sliceData } from '../../../utils/table-pagination';
import axiosApiInstance from '../../../utils/axios-middleware';

import './styles.css';
import DoneIcon from '../../../assets/icons/done.svg';
import CancelIcon from '../../../assets/icons/cancel.svg';
import RefundedIcon from '../../../assets/icons/refunded.svg';

function Trips({trip}) {
    const [search, setSearch] = useState('');
    const [trips, setTrips] = useState([]);
    const [tripsShown, setTripsShown] = useState([]); // trips to be shown on the current page
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    let effectLock = false;

    const fetchTrips = async trip => {
        const req = await axiosApiInstance.get('http://localhost:8080/v1/admin/trips')
        setTrips(req.data.trips);
        setPagination(calculateRange(req.data.trips, 5));
        setTripsShown(sliceData(req.data.trips, page, 5));
    };
    useEffect(() => {
        if (effectLock) return;
        fetchTrips(trip);
        effectLock = true;
    }, [trip]);

    // Search
    const __handleSearch = (event) => {
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

    return(
        <div className='dashboard-content'>
            
            <Link to={`/admin/trips/new`}>New Trip</Link>

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Trips List</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

                <table>
                    <thead>
                        <th>ID</th>
                        <th>name</th>
                        <th>location</th>
                        <th>Description</th>
                        <th>total per day</th>
                        <th>currency</th>
                    </thead>

                    {tripsShown && tripsShown.length !== 0 ?
                        <tbody>
                            {tripsShown.map((trip, index) => (
                                <tr key={index}>
                                    <td><span>{trip._id}</span></td>
                                    <td><Link to={`/admin/trips/${trip._id}`} state={{data: trip}}>{trip.name}</Link></td>
                                    <td>
                                        <div>
                                            {trip.status === 'Paid' ?
                                                <img
                                                    src={DoneIcon}
                                                    alt='paid-icon'
                                                    className='dashboard-content-icon' />
                                            : trip.status === 'Canceled' ?
                                                <img
                                                    src={CancelIcon}
                                                    alt='canceled-icon'
                                                    className='dashboard-content-icon' />
                                            : trip.status === 'Refunded' ?
                                                <img
                                                    src={RefundedIcon}
                                                    alt='refunded-icon'
                                                    className='dashboard-content-icon' />
                                            : null}
                                            <span>{trip.location}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <img 
                                                src={trip.images[0]? trip.images[0].url : 'https://res.cloudinary.com/dbyetkwab/image/upload/v1682881690/Safarny/Alex_scvwcl.jpg'}
                                                className='dashboard-content-avatar'
                                                alt={trip.first_name + ' ' +trip.last_name} />
                                            <span>{trip.description} </span>
                                        </div>
                                    </td>
                                    <td><span>{trip.total_per_day}</span></td>
                                    <td><span>${trip.currency}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

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
    )
}

export default Trips;