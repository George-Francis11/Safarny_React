import React, { useEffect, useState } from 'react';
import './styles.css';
import { findTrip } from '../trips/trips_data';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';


function Trip() {
  const location = useLocation();
  const data = location.state?.data;
  // get the trip id from the url
  const [trip, setTrip] = useState([]);
  const [trip_id, setTrip_id] = useState('');
  const [trip_name, setTrip_name] = useState('');
  const [trip_location, setTrip_location] = useState('');
  const [trip_description, setTrip_description] = useState('');
  const [trip_currency, setTrip_currency] = useState('');
  const [trip_airfare, setTrip_airfare] = useState('');
  const [trip_hotel, setTrip_hotel] = useState('');
  const [trip_car, setTrip_car] = useState('');
  const [trip_food, setTrip_food] = useState('');
  const [trip_activities, setTrip_activities] = useState('');
  const [trip_base_expenses, setTrip_base_expenses] = useState('');
  const [trip_total_per_day, setTrip_total_per_day] = useState('');
  const [trip_images, setTrip_images] = useState('');

  const setData = (data) => {
    setTrip_id(data._id);
    setTrip_name(data.name);
    setTrip_location(data.location);
    setTrip_description(data.description);
    setTrip_currency(data.currency);
    setTrip_airfare(data.airfare);
    setTrip_hotel(data.hotel);
    setTrip_car(data.car);
    setTrip_food(data.food);
    setTrip_activities(data.activities);
    setTrip_base_expenses(data.base_expenses);
    setTrip_total_per_day(data.total_per_day);
    setTrip_images(data.images);
  };


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setTrip(data);
      setLoading(false);
      return;
    }
    axios.get(`http://localhost:8080/v1/admin/trips/${trip_id}`)
      .then(res => {
        console.log("Res", res);
        setTrip(res.data.trip);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])


  return ( loading ? <h1>Loading...</h1> :
    <div>
      <h1>trip</h1>
      <h2>ID: {trip._id}</h2>
      <h2>name: {trip.name}</h2>
      <h2>location: {trip.location}</h2>
      <h2>description: {trip.description}</h2>
      <h2>currency: {trip.currency}</h2>
    </div>

  )
}

export default Trip