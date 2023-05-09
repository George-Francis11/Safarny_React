const trips_data = [
        {
            id: '6455664a24ca36b84c54c448',
        name: 'Trip to Barcelona',
        location: 'Barcelona, Spain',
        description: 'A trip to Barcelona',
        airfare: 500,
        hotel: 100,
        car_rental: 50,
        food: 100,
        activities: 100,
        base_expenses: 500,
        total_per_day: 350,
        currency: 'EUR',
        food_cuisine: 'Spanish',
        season: 'Summer',
        images: [
            {
                url: 'https://res.cloudinary.com/dbyetkwab/image/upload/v1682880859/Safarny/Barcelona_sjkvc2.jpg',
                filename: 'Safarny/Barcelona_sjkvc2'
            }
        ],
        geometry: {
            type: 'Point',
            coordinates: [41.3851, 2.1734]
        }
    },
        {    
            id: '6455664a24ca36b84c54c44a',
        name: "Trip to Alexandria",
        location: "Alexandria, Egypt",
        description: "A trip to Alexandria",
        airfare: 200,
        hotel: 50,
        car_rental: 10,
        food: 50,
        activities: 50,
        base_expenses: 200,
        total_per_day: 160,
        currency: "EGP",
        food_cuisine: "Egyptian",
        season: "Winter",
        images: [
            {
            "url": "https://res.cloudinary.com/dbyetkwab/image/upload/v1682881690/Safarny/Alex_scvwcl.jpg",
            "filename" : "ALex_scvwc1"
            }
        ],
        geometry: {
            type: "Point",
            coordinates: [31.2001, 29.9187]
        }
    },
    ];

const findTrip = function (id) {
    const foundTrip = trips_data.find(trip => trip.id === id);
    return foundTrip? foundTrip : null;
}

module.exports = { trips_data, findTrip };