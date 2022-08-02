import React from 'react'
import { useState } from 'react'

const SideBar = ({preFillDates}) => {
  const [preFillIn, setPrefillIn] = useState("")
  const [prefillOut, setPrefillOut] = useState("")

  return (
    <div className='container'>
      <div className="row">
        <div className="col">
          <input onChange={(e) => setPrefillIn(e.target.value)} type="text" className="form-control" placeholder="Time In" />
        </div>
        <div className="col">
          <input onChange={(e) => setPrefillOut(e.target.value)} type="text" className="form-control" placeholder="Time Out" />
        </div>
        <div className="col">
          <button onClick={()=>preFillDates(preFillIn,prefillOut)} type="button" className="btn btn-success">Prefill</button>
        </div>

      </div>
    </div>
  );
};
export default SideBar;

