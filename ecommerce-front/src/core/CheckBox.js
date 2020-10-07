import React, { useState } from 'react';

const CheckBox=({categories,handleFilters})=>{

    const [checked,setChecked]=useState([]); // to keep categgories that r chehcked
    const [error,setError]=useState(false);
    const handleChange = cid => () => {
        // return the first index or -1
        const currentCategoryId = checked.indexOf(cid); // the category is checked or not..
        const newCheckedCategoryId = [...checked]; // checked category array..
        // if currently checked was not already in checked state > push
        // else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(cid);
          
        } else {
            
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
        
    }
    return(
           
         categories.map((cat,i)=>(
             
            <li className="list-unstyled" key={i} style={{ background: 'linear-gradient(to left, rgba(255,0,0,0), rgb(65, 202, 47))'}}>
               <input type="checkbox" name={cat.name}  className="form-check-input" value={checked.indexOf(cat._id===-1)} onChange={handleChange(cat._id)} /> 
              <label className="form-check-label">{cat.name}</label>
              
            </li>
        ))
    ) ; 
}     

export default CheckBox;