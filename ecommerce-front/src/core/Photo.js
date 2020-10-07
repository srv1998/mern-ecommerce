import React from 'react';
import {API} from '../config';
const Photo=({item,url,manageHeight=false,manageWidth=false})=>{
  
  return(
  <div className="myPhoto">
    <img src={`${API}/${url}/photo/${item._id}`} alt={item.name} className="mb-3" style={{maxHeight:manageHeight?'50px':'100%',maxWidth:manageWidth?'50px':'100%'}}></img>
  </div>
)}

export default Photo;