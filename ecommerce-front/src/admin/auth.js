import {API} from '../config';

export const createCategory=(id,name,token)=>(
    fetch(`${API}/category/create/${id}`,{
        method:'POST',
        headers:{
            Accept:'Application/json',
            'Content-Type':'Application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(name)
    }).then(response=>response.json()).catch(err=>console.log(err))
)
export const createProduct=(id,product,token)=>(
    fetch(`${API}/product/create/${id}`,{
        method:'POST',
        headers:{
            Accept:'Application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response=>response.json()).catch(err=>console.log(err))
)

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

export const getAllOrders=(id,token)=>(
    fetch(`${API}/orders/getAll/${id}`,{
        method:'GET',
        headers:{
            Accept:'Application/json',
            Authorization: `Bearer ${token}`
        }
       
    }).then(response=>response.json()).catch(err=>console.log(err))
)
export const getStatusValues=(id,token)=>(
    fetch(`${API}/orders/statusValues/${id}`,{
        method:'GET',
        headers:{
            Accept:'Application/json',
            Authorization: `Bearer ${token}`
        }
       
    }).then(response=>response.json()).catch(err=>console.log(err))
)
export const updateStatus=(userId,token,orderId,status)=>(
    fetch(`${API}/order/statusUpdate/${orderId}/${userId}`,{
        method:'PUT',
        headers:{
            Accept:'application/json',
            'content-type':'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({status,orderId})
       
    }).then(response=>response.json()).catch(err=>console.log(err))
)

export const getProductsForAdmin = () => {
    return fetch(`${API}/products?limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/delete/${userId}/${productId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/update/${userId}/${productId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteOrder = (userId, token,orderId) => {
    return fetch(`${API}/order/delete/${userId}/${orderId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};