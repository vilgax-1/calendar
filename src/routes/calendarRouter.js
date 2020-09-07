import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Calendar  from '../pages/Calendar/Calendar';

const Calendarrouter = (props) => {
    return (
       <Switch>            
            <Route exact path="/calendar" component={ Calendar } />
            <Redirect to="/calendar" />
        </Switch>
    )
}

export default Calendarrouter
