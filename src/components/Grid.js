import React from 'react'
import { useState, useRef } from 'react'


const Grid = ({allDaysOfMonth}) => {
  const timeIn = useRef();
  const timeOut = useRef();

  const calculateTime = (cell) =>{
   
  }
  const startTime = document.getElementsByClassName('timeIn')
  const endTime = document.getElementsByClassName('timeOut')


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
              <td ref={timeIn} className='timeIn' style={{background: day.includes("Sat") || day.includes("Sun") ? 'grey' : 'white' }}>{day.includes("Sat") || day.includes("Sun") ? "" : "3:30" }</td>
              <td ref={timeOut} className='timeOut'style={{background: day.includes("Sat") || day.includes("Sun") ? 'grey' : 'white' }}>{day.includes("Sat") || day.includes("Sun") ? "" : "9:36" }</td>
              <td>{cell}</td>
              <td></td>
            </tr>
          )
        })}
      </tbody>



    </table>

  )
}

export default Grid