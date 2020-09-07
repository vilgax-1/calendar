import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Calendarrouter from './calendarRouter';

const Approuter = (props) => {
    return (
        <Router>
        <div>
            <Switch>
                <Route path="/" component={ Calendarrouter }/>
            </Switch>
            </div>
        </Router>
    )
}

export default Approuter
