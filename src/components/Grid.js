import React from 'react'
import { useState } from 'react'
import moment from 'moment'


const Grid = ({ allDaysOfMonth }) => {
  const [timeIn, setTimeIn] = useState({})
  const [timeOut, setTimeOut] = useState({})
  const [hours, setHours] = useState([])

  const calculateTime = () => {

    Object.keys(timeIn).forEach( function (key) { 
      //console.log(timeIn[key]+':'+timeOut[key]); 
      let diff = moment(timeOut[key]).diff(moment(timeIn[key]));
      let computedHours = moment.utc(diff).format('H.mm')
      console.log("key", key, computedHours)
    } );

    let total = []

    // for (let i = 0; i < cellHours.length; i++) {
    //   let formattedHours = parseInt(cellHours[i].innerHTML)
    //   // if (isNaN(formattedHours)) {
    //   //   formattedHours = 0
    //   // }
    //   total.push(formattedHours)
    // }
    // const sum = total.reduce((accumulator, value) => {
    //   if (isNaN(value)) {
    //     value = 0
    //   }
    //   console.log(value)
    //   return accumulator + value;
    // }, 0);

    // return sum
  }

  const enterTimeIn = (e, cell, day) => {
    console.log(e, cell, day)
    setTimeIn((state) => {
      return {
        ...state,
        [cell]: `${day} ${e.target.value}`
      };
    });
  }

  const enterTimeOut = (e, cell, day) => {
    setTimeOut((state) => {
      return {
        ...state,
        [cell]: `${day} ${e.target.value}`
      };
    });
  }

  const enterNotes = () => {

  }


  const isWeekend = (day) => {
    let currentDay = moment(day).format('LLLL')
    if (currentDay.includes("Sat") || currentDay.includes("Sun")) {
      return true
    }
  }


console.log(timeIn, timeOut)
  return (
    <div className='container'>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Month</th>
            <th scope="col">Time In</th>
            <th scope="col">Time Out</th>
            <th scope="col">Hours</th>
            <th scope="col">Notes</th>
          </tr>
        </thead>
        <tbody>
          {allDaysOfMonth && allDaysOfMonth.map((day, cell) => {
            let date1 = moment(timeIn[cell]);
            let date2 = moment(timeOut[cell]);
            let diff = date2.diff(date1);
            let computedHours = moment.utc(diff).format('H.mm')
  
            return (

              <tr key={cell}>
                <th scope="row">{day}</th>
                <td className='timeIn' style={{ background: isWeekend(day) ? 'grey' : 'white' }}>{!isWeekend(day) && <input onChange={(e) => enterTimeIn(e, cell, day)} className="form-control" type="text" placeholder="Time In" />}</td>
                <td className='timeOut' style={{ background: isWeekend(day) ? 'grey' : 'white' }}>{!isWeekend(day) && <input onChange={(e) => enterTimeOut(e, cell, day)} className="form-control" type="text" placeholder="Time Out" />}</td>
                <td className='hours' style={{ background: isWeekend(day) ? 'grey' : 'white' }}>{!isWeekend(day) && computedHours}</td>
                <td className='notes' style={{ background: isWeekend(day) ? 'grey' : 'white' }}>{!isWeekend(day) && <input onChange={(e) => enterNotes(e, cell)} className="form-control" type="text" placeholder="Notes" />}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p>{calculateTime()}</p>
    </div>
  )
}

export default Grid