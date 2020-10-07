import React ,{useState,useEffect}from 'react';
import Layout from './Layout';
import {getProducts} from '../admin/auth';
import ProductBox from './ProductBox';
import Menu from './Menu';
import '../style1.css';
import SearchBar from './SeachBar';
import Slider1 from './Slider1';
//import  from '../config'
const Home=()=>{
	const [bySold,setBySold]=useState([]);
	const [byCreated,setByCreated]=useState([]);
    const [error,setError]=useState('');
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
	const getProductsByArrival=()=>{
		getProducts('createdAt','desc').then(data=>{
			if(data.error)
			{
				setError(data.error);
			}
			else{
				setByCreated(data);
			}
		})
	}
    useEffect(()=>{
	   {getProductsByArrival()}
	   {getProductsBySold()}
	},[])
	return(
	<div className="home">
		<Menu/>	
	<SearchBar></SearchBar>
	<h1 className="homeTitle" style={{marginTop:'-30px',position:'absolute:'}}>HOME PAGE</h1>
	<h3 className="homeDesc">here you can view different products available in the store</h3>	
     <Slider1></Slider1>
	 <h2 style={{ background: 'linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))',textAlign:'center',margin:'20px'}}>Products Available</h2>
	<div className="container-fluid" >	
	  <div className="row " >
         {byCreated.map((product,i)=>
		 <div className="col-4 mb-3"> <ProductBox key={i} product={product} wish={true}></ProductBox>
		 </div>
		 )}
	  </div>
	<div className="row" >
         {bySold.map((product,i)=><div className="col-4 mb-3"> <ProductBox key={i} product={product} wish={true}></ProductBox></div>)}
	  </div>
	  </div>
	  
	  </div>
	);}
export default Home;