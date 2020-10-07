import React, { useState } from 'react'
import {FaStar} from 'react-icons/fa'

const StarRating=()=>{
    const [rating,setRating]= useState(null)
    const [hover,setHover]=useState(null)
    return(
       <div>
           {[...Array(5)].map((start,i)=>{
               const ratingValue=i+1
              return( 
             <label>
                 <input type="radio" name="rating" value={ratingValue} onClick={()=>(setRating(ratingValue))} style={{display:'none'}} ></input>
                 <FaStar 
                 className="star"
                 style={{cursor:'pointer',transition:'color 200ms'}} 
                 color={ratingValue<=(hover||rating)?'#ffc107':'gray'} 
                 size={30}
                 onMouseEnter={()=>setHover(ratingValue)}
                 onMouseLeave={()=>setHover(null)}
                 />
             </label>
              
              )
           })}
        
       </div> 
    );
}
export default StarRating;