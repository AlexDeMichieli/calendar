import React from 'react'
import { useState } from 'react'
import moment from 'moment'


const Grid = ({ allDaysOfMonth, prefillTime }) => {
  console.log(prefillTime)

  const [timeIn, setTimeIn] = useState({})
  const [timeOut, setTimeOut] = useState({})

  const computeHours = (timeIn, timeOut, cell) =>{
    let start = moment(timeIn[cell]);
    let end = moment(timeOut[cell]);
    let diff = end.diff(start);
    let computedHours = moment.utc(diff).format('H.mm')

    return computedHours
  }

  const calculateTime = () => {
    const total = []
    let sum = 0

    Object.keys(timeIn).forEach(function (key) {

      let sumOfRowHours = computeHours(timeIn, timeOut, key)
      total.push(parseFloat(sumOfRowHours))

    });

    for (let i = 0; i < total.length; i++) {
      console.log(total[i])
      sum += total[i]
    }

    return sum
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
       
            return (
              <tr key={cell}>
                <th scope="row">{day}</th>
                <td className='timeIn' style={{ background: isWeekend(day) ? 'grey' : 'white' }}>{!isWeekend(day) && <input onChange={(e) => enterTimeIn(e, cell, day)} defaultValue={prefillTime.timeIn} className="form-control" type="text" placeholder="Time In" />}</td>

                <td className='timeOut' style={{ background: isWeekend(day) ? 'grey' : 'white' }}>{!isWeekend(day) && <input onChange={(e) => enterTimeOut(e, cell, day)} className="form-control" type="text" placeholder="Time Out" />}</td>

                <td className='hours' style={{ background: isWeekend(day) ? 'grey' : 'white' }}>{!isWeekend(day) && computeHours(timeIn, timeOut, cell)}</td>
                <td className='notes' style={{ background: isWeekend(day) ? 'grey' : 'white' }}>{!isWeekend(day) && <input onChange={(e) => enterNotes(e, cell)} className="form-control" type="text" placeholder="Notes" />}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <h4 className='text-center'>Sum: {calculateTime()}</h4>
    </div>
  )
}

export default Grid