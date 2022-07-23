import React from 'react'
import { useState, useRef } from 'react'


const Grid = ({allDaysOfMonth}) => {
  const [timeIn, setTimeIn] = useState({})


  const calculateTime = (cell) =>{
   
  }

  const calculateTotal = (e, cell) =>{
    console.log(e,cell)
    setTimeIn((state) => {
      return {
        ...state,
        [cell]:e.target.value
      };
    });
  }

  console.log(timeIn)
  const isWeekend =(day)=>{
    if (day.includes("Sat") || day.includes("Sun")){
      return true
    }
  }



  return (

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
              <td className='timeIn' style={{background: isWeekend(day) ? 'grey' : 'white' }}>{ !isWeekend(day) && <input onChange={(e)=> calculateTotal(e, cell)} className="form-control" type="text" placeholder="Time In"/>}</td>
              <td  className='timeOut'style={{background: isWeekend(day) ? 'grey' : 'white' }}>{ !isWeekend(day) && <input className="form-control" type="text" placeholder="Time Out"/>}</td>
              <td></td>
              <td></td>
            </tr>
          )
        })}
      </tbody>



    </table>

  )
}

export default Grid