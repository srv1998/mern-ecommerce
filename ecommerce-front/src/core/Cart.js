import React ,{useState,useEffect}from 'react';
import Layout from './Layout';
import ProductBox from './ProductBox';
import {cartProducts} from './CartStorage'
import { Link } from 'react-router-dom';
import Checkout from './Checkout';
const Cart=()=>{
  const [items,setItems]=useState([]);
  const [run, setRun] = useState(false);

  useEffect(()=>{
      setItems(cartProducts())
  },[run])

  const showCartItems=()=>(
      <div>
          <h2>Your Cart has {items.length} Items</h2>
          <hr/>
          {items.map((p,i)=>
          <ProductBox product={p} key={i} showCartButton={false} updateCart={true} setRun={setRun} run={run} showRemoveButton={true}/>
          )}
      </div>
  )
  const noItems=()=>(
      <h1>No Items in Your Cart <Link to="/shop" style={{color:'yellow'}}>Continue Shopping</Link></h1>
  )     
  return(
    <div className="cart">
    <Layout title="Shopping Cart" description="welcome to Shopping Cart" className="container-fluid">
     
     <div className="row ">
          <div className="col-5 mr-5 mb-2">      
         {items.length>0?showCartItems():noItems()}
         </div>
          <div className="col-6">
         <h2 className="mb-3">Your Cart Summary</h2>
         <hr/>
         
         <Checkout products={items} run={run} setRun={setRun}/>
          </div>  
     </div> 
    </Layout>
    </div>
  );
}
export default Cart;