import React from 'react'


export default React.createContext({
    isAuthenticated:false,
    park_vehicle_pop_up: false,
    un_park_vehicle_pop_up: false,
    toggle_isAuthenticated :() =>{},
    toggle_park_vehicle_pop_up :() =>{},
    toggle_un_park_vehicle_pop_up :() =>{},
    get_searched_vehicleNo :() =>{},
    set_vehicle_no :() =>{},
    release_park :() =>{},
    un_park_vehicle :() =>{},
    get_vehicle_type :() =>{},
    spots:[],
    spotId:''
})