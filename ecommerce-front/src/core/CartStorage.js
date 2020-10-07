export const addProductToStorage=(product,next)=>{
    let cart=[]
    if(typeof window !=undefined)
    {
        if(localStorage.getItem('cart'))
        {
          cart=JSON.parse(localStorage.getItem('cart'))
        }
        cart.push({
            ...product,
            count:1
        })
   // to remove duplicate items...
   cart =Array.from(new Set(cart.map(p=>p._id))).map(id=>{
       return cart.find(p=>id===p._id)
   })
      localStorage.setItem('cart',JSON.stringify(cart))
        next();
    }
}

export const cartLength=()=>{
    if(typeof window!=undefined)
    {
       if(localStorage.getItem('cart')) 
    {
       
        return JSON.parse(localStorage.getItem('cart')).length
    }
       else
       return 0 
    }
}
export const cartProducts=()=>{
    if(typeof window!=undefined)
    {
       if(localStorage.getItem('cart')) 
    {
       
        return JSON.parse(localStorage.getItem('cart'))
    }
       else
       return []
    }
}
export const updateCartCount=(count,id)=>
{
    let cart=[]

    if(typeof window!==undefined)
    {
        if(localStorage.getItem('cart'))
        {
            cart=JSON.parse(localStorage.getItem('cart'))
            cart.map((p,i)=>{
                if(p._id===id)
                {
                    cart[i].count=count;
                }
            })
            localStorage.setItem('cart',JSON.stringify(cart));
        }
        
    }
}
export const removeProductFromCart=(id)=>{  //  for 1 product
    let cart=[]

    if(typeof window!==undefined)
    {
        if(localStorage.getItem('cart'))
        {
            cart=JSON.parse(localStorage.getItem('cart'))
            cart.map((p,i)=>{
                if(p._id===id)
                {
                    cart.splice(i,1);
                }
            })
            localStorage.setItem('cart',JSON.stringify(cart))
        }
    }
}
export const emptyCart=(id)=>{         //after successfull transaction
   
    if(typeof window!==undefined)
    {
        if(localStorage.getItem('cart'))
         localStorage.removeItem('cart')
    }
}

export const addProductToWishList=(product,next)=>{
    let wishList=[]
    if(typeof window !=undefined)
    {
        if(localStorage.getItem('wish'))
        {
            wishList=JSON.parse(localStorage.getItem('wish'))
        }
        wishList.push({
            ...product,
            count:1
        })
   // to remove duplicate items...
   wishList =Array.from(new Set(wishList.map(p=>p._id))).map(id=>{
       return wishList.find(p=>id===p._id)
   })
      localStorage.setItem('wish',JSON.stringify(wishList))
        next();
    }
}

export const removeProductFromWishList=(id)=>{  //  for 1 product
    let wishList=[]

    if(typeof window!==undefined)
    {
        if(localStorage.getItem('wish'))
        {
            wishList=JSON.parse(localStorage.getItem('wish'))
            wishList.map((p,i)=>{
                if(p._id===id)
                {
                    wishList.splice(i,1);
                }
            })
            localStorage.setItem('wish',JSON.stringify(wishList))
        }
    }
}

export const updateWishCount=(count,id)=>
{
    let wishList=[]

    if(typeof window!==undefined)
    {
        if(localStorage.getItem('wish'))
        {
            wishList=JSON.parse(localStorage.getItem('wish'))
            wishList.map((p,i)=>{
                if(p._id===id)
                {
                    wishList[i].count=count;
                }
            })
            localStorage.setItem('wish',JSON.stringify(wishList));
        }
        
    }
}

export const wishListLength=()=>{
    if(typeof window!=undefined)
    {
       if(localStorage.getItem('wish')) 
    {
       
        return JSON.parse(localStorage.getItem('wish')).length
    }
       else
       return 0 
    }
}

export const wishListProducts=()=>{
    if(typeof window!=undefined)
    {
       if(localStorage.getItem('wish')) 
    {
       
        return JSON.parse(localStorage.getItem('wish'))
    }
       else
       return []
    }
}

