// Helpers function from the provided backend to make the use of backend endpoint scalable

import axios from "axios"

// Create vehicle with params [ vehicle data, token to check the authentification of the user, a callback function ]
export function createVehicule( vehicule , token, cb) {
    axios.post(process.env.REACT_APP_BrickYard_API+"/vehicles",
        vehicule,
        {
            headers: {
                'Accept' : '*/*',
                'Content-Type': 'Application/json',
                'Authorization': ` Bearer ${token}`
        }
    }).then(res => {
        cb()
        return res.data

    });
}

// Update vehicle information based on params : [ vehicle data, _id of the car to update,  token to check the authentification of the user, a callback function ]
export function updateVehicule( vehicule, _id , token,cb) {
    axios.put(process.env.REACT_APP_BrickYard_API+"/vehicles/"+_id,
        vehicule,
        {
            headers: {
                'Accept' : '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            cb()
            return res.data
    });
}