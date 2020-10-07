import React ,{useState,useEffect}from 'react';
import Layout from './Layout';
import ProductBox from './ProductBox';
import { wishListProducts} from './CartStorage'
import { Link } from 'react-router-dom';
import '../style1.css'
import Photo from './Photo'
import {
    addProductToStorage,updateCartCount,removeProductFromCart, 
    addProductToWishList,
    removeProductFromWishList,
    updateWishCount
    } from './CartStorage'
const WishList=()=>{
    const [wishList,setWishList]= useState([]);
    const [run, setRun] = useState(false);

     const addToCartRemoveFromWishList=(product)=>{
        addProductToStorage(product,()=>{
            removeProductFromWishList(product._id);
            setRun(!run);}) 
     }
    
    const showWishListItems=()=>(
           <div className="col-12">
           <table className="table table-striped table-dark table-bordered" >
                        <thead>
                            <tr>
                                <th scope='col' style={{color:'green',fontSize:'1.2em'}}>Product Name</th>
                                <th scope='col' style={{color:'green',fontSize:'1.2em'}}>Add to Cart</th>
                                <th scope='col'style={{color:'green',fontSize:'1.2em'}}>Delete</th>
                                <th scope='col'style={{color:'green',fontSize:'1.2em'}}>View Product</th>
                            </tr>
                        </thead>
           
            <tbody>
            {wishList.map((p,i)=>      
            <tr>
                            <td key={i}> <strong style={{fontSize:'1.2em'}}>{p.name}</strong> <span className="d-inline" style={{float:'right'}}><Photo item={p} url='/product' manageHeight={true} manageWidth={true} ></Photo></span></td>
                            <td><Link to='/cart'>
                            <button className="badge badge-warning badge-pill" style={{fontSize:'1em',padding:'9px',border:'0.5px yellow solid'}} onClick={()=>addToCartRemoveFromWishList(p)}>
                            Add to <i class="fa fa-shopping-cart"></i>
                            </button>
                        </Link></td>   
                               <td>
                            <button className="badge badge-danger badge-pill " style={{fontSize:'1em',padding:'9px',color:'black',border:'0.5px red solid'}}
                            onClick={() => {removeProductFromWishList(p._id);
                                setRun(!run);} }>Delete</button>
                           </td>
                           <td><Link to={`/product/${p._id}`}>
                            <button className="badge badge-success badge-pill" style={{fontSize:'1em',padding:'9px',border:'0.5px green solid',color:'black'}}>
                           View Product
                            </button>
                        </Link></td>           
                                
            </tr>)}
            </tbody>
            </table>
            </div>       
            )
       
    
    const noItems=()=>(
        <h1>No Items in Your WishList <Link to="/shop" style={{color:'yellow'}}>Continue Shopping</Link></h1>
    ) 
    useEffect(()=>{
        setWishList(wishListProducts())
    },[run])
    return(
    <div className="wishList">    
    <Layout title="Wish List" description="welcome to Shopping Cart" className="container-fluid">
        <h2 className="text-dark" style={{textAlign:'center'}}>Your WishList has {wishList.length} Items</h2>
            <hr/>
       <div className="row">
        {wishList.length>0?showWishListItems():noItems()}
        </div> 
    </Layout>
    </div>
    );
}
export default WishList