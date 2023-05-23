import React, { useEffect, useState } from 'react';
import './styles.css';
import { useParams, useLocation } from 'react-router-dom';
import { Form, FormGroup, Label, Input, FormText } from 'semantic-ui-react';
import { Button } from 'react-bootstrap';
import axiosApiInstance from '../../../utils/axios-middleware';

function TripForm() {
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
    const [trip_food_cuisine, setTrip_food_cuisine] = useState('Other');
    const [trip_season, setTrip_season] = useState('Summer');
    const [trip_images, setTrip_images] = useState([{
        url: 'https://res.cloudinary.com/dbyetkwab/image/upload/v1682880859/Safarny/Barcelona_sjkvc2.jpg',
        filename: 'Safarny/Barcelona_sjkvc2',
    }]);
    const [trip_geometry_type, setTrip_geometry_type] = useState('Point');
    const [trip_geometry_coordinates, setTrip_geometry_coordinates] = useState('');
    const [loading, setLoading] = useState(true);
    let effectLock = false;

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

    const createData = () => {
        axiosApiInstance.post(`${process.env.REACT_APP_API_URL}/admin/trips`,
            {
                trip: {
                    name: trip_name,
                    location: trip_location,
                    description: trip_description,
                    currency: trip_currency,
                    airfare: trip_airfare,
                    hotel: trip_hotel,
                    car_rental: trip_car_rental,
                    food: trip_food,
                    activities: trip_activities,
                    base_expenses: calculateBaseExpenses(),
                    total_per_day: calculateTotalPerDay(),
                    food_cuisine: trip_food_cuisine,
                    season: trip_season,
                    images: trip_images,
                    geometry: {
                        type: trip_geometry_type,
                        coordinates: trip_geometry_coordinates
                    }
                }
            })
            .then((res) => {
                // console.log(res);
                console.log(res.data);
                window.location.href = '/admin/trips';
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        if (!effectLock) {
            effectLock = true;
            setLoading(false);
        }
    }, [loading]);
    
    return (loading ? <h1>Loading...</h1> :
    <div>
        <div className="FormManagment">
            <Form className='form'>
                <Form.Field>
                    <label>Trip Name</label>
                    <input placeholder={trip_name} value={trip_name} onChange={(e) => setTrip_name(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Trip Location</label>
                    <input placeholder={trip_location} value={trip_location} onChange={(e) => setTrip_location(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Trip Description</label>
                    <input placeholder={trip_description} value={trip_description} onChange={(e) => setTrip_description(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Trip Currency</label>
                    <input placeholder={trip_currency} value={trip_currency} onChange={(e) => setTrip_currency(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Trip Airfare</label>
                    <input type='number' placeholder={trip_airfare} value={trip_airfare} onChange={(e) => setTrip_airfare(Number(e.target.value))} />
                </Form.Field>
                <Form.Field>
                    <label>Trip Hotel</label>
                    <input type='number' placeholder={trip_hotel} value={trip_hotel} onChange={(e) => setTrip_hotel(Number(e.target.value))} />
                </Form.Field>
                <Form.Field>
                    <label>Trip Car Rental</label>
                    <input type='number' placeholder={trip_car_rental} value={trip_car_rental} onChange={(e) => setTrip_car_rental(Number(e.target.value))} />
                </Form.Field>
                <Form.Field>
                    <label>Trip Food</label>
                    <input type='number' placeholder={trip_food} value={trip_food} onChange={(e) => setTrip_food(Number(e.target.value))} />
                </Form.Field>
                <Form.Field>
                    <label>Trip Activities</label>
                    <input type='number' placeholder={trip_activities} value={trip_activities} onChange={(e) => setTrip_activities(Number(e.target.value))} />
                </Form.Field>
                <Form.Field>
                    <label>Trip Base Expenses</label>
                    <input type='number' disabled placeholder={trip_airfare} value={trip_airfare} onChange={(e) => setTrip_base_expenses(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Trip Total Per Day</label>
                    <input type='number' disabled placeholder={(trip_hotel + trip_car_rental + trip_food + trip_activities)} value={Number(trip_hotel) + Number(trip_car_rental) + Number(trip_food) + Number(trip_activities)} onChange={(e) => setTrip_total_per_day(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Trip Food Cuisine</label>
                    <select value={trip_food_cuisine} onChange={(e) => setTrip_food_cuisine(e.target.value)} >
                        <option value="American">American</option>
                        <option value="Chinese">Chinese</option>
                        <option value="French">French</option>
                        <option value="Indian">Indian</option>
                        <option value="Italian">Italian</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Thai">Thai</option>
                        <option value="Vietnamese">Vietnamese</option>
                        <option value="Egyptian">Egyptian</option>
                        <option value="Other">Other</option>
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Trip Season</label>
                    <select value={trip_season} onChange={(e) => setTrip_season(e.target.value)} >
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Trip Images</label>
                    <input placeholder={trip_images} value={trip_images} onChange={(e) => setTrip_images(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Trip Geometry Type</label>
                    <input disabled placeholder={trip_geometry_type} value={trip_geometry_type} onChange={(e) => setTrip_geometry_type(e.target.value)} />
                </Form.Field>
                <Form.Field>
                    <label>Latitude</label>
                    <input type='number' placeholder={trip_geometry_coordinates[0]} value={trip_geometry_coordinates[0]} onChange={(e) => setTrip_geometry_coordinates([Number(e.target.value), trip_geometry_coordinates[1]])} />
                    <label>Longitude</label>
                    <input type='number' placeholder={trip_geometry_coordinates[1]} value={trip_geometry_coordinates[1]} onChange={(e) => setTrip_geometry_coordinates([trip_geometry_coordinates[0], Number(e.target.value)])} />
                </Form.Field>
                <Button type='submit' onClick={createData}>Create Trip</Button>
            </Form>
        </div>
    </div>

)
}

export default TripForm