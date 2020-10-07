import React ,{useState,useEffect}from 'react';
import {getCategories,getProductsBySearchBar} from './auth';
import ProductBox from './ProductBox'
import '../style1.css';
export const SearchBar=()=>{
    const [values,setValues]=useState({
        categories:[],
        category:'',
        search:'',
        result:[],
        error:'',
        searched:false
    })

 const {categories,
    category,
    search,
    result,
    error,
    searched}=values;

const findCategories=()=>{
    getCategories().then(data=>{
        if(data.error)
        {
           console.log(data.error)
        }
        else{
            setValues({...values,categories:data,searched:false})
            console.log(categories)
        }
    })
}

useEffect(()=>{
    findCategories();
},[])

const searchMeassage=(result,searched)=>{
    if(searched &&result.length>0)
    return <div style={{background:'green',textAlign:'center'}}>Found {result.length} Products..</div>
    if(searched &&result.length<1)
    return <div style={{background:'green',textAlign:'center'}}>No products Found..</div>
}
const getSearchedproducts=(result=[])=>(
    <div> 
    <h2>{searchMeassage(result,searched)}</h2>
    <div className="row mb-5">
       {result.map((p,i)=><div className="ml-5"><ProductBox key={i} product={p} wish={true} showCat={false}></ProductBox></div>)}
    </div>
    </div>
)

const searchProduct=()=>{
    if(search)
    {
        getProductsBySearchBar({search:search||undefined,category:category})
        .then(data=>{
            if(data.error)
            {
                console.log(data.error)
            }
            else{
                setValues({...values,result:data,searched:true})
            }
        })
    }
}
const submitForm=e=>{
  e.preventDefault();
  searchProduct();
}
const handleChange=name=>e=>{
   setValues({...values,[name]:e.target.value,searched:false})
}


const searchForm=()=>(
       <form onSubmit={submitForm} className='bg-dark'>
           <span className="input-group-text">
            <div className='input-group '>
              <div className="input-group-prepend">
                  <select className="btn mr-2" onChange={handleChange('category')}>
                   <option value="All">All</option>
                   {categories.map((c,i)=><option key={i} value={c._id}>{c.name}</option>)}
                  </select>
              </div>   
               <input type="text" name='search' onChange={handleChange('search')} className='form-control'
                placeholder="search product"
               />
           </div>
           <div className="btn input-group-append" >
                  <button className="input-group-text" type="submit">search</button>
           </div>
           </span>
       </form>
   
);
  return(
      <div className='row' >
         <div className="container-fluid">{searchForm()}</div>
         <div className="container-fluid mb-3 mt-2" >
         {getSearchedproducts(result)}
         </div>
      </div>
  );
}

export default SearchBar;