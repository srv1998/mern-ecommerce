import {API} from '../config';
import queryString from 'query-string';

export const getCategories=()=>(
    fetch(`${API}/categories`,{
        method:'GET'
    }).then(response=>response.json()).catch(err=>console.log(err))
)

export const getProducts=(sortBy,orderBy)=>(
   fetch(`${API}/products?sortBy=${sortBy}&order=${orderBy}`,{
       method:'GET'
   }).then(response=>response.json()).catch(err=>console.log(err))
)

export const getFilteredProducts=(skip,filters={},limit)=>{
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}

export const getProductsBySearchBar=(params)=>{// searchbar value and drop down value is send as query to backend get req.
   const query=queryString.stringify(params)
     console.log(query)
   return  fetch(`${API}/products/searchbox?${query}`,{
        method:'GET'
    }).then(response=>response.json()).catch(err=>console.log(err))
}
export const readProduct=(id)=>(
    fetch(`${API}/product/${id}`,{
        method:"GET"
    }).then(response=>response.json()).catch(err=>console.log(err))
)

export const getRelated=(id)=>(
    fetch(`${API}/products/related/${id}`,{
        method:"GET"
    }).then(response=>response.json()).catch(err=>console.log(err))
)

export const getBraintreeToken=(id,token)=>(
    fetch(`${API}/braintree/get_token/${id}`,{
        method:"GET",
        headers:{
          Accept:'application/json',
          'content-type':'application/json',
          Authorization:` Bearer ${token}`
        }
    }).then(response=>response.json()).catch(err=>console.log(err))
)
export const processPayment=(id,token,paymentData)=>(
    fetch(`${API}/payment/${id}`,{
        method:"POST",
        headers:{
          Accept:'application/json',
          'content-type':'application/json',
          Authorization:` Bearer ${token}`
        },
        body:JSON.stringify(paymentData)
    }).then(response=>response.json()).catch(err=>console.log(err))
)

export const createOrder=(id,token,orderData)=>(
    fetch(`${API}/orders/create/${id}`,{
        method:"POST",
        headers:{
          Accept:'application/json',
          'content-type':'application/json',
          Authorization:` Bearer ${token}`
        },
        body:JSON.stringify({order:orderData})
    }).then(response=>response.json()).catch(err=>console.log(err))
)