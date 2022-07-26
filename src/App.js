import React, { useState, useEffect } from 'react';
import Grid from './components/Grid';
import SideBar from './components/SideBar';
import moment from 'moment'

function App() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear())
  const [allDaysOfMonth, setAllDaysOfMonth] = useState([])
  const [on, setOn] = useState(false);
  const [prefillTime, setPrefillTime] = useState({})

  useEffect(() => {
    const daysOfMonth = () => {
      let date = new Date(year, month, 1);
      let days = [];
      while (date.getMonth() === parseInt(month)) {
        let day = moment(date).format('L')
        let splitDate = day.split("00")[0]
        days.push(splitDate);
        date.setDate(date.getDate() + 1);
      }
      setAllDaysOfMonth(days);
    }
    daysOfMonth(month, year)

  }, [month, year]);

  const handleOn = () => {
    setOn(!on);
  };

  const preFillDates = (begin , end) => {
    setPrefillTime({"timeIn": begin, "timeOut": end})
  }

  const monthsOfYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const yearsToCome = () => {
    let currentYear = new Date().getFullYear()
    return [...Array(2050 - currentYear + 1).keys()].map(i => i + currentYear);
  }

  return (
    <div className="container">
      <button onClick={handleOn} style={{width:'100%'}} type="button" className="btn btn-dark btn-lg btn-block">Dark</button>
      {on && <SideBar preFillDates={preFillDates}/>}
      <h1>Time Sheet</h1>
      <div className="row">
        <div className="col">
          <select onChange={(e) => setMonth(e.target.value)} className="form-select" aria-label="Default select example">
            <option defaultValue>Select Month</option>
            {monthsOfYear.map((month, index) => {
              return <option key={month} name={month} value={index}>{month}</option>
            })}
          </select>
        </div>
        <div className="col">
          <select onChange={(e) => setYear(e.target.value)} className="form-select" aria-label="Default select example">
            <option defaultValue>Select Year</option>
            {yearsToCome().map(year => {
              return <option key={year} name={year} value={year}>{year}</option>
            })}
          </select>
        </div>
      </div>
      <Grid allDaysOfMonth={allDaysOfMonth} prefillTime={prefillTime}></Grid>
    </div>
  );
}

export default App;
