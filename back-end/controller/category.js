const Category=require('../models/category');

exports.createCategory=(req,res)=>{
	const category=new Category(req.body);
	category.save((err,category)=>{
		if(err||!category)
		{
			return res.status(400).json({
				error:err
			})
		}
		res.json({category});
	})
}

exports.getCategoryById=(req,res,next,id)=>{
	Category.findById(id,(err,category)=>{
		if(err)
		{
			return res.status(404).json({
				Error:'category not found!!!'
			})
		}
		req.category=category;
		next();
	})
}

exports.read=(req,res)=>{
	return res.json(req.category.name);
}

exports.updateCategory=(req,res)=>{
	let category=req.category;
	category.name=req.body.name;
	category.save((err,category)=>{
		if(err)
		{
			return res.status(400).json(err);
		}
		res.json(category);
	})
}

exports.deleteCategory=(req,res)=>{
	let category=req.category;
	category.remove((err,deletedCategory)=>{
		if(err)
		{
			return re.status(400).json(err);
		}
		return res.json('category deleted successfully!!!');
	});
}

exports.readAll=(req,res)=>{
      Category.find((err,categories)=>{
      	if(err)
      	{
      		return res.status(400).json(err);
      	}
      	res.json(categories);
      })
}