import React,{ useState, useEffect } from "react";
import Layout from './Layout'
import {getProducts} from '../admin/auth';
import ProductBox from './ProductBox';
import '../style1.css'

const MostPopular=()=>{
    const [bySold,setBySold]=useState([]);
    const [error,setError]=useState('');
    const [limit,setLimit]=useState(5);
    const [size,setSize]=useState(0);
    const [skip,setSkip]=useState(0); 

    const getProductsBySold=()=>{
		getProducts('sold','desc').then(data=>{
			if(data.error)
			{
				setError(data.error);
			}
			else{
				setBySold(data);
			}
		})
    }
    const loadMore=()=>{
        let skipTo =skip+limit;
        getProducts('createdAt','desc').then(data=>{
            if(data.error)
            {
                console.log(data.error);
            }
            else
            {  
                setBySold(data);
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
  useEffect(()=>{
    {getProductsBySold()}
  },[])
    return(
      <div className="mostPopular">
        <Layout title="Most Popular Products" description="Here you can view most popular products" 
        className="container-fluid">
         <h2 className="mb-3"
         style={{ background: 'linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))',textAlign:'center'}}>Most Popular Products</h2>	
	  <div className="row " >
         {bySold.map((product,i)=>
		 <div className="col-4 mb-3"> <ProductBox key={i} product={product} wish={true}></ProductBox>
		 </div>
		 )}
	  </div>
      {loadMoreButton()}
        </Layout>
        </div>
    );
}
export default MostPopular