const User =require('../models/user')
require('dotenv').config()
const braintree=require('../node_modules/braintree')

const gateway= braintree.connect({
    environment: braintree.Environment.Sandbox,
    publicKey:process.env.BRAIN_TREE_PUBLIC_KEY,
    privateKey:process.env.BRAIN_TREE_PRIVATE_KEY,
    merchantId:process.env.BRAIN_TREE_MERCHANT_ID
})

exports.getToken=(req,res)=>{
   gateway.clientToken.generate({},(err,token)=>{
       if(err)
       {
          return res.status(500).json({
               error:err
           })
       }
       else
       {
           res.json(token)
       }
   })
}

exports.processPayment=(req,res)=>{
    let customerNonce=req.body.nonce
    let customerAmount=req.body.amount

    let newTransaction= gateway.transaction.sale({
        amount:customerAmount,
        paymentMethodNonce:customerNonce,
        options:{submitForSettlement:true}
        
    },(err,result)=>{
        if(err)
        {
            return res.status(500).json({
                error:err
            })
        }
        else{
            res.json(result)
        }
    })
}
