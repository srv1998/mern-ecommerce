const {Order,CartItem}=require('../models/order')
const sgMail = require('../node_modules/@sendgrid/mail'); // SENDGRID_API_KEY
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.createOrder=(req,res)=>{
    req.body.order.user=req.profile
    
    const order= new Order(req.body.order)
    order.save((err,order)=>{
        if(err)
        {
            return res.status(400).json({
                error:err
            })
        }
        else
          {res.json(order)
          const emailData = {
            from: process.env.EMAIL_FROM, 
            to: 'srvdhiman2881998@gmail.com', // admin
            
            subject: `A new order is received`,
            html: `
            <h1>Hey Admin, Somebody just made a purchase in your ecommerce store</h1>
            <h2>Customer name: ${order.user.name}</h2>
            <h2>Customer address: ${order.address}</h2>
            <h2>User's purchase history: ${order.user.history.length} purchase</h2>
            <h2>User's email: ${order.user.email}</h2>
            <h2>Total products: ${order.products.length}</h2>
            <h2>Transaction ID: ${order.transaction_id}</h2>
            <h2>Order status: ${order.status}</h2>
            <h2>Product details:</h2>
            <hr />
            ${order.products
                .map(p => {
                    return `<div>
                        <h3>Product Name: ${p.name}</h3>
                        <h3>Product Price: ${p.price}</h3>
                        <h3>Product Quantity: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}
            <h2>Total order cost: ${order.amount}<h2>
            <p>Login to your dashboard</a> to see the order in detail.</p>
        `
        };
        sgMail
            .send(emailData)
            .then(sent => console.log('SENT Successfully >>>', sent))
            .catch(err => console.log('ERR1 >>>', err));
 
        // email to buyer
        const emailData2 = {
            from: process.env.EMAIL_FROM,
            to: order.user.email,
            subject: `You order is in process`,
            html: `
            <h1>Hey ${req.profile.name}, Thank you for shopping with us.</h1>
            <h2>Total products: ${order.products.length}</h2>
            <h2>Transaction ID: ${order.transaction_id}</h2>
            <h2>Order status: ${order.status}</h2>
            <h2>Product details:</h2>
            <hr />
            ${order.products
                .map(p => {
                    return `<div>
                        <h3>Product Name: ${p.name}</h3>
                        <h3>Product Price: ${p.price}</h3>
                        <h3>Product Quantity: ${p.count}</h3>
                </div>`;
                })
                .join('--------------------')}
            <h2>Total order cost: ${order.amount}<h2>
            <p>Thank your for shopping with us.</p>
        `
        };
        sgMail
            .send(emailData2)
            .then(sent => console.log('SENT 2 >>>', sent))
            .catch(err => console.log('ERR 2 >>>', err));
 
    }
    });
    }

exports.getAllOrders=(req,res)=>{

    Order.find()
    .populate('user','_id name address')
    .sort('-created')
    .exec((err,orders)=>{
         if(err)
         {
             return res.status(400).json({error:err})
         }
         res.json(orders)
    })
}
exports.getStatusValues=(req,res)=>{
    res.json(Order.schema.path('status').enumValues)
}
exports.getOrderById=(req,res,next,id)=>{
    Order.findById(id)
    .populate('products.product','name price')
    .exec((err,order)=>{
        if(err||!order)
        {
            return res.status(400).json({error:err})
        }
        req.order=order;
        next()
    })
}
exports.updateStatus=(req,res)=>{
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(order);
        
    });
}

exports.deleteOrder=(req,res)=>{
    let order=req.order
    order.remove((err,removed)=>{
        if(err)
        {
            return res.status(400).json({
                error:"order not found"
            })
        }
      res.json('order deleted succesfully!!')
    })
}