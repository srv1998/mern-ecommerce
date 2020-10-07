import {Link, Redirect} from 'react-router-dom';
import React, { useState } from 'react';
import Photo from './Photo';
import moment from 'moment';
import StarRating from './StarRating'
import {
  addProductToStorage,updateCartCount,removeProductFromCart, 
  addProductToWishList,
  removeProductFromWishList,
  updateWishCount
  } from './CartStorage'
const ProductBox=({product,
  showButton=true,
  showCartButton=true,
  updateCart=false, // for count
  updateWish=false,
  setRun = f => f, 
  run = undefined,
  showRemoveButton=false,
  wish=false,
  showWishRemoveButton=false,
  removeWishAddToCart =false,
  showCat=true
})=>{
  const [redirect,setRedirect]= useState(false)
  const [count,setCount]= useState(product.count)
  const [wishCount,setWishCount]= useState(product.count)
  const getButton=()=>{
    
      return (
          showButton && (
        <Link to={`/product/${product._id}`}><button className="btn btn-outline-primary m-2">View Product</button></Link>
 
      ));
      }
   const getCartButton=()=>{
     return(
         showCartButton && (<Link to={`/cart`}><button className="btn btn-outline-danger m-2" onClick={addToCart}>Add to <i class="fa fa-shopping-cart"></i></button></Link>)
     )
   }
  const addToWishList=()=>{
    addProductToWishList(product,()=>(
      <Redirect to="/wish-list"></Redirect>
    ))
  }
   
   const getWishListButton=()=>{
     return(
      wish && (<Link to={`/wish-list`}><button className="btn btn-outline-success m-2" onClick={addToWishList}>Add to WishList</button></Link>)
     )
   }
   const getRemoveButton=()=>{
     return(
       showRemoveButton&&(
        <button
        onClick={() => {
          removeProductFromCart(product._id);
          setRun(!run); 
        }}
        className="btn btn-outline-danger mt-2 mb-2 ml-7"
      >
        Remove Product
      </button>
       )
     )
   }

   const getWishRemoveButton=()=>{ //******************************** */
    return(
      showWishRemoveButton&&(
       <button
       onClick={() => {
        removeProductFromWishList(product._id);
         setRun(!run); 
       }}
       className="btn btn-outline-success mt-2 mb-2 ml-7"
     >
       Remove Product
     </button>
      )
    )
  }
      const redirecting=()=>{
         if(redirect)
          return <Redirect to="/cart"/>
      }
    const getQuanity=()=>{
        return (
        product.quantity>0?<span className="badge badge-danger badge-pill" style={{fontSize:'0.9em'}}>Stock left:{product.quantity}</span>:
        <span className="badge badge-primary badge-pill">Out Of Stock</span> 
        )
    }
    const addToCart=()=>{
      if(removeWishAddToCart)  /********************* */
      {
        addProductToStorage(product,()=>{
          removeProductFromWishList(product._id);
          setRun(!run); 
          setRedirect(true)
           })
      }
     else{ 
      addProductToStorage(product,()=>{
            setRedirect(true)
      })
    }
    }

    const handleChange=id=>e=>{
      setRun(!run)
      setCount(e.target.value<1?1:e.target.value)
      if((e.target.value)>=1)
      {
            updateCartCount(e.target.value,id)
      }
    }
    const handleWish=id=>e=>{
      setRun(!run)
      setWishCount(e.target.value<1?1:e.target.value)
      if((e.target.value)>=1)
      {
            updateWishCount(e.target.value,id)
      }
    }
    const showUpdateWishList=()=>{
      return(
        updateWish &&(<div className="input-group mb-3">
                       <div className="input-group-prepend">
                        <span className="input-group-text">Alter Quantity</span>
                       </div>
                       <input type="number" className="form-control" value={wishCount} onChange={handleWish(product._id)}/>
                     </div>
                    )
      )
    }
    const showUpdateCart=()=>{
      return(
        updateCart &&(<div className="input-group mb-3">
                       <div className="input-group-prepend">
                        <span className="input-group-text">Alter Quantity</span>
                       </div>
                       <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
                     </div>
                    )
      )
    }
    return(    
              <div className="card productBox">
                  <div className="card-header name" style={{borderRadius:'10px 10px 0px 0px'}}>{product.name}</div>
               <div className="card-body">
                 {redirecting()}
                   <Photo item={product} url='/product'></Photo>
                   <p className="lead mt-2 " style={{fontStyle:'italic'}}>{product.description&&product.description.substring(0,50)}</p>
                   <p className="badge badge-pill price">Price: {product.price}$</p>
                   {showCat&&(<p className="black-8">Category:{product.category&&product.category.name}</p>)}
                  <p className="black-7" >Added {product.createdAt&&(moment(product.createdAt).fromNow())}</p>
                  <p >{getQuanity()}</p>
                  
                  <div >{getButton()} {getRemoveButton()} {getCartButton()} {getWishListButton()} {getWishRemoveButton()}</div>  
                   
                   
                <div>{showUpdateCart()}</div>
                <div>{showUpdateWishList()}</div>
               </div>
               </div>
          
    )
}

export default ProductBox;