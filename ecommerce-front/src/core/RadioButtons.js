import React, { useState } from 'react';

const RadioButtons=({priceRange,handleFilters})=>{
   const [value,setValue]= useState(0); //using priceRange._id as value

    const handleChange=(e)=>{
         setValue(e.target.value);
         handleFilters(e.target.value);
    }
    return(  
      priceRange.map((p,i)=>(
       <div key={i} className="radio">
           <input type="radio" name={p} className="mr-2 ml-3" onChange={handleChange} value={`${p._id}`}/>
      <label className="form-check-label">{p.name}</label>
       </div>
     ))
   ) ; 
}     

export default RadioButtons;