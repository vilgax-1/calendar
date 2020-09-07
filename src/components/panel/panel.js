import React, { useState, useEffect } from 'react';
import './panel.css';
import Calendarcom from '../calendar/CalendarCom';
import * as moment from 'moment';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Findreminders from '../../selectors/findReminders';
import * as _ from 'lodash';

const Panel = ({history}) => {
    const location = useLocation();
    const {d = '', m='', y = ''} = queryString.parse(location.search);
    const dateFull = d !== '' & m !=='' & y !=='' ? moment(`${d}-${m}-${y}`).format('ll') : moment().format('ll') ;
    useEffect(()=>{
        setValues({
            date: dateFull,
            reminder: '',
            color: '#976BA6',
            time: ''
        })
    },[dateFull])
    
    const [ dates, setDates ] = useState([]);
    const [ formValues, setValues] = useState({
        date: '',
        reminder: '',
        color: '#ecbc00',
        time: ''
    });

    const handleSearch = (e) => {
        e.preventDefault();
        setDates([...dates, formValues]);
    }   
    const handleInputChange = ({target}) => { 
        setValues({
            ...formValues,
            [target.name]: target.value 
        });
    }
    const reminders = Findreminders(dateFull, dates);
    const deleteReminder = (time, color, reminder) =>setDates([...(_.reject(dates, (o)=> o.reminder === reminder && o.color === color && o.time === time))]);
    
    return (
        <div className="container">
            <div className="container-calendar">
                <Calendarcom 
                value={moment()}
                dates={dates}/>
            </div>
            <div className="panel-container">
                <form onSubmit={handleSearch}>
                    <div className="header-panel">
                        <input
                            className="date"
                            name="date" 
                            autoComplete="off" 
                            value={ formValues.date } 
                            onChange={ handleInputChange }
                            readOnly/>
                    </div> 
                    <div className="body-panel">
                        <div className="box">
                            <label className="subtitle">Description</label>
                            <input 
                                type="text" 
                                name="reminder" 
                                className="rectangle" 
                                minLength="1" 
                                maxLength="30" 
                                autoComplete="off"
                                value={ formValues.reminder} 
                                onChange={ handleInputChange }
                                required/>
                        </div>
                        <div className="box">
                            <label className="subtitle">Hour</label>
                            <input 
                            className="rectangle"
                            type="time" 
                            name="time" 
                            value = {formValues.time}
                            onChange={handleInputChange}
                            required/>
                        </div>
                        <div className="box">
                            <label className="label-color">Color</label>
                            <input 
                                type="color" 
                                name="color" 
                                value = { formValues.color }
                                onChange={ handleInputChange } 
                                required />
                        </div> 
                        <button className="submit" type="submit">Add</button>
                    </div>
                </form>
                <div className="box-reminders">
                {
                    reminders.map((o,index) => (
                        <div key={index} className="square-reminder" >
                        <div className="vignette" style={{backgroundColor: o.color}}></div>
                            <div className="body">
                                <div className="time">
                                    {o.time}
                                </div>
                                <div className="message">
                                    {o.reminder}
                                </div>    
                            </div>
                            <button className="icon"><img src="./assets/icons/edit.png" alt="" /></button>
                            <button className="icon" onClick={e => deleteReminder(o.time, o.color, o.reminder)}>
                                <img src="./assets/icons/delete.png" alt=""/>
                            </button>
                        </div>
                    ))   
                } 
            </div>
            </div>
        </div>
    )
}

export default Panel
