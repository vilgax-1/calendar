import React, { useState, useEffect } from 'react'
import './weather.css';
import { ajax } from 'rxjs/ajax';
import { pluck} from 'rxjs/operators'
import { Kevintocelcius } from '../../selectors/kevinToCelcius';

const Weather = (props) => {  
    const [formValue, setForm] = useState({ 
        weather: 'Zapopan', 
        api: '54cea05cce77f8961fb261505ca42a51' 
    });
    const [country, setCountry] = useState({weather: 'Zapopan'});

    useEffect(()=>{
        ajax({
            url: `https://api.openweathermap.org/data/2.5/weather?q=${country.weather}&appid=${formValue.api}`,
            method: "GET",
        })
        .pipe(pluck('response'))
        .subscribe(data=>{
            setWeather({
                city: data.name,
                grades: Kevintocelcius(data.main.temp) | 0,
                country: data.sys.country
            });
        }, err=>{
            alert('Country not found');
        });
    }, [country, formValue.api]);
    
    const formSubmit = (e) =>{
        e.preventDefault();
        setCountry({...formValue})
    }

    const formChange = ({target}) => {
        setForm({
            ...formValue,
            [target.name]: target.value 
        })
    }

    const [weather, setWeather] = useState({
        city: formValue.weather,
        country: '',
        grades: 0
    });

    return (
        <div className="weather">
            <form className="row" onSubmit={formSubmit}>
                <input type="text" name="weather" value={formValue.weather} onChange={formChange} placeholder="Enter a city" className="rectangle"/>
                <button className="btn-yellow" type="submit">Search</button>
            </form> 
            <div className="weather-card">
                <p>{weather.grades} <span className="celcius">&deg;</span></p>
                <div className="country">
                    <p>{weather.city},</p>
                    <p>{weather.country}</p>
                </div>
            </div>
        </div>
    )
}

export default Weather
