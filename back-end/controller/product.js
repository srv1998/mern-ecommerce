const Product = require('../models/product');
const formidable = require('../node_modules/formidable/lib');
const fs= require('fs');
const _= require('../node_modules/lodash/lodash');
exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        
        const { name, description, price, category, quantity, shipping } = fields;

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        let product = new Product(fields);

        

        if (files.photo) {
            
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

exports.getProductById=(req,res,next,id)=>{    //only find the product in model not return it..
    Product.findById(id)
    .populate('category')
    .exec((err,product)=>{
    	if(err)
    	{
    		return res.status(404).json({
    			error:'product not found'
    		})
    	}
       req.product=product;
       next();
    })
    
}

exports.read=(req,res)=>{
	console.log(req.product);
	req.product.photo=undefined;  // we will return photo seperately not now..due to large size of photo.
	return res.json(req.product);
}

exports.deleteProduct=(req,res)=>{
	let product=req.product;
	product.remove((err,deletedProduct)=>{
		if(err)
		{
			return res.status(400).json({
				error:'product not found'
			})
		}
		res.json('product deleted successfully');
	})
}

exports.updateProduct=(req,res)=>{
	let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }
        
        //const { name, description, price, category, quantity, shipping } = fields;

        //if (!name || !description || !price || !category || !quantity || !shipping) {
          //  return res.status(400).json({
            //    error: 'All fields are required'
            //});
        //}

        let product = req.product; //new product() is replaced by update product..
        product=_.extend(product,fields);
        if (files.photo) {
            
            if (files.photo.size > 1000000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                console.log('PRODUCT CREATE ERROR ', err);
                return res.status(400).json({
                    error: err
                });
            }
            res.json({
            	updatedProduct:result
            });
        });
    });
}




exports.readProducts=(req,res)=>{
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;

    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
}

exports.readRelatedProducts=(req,res)=>{
    let limit=req.query.limit?parseInt(req.query.limit):3;

    Product.find({_id:{$ne:req.product},category:req.product.category})
    .limit(limit)
    .select('-photo')
    .populate('category','_id name')
    .exec((err,products)=>{
        if(err)
        {
            return res.status(400).json(err)
        }
        res.json(products);
    })
}

exports.getCategories=(req,res)=>{
    Product.distinct('category',{},(err,categories)=>{
        if(err)
        {
            return res.status(400).json(err);
        }
        res.json(categories);
    })
}

exports.getProductBySearch=(req,res)=>{
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};



exports.getPhoto=(req,res,next)=>
{
    if(req.product.photo.data)
    {
        res.set('Content-Type',req.product.photo.contentType);
        res.send(req.product.photo.data);
    }
    next();
}

exports.getProductsBySearchBar=(req,res)=>{
    const query={};
    if(req.query.search)
    {
        query.name={$regex:req.query.search,$options: 'i'}
        if(req.query.category && req.query.category!='All')
          query.category=req.query.category
    }
    Product.find(query,(err,products)=>{
        if(err)
        {
            res.status(400).json({error:err})
        }
        else{
            res.json(products)
        }
    }).select('-photo');
}

exports.updateQuantity=(req,res,next)=>{

    let bulkData= req.body.order.products.map((product)=>{
     
      return  { updateOne:{
                        filter:{_id:product._id},
                        update:{$inc:{quantity:-product.count,sold:+product.count}}
                    }
    }}
        
    )
    Product.bulkWrite(bulkData,{},(err,data)=>{
        if(err)
        {
            return res.status(500).json({error:err})
        }
        next()
    })

}