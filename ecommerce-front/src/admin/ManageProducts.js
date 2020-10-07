import React ,{useState,useEffect}from 'react';
import Layout from '../core/Layout';
import {getProductsForAdmin ,deleteProduct} from './auth'
import moment from 'moment'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import Photo from '../core/Photo'
import {API} from '../config';
//<Photo item={product} url='/product'></Photo>
const ManageProucts=()=>{

    const [products,setProducts]=useState([])
    const {user,token}=isAuthenticated()
    const loadProducts=()=>{
        getProductsForAdmin()
        .then(data=>{
            if(data.error)
            {
                console.log(data.error)
            }
            else{
                setProducts(data)
            }
        })
    }
    useEffect(()=>{
        loadProducts()
    },[])
    const destroyProduct=(p)=>{
        alert(`${p.name} will be deleted!!!`)
        deleteProduct(p._id,user._id,token)
        .then(data=>{
            if(data.error)
            {
                console.log(data.error)
            }
            else{
                loadProducts()
            }
        })
         
    }
    return(
        <div style={{background:'rgba(128, 128, 128, 0.384)'}}>
        <Layout title="Manage Products" description="Create,Update,Read or Delete products" className="container">
           <div className="row">
                <div className="col-12">
                    <h2 className="text-center" style={{ background: 'linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))',textAlign:'center',margin:'20px'}}>
                        Total {products.length} products
                    </h2>
                    
                    <table className="table table-striped table-dark table-bordered" >
                        <thead>
                            <tr>
                                <th scope='col' style={{color:'green',fontSize:'1.2em'}}>Product Name</th>
                                <th scope='col' style={{color:'green',fontSize:'1.2em'}}>Update</th>
                                <th scope='col'style={{color:'green',fontSize:'1.2em'}}>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {products.map((p, i) => (
                            <tr>
                            <td key={i}> <strong>{p.name}</strong> <span className="d-inline" style={{float:'right'}}><Photo item={p} url='/product' manageHeight={true} manageWidth={true} ></Photo></span></td>
                            <td><Link to={`/product/update/${p._id}`}>
                            <span className="badge badge-warning badge-pill" style={{fontSize:'1em',padding:'9px'}}>
                                Update
                            </span>
                        </Link></td>   
                               <td>
                            <button className="btn btn-danger" style={{borderRadius:'20px',color:'black',fontWeight:'600'}}
                            onClick={() => destroyProduct(p)}>Delete</button>
                           </td> 
                                
                        </tr>))
                        }
                        </tbody>
                    </table>
                    <br />
                </div>
            </div>

        </Layout>
        </div>
    );
}
export default ManageProucts