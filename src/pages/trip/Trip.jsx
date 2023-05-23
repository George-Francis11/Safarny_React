import React, { useEffect, useState } from 'react';
import './trip.css';
import { useParams, useLocation } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'semantic-ui-react';
import axiosApiInstance from '../../utils/axios-middleware'




export default function Trip({onClick, tripData}) {
  const location = useLocation();
  const data = tripData;
  // get the trip id from the url
  const url_trip_id = useParams().id;
  const [trip, setTrip] = useState([]);
  const [trip_id, setTrip_id] = useState('');
  const [trip_name, setTrip_name] = useState('');
  const [trip_location, setTrip_location] = useState('');
  const [trip_description, setTrip_description] = useState('');
  const [trip_currency, setTrip_currency] = useState('');
  const [trip_airfare, setTrip_airfare] = useState(0);
  const [trip_hotel, setTrip_hotel] = useState(0);
  const [trip_car_rental, setTrip_car_rental] = useState(0);
  const [trip_food, setTrip_food] = useState(0);
  const [trip_activities, setTrip_activities] = useState(0);
  const [trip_base_expenses, setTrip_base_expenses] = useState(0);
  const [trip_total_per_day, setTrip_total_per_day] = useState(0);
  const [trip_food_cuisine, setTrip_food_cuisine] = useState('');
  const [trip_season, setTrip_season] = useState('');
  const [trip_images, setTrip_images] = useState([]);
  const [trip_geometry_type, setTrip_geometry_type] = useState('');
  const [trip_geometry_coordinates, setTrip_geometry_coordinates] = useState('');
  const [loading, setLoading] = useState(true);
  let effectLock = false;


  const setData =  (data) => {
    setTrip_id(data._id);
    setTrip_name(data.name);
    setTrip_location(data.location);
    setTrip_description(data.description);
    setTrip_currency(data.currency);
    setTrip_airfare(Number(data.airfare)); 
    setTrip_airfare(Number(data.airfare));
    setTrip_hotel(Number(data.hotel));
    setTrip_car_rental(Number(data.car_rental));
    setTrip_food(Number(data.food));
    setTrip_activities(Number(data.activities));
    setTrip_base_expenses(Number(data.base_expenses));
    setTrip_total_per_day(Number(data.total_per_day));
    setTrip_food_cuisine(data.food_cuisine);
    setTrip_season(data.season);
    setTrip_images(data.images);
    setTrip_geometry_type(data.geometry.type);
    setTrip_geometry_coordinates(data.geometry.coordinates);
  };

  const calculateTotalPerDay = () => {
    const total = trip_hotel + trip_car_rental + trip_food + trip_activities;
    setTrip_total_per_day(total);
    return total;
  };

  const calculateBaseExpenses = () => {
    const total = trip_airfare;
    setTrip_base_expenses(total);
    return total;
  };

  useEffect(() => {
    if (effectLock) return;
    if (data) {
      setTrip(data);
      console.log("Data", data);
      setData(data);
      
      setLoading(false);
      return;
    }
    axiosApiInstance.get(`http://localhost:8080/v1/trips/${url_trip_id}`)
      .then(res => {
        console.log("Res from user trip", res);
        setTrip(res.data.trip);
        setData(res.data.trip);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
    effectLock = true;
  }, [])

  return ( loading ? <h1>bonjour...</h1> :
    <div>
      <div className="">
          
        <div className="trip">
          <div className="tripWrapper">
            <div className="tripTop">
              <img
                className="tripCoverImg"
                src={trip_images[0].url}
                alt=""
              />
              <h1 className="tripUsername">{trip_name}</h1>
              <h3 className="tripLocation">{trip_location}</h3>
            </div>
            <div className="tripBottom">
              <div className="tripBottomLeft">
                <span className="tripInfoStat">{trip_airfare}</span>
                <span className="tripInfoStat">{trip_hotel}</span>
                <span className="tripInfoStat">{trip_car_rental}</span>
                <span className="tripInfoStat">{trip_food}</span>
                <span className="tripInfoStat">{trip_activities}</span>
              </div>
              <div className="tripBottomRight">
                <div className="tripInfo">
                  <h4 className="tripInfoTitle">Description</h4>
                  <p className="tripInfoDesc">
                    {trip_description}
                  </p>
                </div>
                <div className="tripInfo">
                  <h4 className="tripInfoTitle">Season</h4>
                  <p className="tripInfoDesc">
                    {trip_season}
                  </p>
                </div>
                <div className="tripInfo">
                  <h4 className="tripInfoTitle">Food Cuisine</h4>
                  <p className="tripInfoDesc">
                    {trip_food_cuisine}
                  </p>
                </div>
                <div className="tripInfo">
                  <h4 className="tripInfoTitle">Currency</h4>
                  <p className="tripInfoDesc">
                    {trip_currency}
                  </p>
                </div>
                <div className="tripInfo">
                  <h4 className="tripInfoTitle">Total Per Day</h4>
                  <p className="tripInfoDesc">
                    {trip_total_per_day}
                  </p>
                </div>
                <div className="tripInfo">
                  <h4 className="tripInfoTitle">Base Expenses</h4>
                  <p className="tripInfoDesc">
                    {trip_base_expenses}
                  </p>
                </div>
                <div className="tripInfo">
                  <h4 className="tripInfoTitle">Location</h4>
                  <p className="tripInfoDesc">
                    {trip_location}
                  </p>
                </div>
                <div className="tripInfo">
                  <h4 className="tripInfoTitle">Geometry Type</h4>
                  <p className="tripInfoDesc">
                    {trip_geometry_type}
                  </p>
                </div>
                <div className="tripInfo">
                  <h4 className="tripInfoTitle">Geometry Coordinates</h4>
                  <p className="tripInfoDesc">
                    {trip_geometry_coordinates}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

