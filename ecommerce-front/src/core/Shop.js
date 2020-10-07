import React ,{useState,useEffect}from 'react';
import Layout from './Layout';
import {getProducts} from '../admin/auth';
import ProductBox from './ProductBox';
import {getCategories,getFilteredProducts} from './auth';
import CheckBox from './CheckBox';
import {priceRange} from './PriceRange';
import RadioButtons from './RadioButtons';

const Shop=()=>{
   const [myFilters,setMyFilters]= useState({
       filters:{category:[],price:[]}
   })

    const [categories,setCategories]=useState([]); // for all categories in the filter..
    const [error,setError]=useState(false);
    const [skip,setSkip]=useState(0);
    const [limit,setLimit]=useState(6);
    const [filteredProducts,setFilteredProducts]=useState([]);
    const [size,setSize]=useState(0);
    const [oldLen,setOldLen]=useState(0);
    const [newLen,setNewLen]=useState(0);
    const init=()=>{
      getCategories().then(data=>{
          if(data.error)
          {
              setError(data.error);
          }
          else{
              setCategories(data);
          }
      })
    }
   useEffect(()=>{
       init();
       handleFilteredProducts(myFilters.filters);
   },[])
  const handleFilteredProducts=(filters)=>{  
    getFilteredProducts(skip,filters,limit).then(data=>{
        if(data.error)
        {
            setError(data.error);
        }
        else
        {  
            setFilteredProducts(data.data);
            setSize(data.size);
            setSkip(0)
        }
    })
    
  }
  const loadMore=()=>{
    let skipTo =skip+limit;
    getFilteredProducts(skipTo,myFilters.filters,limit).then(data=>{
        if(data.error)
        {
            setError(data.error);
        }
        else
        {  
            setFilteredProducts([...filteredProducts,...data.data]);
            setSize(data.size);
            setSkip(skipTo)
        }
    })
  }
  const loadMoreButton=()=>{
      
      if(size>0&&size>=limit)
      {
          return(
              <button className="btn btn-primary btn-large " onClick={loadMore}>Load More</button>
          )
      }
     
  }
   const handleFilters=(filters,filterBy)=>{ 
         //filterBy:-categories and priceRange and store in useState()
         
        const categoriesObj={...myFilters}
        categoriesObj.filters[filterBy]=filters;
       
        if(filterBy==='price')
        {
            const priceArray= getArray(filters);
            categoriesObj.filters[filterBy]=priceArray;
        }
        console.log(categoriesObj.filters)
        handleFilteredProducts(categoriesObj.filters);
        setMyFilters(categoriesObj);
   }
   const getArray=(id)=>{
        const priceRangeDemo=priceRange;
        let array = [];
       
        for (let key in priceRangeDemo) {
            if (priceRangeDemo[key]._id === parseInt(id)) {
                array = priceRangeDemo[key].array;
            }
            
        }
        return array;
   }
    return(
        <Layout title="Shop" description="Select products By Categories and price-Range..." className="container-fluid">
         <div className="row shoprow " >
           <div className="col-3 shopfilters">
            <div className="shopCat" >   
           <h3 style={{ background: 'linear-gradient(to left, rgba(255,0,0,0), rgba(255,0,0,1))'}}>Select Categories</h3>
             <ul>
                 <CheckBox categories={categories} handleFilters={filters=>handleFilters(filters,'category')}></CheckBox>
             </ul>
             </div>
             <div className="shopPrice">
             <h3 style={{ background: 'linear-gradient(to left, rgba(255,0,0,0), rgba(255,0,0,1))'}}>Select A Price</h3>
             <div>
                 <RadioButtons priceRange={priceRange} handleFilters={filters=>handleFilters(filters,'price')} skip={skip} setSkip={setSkip}></RadioButtons>
             </div>
             </div>
           </div> 
           <div className="col-9 col9">
             <h2 className="mb-4" style={{ background: 'linear-gradient(to right, rgba(0,255,0,0), rgba(0,255,0,1))',textAlign:'center',margin:'20px',color:'red'}}>Products</h2>
             <div className="row">
             {filteredProducts.map((product,i)=><div className="col-4 mb-3" > <ProductBox product={product} key={i} wish={true}></ProductBox></div>)}
             </div>
             {loadMoreButton()}
           </div> 
         </div>
        
        </Layout>
    );
}
 export default Shop;
