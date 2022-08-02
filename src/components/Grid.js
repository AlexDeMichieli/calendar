import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";

const Grid = ({ allDaysOfMonth, prefillTime }) => {
  const [timeIn, setTimeIn] = useState({});
  const [timeOut, setTimeOut] = useState({});
  //console.log(prefillTime)

  useEffect(() => {
    //console.log(allDaysOfMonth)
    allDaysOfMonth.map((item, index) => {
      setTimeIn((state) => {
        return {
          ...state,
          [index]: `${item} ${prefillTime.timeIn}`,
        };
      });

      setTimeOut((state) => {
        return {
          ...state,
          [index]: `${item} ${prefillTime.timeOut}`,
        };
      });
    });
  }, [prefillTime]);
  console.log(timeIn);

  const computeHours = (timeIn, timeOut, cell) => {
    let start = moment(timeIn[cell]);
    let end = moment(timeOut[cell]);
    let diff = end.diff(start);
    let computedHours = moment.utc(diff).format("H.mm");

    return computedHours;
  };

  const calculateTime = () => {
    const total = [];
    let sum = 0;

    Object.keys(timeIn).forEach(function (key) {
      let sumOfRowHours = computeHours(timeIn, timeOut, key);
      total.push(parseFloat(sumOfRowHours));
    });

    for (let i = 0; i < total.length; i++) {
      console.log(total[i]);
      sum += total[i];
    }

    return sum;
  };

  const enterTimeIn = (e, cell, day, preFillDates) => {
    setTimeIn((state) => {
      return {
        ...state,
        [cell]: `${day} ${e.target.value}`,
      };
    });
  };

  const enterTimeOut = (e, cell, day) => {
    setTimeOut((state) => {
      return {
        ...state,
        [cell]: `${day} ${e.target.value}`,
      };
    });
  };

  const enterNotes = () => {};

  const isWeekend = (day) => {
    let currentDay = moment(day).format("LLLL");
    if (currentDay.includes("Sat") || currentDay.includes("Sun")) {
      return true;
    }
  };
  return (
    <div className="container">
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
          {allDaysOfMonth &&
            allDaysOfMonth.map((day, cell) => {
              return (
                <tr key={cell}>
                  <th scope="row">{day}</th>
                  <td style={{ background: isWeekend(day) ? "grey" : "white" }}>
                    {!isWeekend(day) && (
                      <input
                        className="timeIn"
                        onChange={(e) => enterTimeIn(e, cell, day)}
                        defaultValue={timeIn[cell]}
                        className="form-control"
                        type="text"
                        placeholder="Time In"
                      />
                    )}
                  </td>
                  <td style={{ background: isWeekend(day) ? "grey" : "white" }}>
                    {!isWeekend(day) && (
                      <input
                        className="timeOut"
                        onChange={(e) => enterTimeOut(e, cell, day)}
                        defaultValue={timeOut[cell]}
                        className="form-control"
                        type="text"
                        placeholder="Time Out"
                      />
                    )}
                  </td>
                  <td
                    className="hours"
                    style={{ background: isWeekend(day) ? "grey" : "white" }}
                  >
                    {!isWeekend(day) && computeHours(timeIn, timeOut, cell)}
                  </td>
                  <td
                    className="notes"
                    style={{ background: isWeekend(day) ? "grey" : "white" }}
                  >
                    {!isWeekend(day) && (
                      <input
                        onChange={(e) => enterNotes(e, cell)}
                        className="form-control"
                        type="text"
                        placeholder="Notes"
                      />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <h4 className="text-center">Sum: {calculateTime()}</h4>
    </div>
  );
};

export default Grid;
