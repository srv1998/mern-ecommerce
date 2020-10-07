const mongoose =require('mongoose');
const {ObjectId}= mongoose.Schema; // to assign a product with objectID of some cateogory...i.e the product belong  to that category..

const productSchema=mongoose.Schema({
	name:{
		type:String,
		required:true,
		trim:true,
		maxlength:32
	},
	description:{
		type:String,
		required:true,
		maxlength:2000
	},
	price:{
		type:Number,
		required:true,
		trim:true
	},
	category:{
		type:ObjectId,
		ref:'Category',
		required:true
	},
	quantity:{
		type:Number
	},
	sold:{
	   type:Number,
	   default:1
	},
	photo:{
		data: Buffer,
		contentType:String
	},
	shipping:{
		required:false,
		type:Boolean
	}
},{timestamps:true});

module.exports=mongoose.model('Product',productSchema);