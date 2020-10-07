import React,{ useState, useEffect } from "react";
import Layout from './Layout'
import {getProducts} from '../admin/auth';
import ProductBox from './ProductBox';
import  '../style1.css'
const NewArrived=()=>{
    const [byCreated,setByCreated]=useState([]);
    const [skip,setSkip]=useState(0);
    const [limit,setLimit]=useState(5);
    const [size,setSize]=useState(0);

    const getProductsByArrival=()=>{
		getProducts('createdAt','desc').then(data=>{
			if(data.error)
			{
				console.log(data.error)
			}
			else{
                setByCreated(data);
                setSkip(0)
                setSize(data.size);
			}
		})
    }
    useEffect(()=>{
        getProductsByArrival()
    },[])
    const loadMore=()=>{
        let skipTo =skip+limit;
        getProducts('createdAt','desc').then(data=>{
            if(data.error)
            {
                console.log(data.error);
            }
            else
            {  
                setByCreated(data);
                console.log(data)
                setSkip(skipTo)
                setSize(data.length);
            }
        })
      }
      const loadMoreButton=()=>{
      
        if(size>0&&size>=limit)
        {
            return(
                <button className="btn btn-primary" onClick={loadMore}>Load More</button>
            )
        }
       
    }
    return(
        <div className="newArrived " >    
        <Layout title="New Arrived" description="Here you can view Newly Arrived products" 
        className="container-fluid" >
       
         <h2 className="mb-3"
         style={{ background: 'linear-gradient(to left, rgba(0,255,0,0), rgba(0,255,0,1))',textAlign:'center'}}>New products</h2>	
	  <div className="row " >
         {byCreated.map((product,i)=>
		 <div className="col-4 mb-3"> <ProductBox key={i} product={product} wish={true}></ProductBox>
		 </div>
		 )}
	  </div>
      {loadMoreButton()}
        </Layout>
        </div> 
    );
}
export default NewArrived;