import React from 'react'
import Lottie from 'react-lottie'
import * as loader from './loader4.json'
const Loading =()=>{
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: loader.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }
        return(
           <div><Lottie options={defaultOptions} height={100} width={100}></Lottie></div>
        );
}
export default Loading