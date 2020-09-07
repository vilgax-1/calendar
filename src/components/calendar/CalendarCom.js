import React, { useState } from 'react';
import './CalendarCom.css';
import * as moment from 'moment';
import { Filldates, isSelectedMonth} from '../../selectors/fillDates';
import Generatecalendar from '../../selectors/generateCalendar';
import findReminders from '../../selectors/findReminders';
import { useHistory } from 'react-router-dom';
import Weather from '../weather/weather';


const Calendarcom = ({value, dates = []}) => {
    const history = useHistory();
    
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const [counter, setCounter]= useState(value);
    
    const prevMonth = () => setCounter((c)=> moment(c).subtract(1, 'months'));
    const nextMonth = () => setCounter((c)=> moment(c).add(1, 'months'));

    const fillDates = Filldates(counter);
    const generateCalendar = Generatecalendar(fillDates);
 
    const addFecha = (e)=>{
        const date = (moment(e).format('L')).split(/\//g);
        history.push(`?d=${date[0]}&m=${date[1]}&y=${date[2]}`);
    };

    return (
        <div className="row-column">
        <div className="calendar" key="calendar">
            <div className="calendar-head">
                <div className="left-arrow" onClick={prevMonth} ></div>
                <div>
                    <h3 className="month">{ counter.format('MMMM') }</h3>
                    <p className="year">{ counter.format('yyyy') }</p>
                </div>
                <div className="right-arrow" onClick={nextMonth} ></div>
            </div>
            <hr />
            <div className="calendar-days">
                { days.map(o => (<div className="name" key={o}>{o}</div> ))}
            </div>
            <div className="calendar-body" key="calendar-body">
                {
                    generateCalendar.map(r => (
                        r.map(o => (                       
                            <div className="day"  key={ moment(o.mDate).format('L') }>{ 
                                (isSelectedMonth(o.mDate, counter)) &&  
                                    <span onClick={e => addFecha (o.mDate)}  className={ 
                                        findReminders(o.mDate.format('ll'), dates).length > 0 ? 'reminder' :
                                        moment(o.mDate).format('ll') === moment().format('ll') ? 'active' : ''}> 
                                        { o.mDate.date() } 
                                    </span>
                            }</div>
                        ))
                    ))
                }
            </div>
        </div>
        <div className="card-weather">
            <Weather />
        </div>         
    </div>)
}
export default Calendarcom
