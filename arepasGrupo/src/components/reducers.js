import car from './car'
import logged from './log'
import {combineReducers}  from '@reduxjs/toolkit'

const allReducers = combineReducers({
    logged,
    car
    
})

export default allReducers;