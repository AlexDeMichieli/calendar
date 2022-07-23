import React from 'react'
import { useState, useRef } from 'react'


const Grid = ({allDaysOfMonth}) => {
  const [timeIn, setTimeIn] = useState({})
  const [timeOut, setTimeOut] = useState({})
  const [hours, setHours] = useState([])
  const calculateTime = (cell) =>{
  
  }

  const enterTimeIn = (e, cell, day) =>{
    console.log(e,cell, day)
    setTimeIn((state) => {
      return {
        ...state,
        [cell]:day+e.target.value
      };
    });
  }
  console.log(timeIn)

  const enterTimeOut = (e, cell, day) =>{
    console.log(e,cell)
    setTimeOut((state) => {
      return {
        ...state,
        [cell]:day+e.target.value
      };
    });
  }

  const enterNotes = () =>{

  }


  const isWeekend =(day)=>{
    if (day.includes("Sat") || day.includes("Sun")){
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
              <td className='timeIn' style={{background: isWeekend(day) ? 'grey' : 'white' }}>{ !isWeekend(day) && <input onChange={(e)=> enterTimeIn(e, cell, day)} className="form-control" type="text" placeholder="Time In"/>}</td>
              <td  className='timeOut'style={{background: isWeekend(day) ? 'grey' : 'white' }}>{ !isWeekend(day) && <input onChange={(e)=> enterTimeOut(e, cell, day)} className="form-control" type="text" placeholder="Time Out"/>}</td>
              <td>{parseInt(timeIn[cell])+ parseInt(timeOut[cell])}</td>
              <td className='notes' style={{background: isWeekend(day) ? 'grey' : 'white' }}>{ !isWeekend(day) && <input onChange={(e)=> enterNotes(e, cell)} className="form-control" type="text" placeholder="Notes"/>}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
    <p>Total</p>
    </div>
  )
}

export default Grid