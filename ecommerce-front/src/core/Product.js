import React ,{useState,useEffect}from 'react';
import Layout from './Layout';
import {getRelated,readProduct} from './auth';
import ProductBox from './ProductBox';



const Product =(props)=>{
    const [product,setProduct]=useState({})
    const [error,setError]=useState('')
    const [relatedProducts,setRelatedProducts]=useState([])
    
   const getProduct=(productId)=>{
       readProduct(productId).then(data=>{
           if(data.error)
           {
               setError(data.error)
           }
           else{
               setProduct(data)
               getRelated(data._id).then(datas=>{
                   if(datas.error)
                   {
                       setError(datas.error)
                   }
                   else{
                        setRelatedProducts(datas)
                     }
               })
           }
       })
   }
   const descForm=()=>(
       <form className="descProduct">
           <div className="input-group">
           <span className="input-group-text"> <div className="input-group-prepend">Name</div></span>
            <input type="text" name="name" value={product.name} className="form-control"/>
           </div>
           <div className="input-group">
           <span className="input-group-text"> <div className="input-group-prepend">Price</div></span>
            <input type="text" name="price" value={product.price} className="form-control"/>
           </div>
           <div className="input-group">
           <span className="input-group-text"> <div className="input-group-prepend">Description</div></span>
            <textarea type="text" name="description" value={product.description} className="form-control"/>
           </div>
           <div className="input-group">
           <span className="input-group-text"> <div className="input-group-prepend">Quanitity</div></span>
            <input type="text" name="quantity" value={product.quantity} className="form-control"/>
           </div>
           <div className="input-group">
           <span className="input-group-text"> <div className="input-group-prepend">Category</div></span>
            <input type="text" name="category" value={product.category&&product.category.name} className="form-control"/>
           </div>
       </form>
   )
   
    useEffect(()=>{
        const productId=props.match.params.productId;
      
        getProduct(productId)
    },[props])
    return(
        <div className="productShow">
        <Layout title={product.name} description={product.description&&product.description.substring(0,50)} className="container-fluid">
         <h2 className="mb-4" style={{ background: 'linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))',textAlign:'center',margin:'20px'}}>Product Details</h2>   
         <div className="row">
             <div className="col-6 mr-5 product">
             <ProductBox product={product} showButton={false} wish={true}/>
             <div style={{width:'100%'}} className="mt-3">
                 <h2 style={{ background: 'linear-gradient(to left, rgba(0,255,0,0), rgba(0,255,0,1))',textAlign:'center'}}>Product Description..</h2>
                 {descForm()}
             </div>
             </div>
             <div className="col-5 related">
                 <h3 style={{ background: 'linear-gradient(to right, rgba(0,255,0,0), rgba(0,255,0,1))',textAlign:'center'}}>Related Products</h3>
                  {relatedProducts.map((p,i)=><div className="mb-3" key={i}><ProductBox  product={p} wish={true}/></div>)}
             </div>
         </div>
        
        </Layout>
        </div>
    );
}

export default Product;