const mongoose =require('mongoose');
const crypto = require('crypto');
const { v1: uuidv1 } = require('../node_modules/uuid/dist');

const userSchema=new mongoose.Schema({
	name:{
		type:String,
		trim:true,
		maxlength:20,
		required:true
	},
	email:{
		type:String,
		trim:true,
		unique:32,
		required:true
	},
	hashed_password:{
		type:String,
        required:true,
        
    },
    phone:{
        type:Number,
        default:1234567890,
        minlength:10,
        maxlength:10
    },
	about:{
		type:String,
        trim:true,
        default:'hello there'
	},
    
	salt:String,
    role:{
    	type:Number,
        default:0
    },
    gender:{type:String,default:'male'},
    day:{
        type:Number,
        default:01,
       
    },
    month:{
        type:String,
        default:'jan',
    },
    year:{
        type:Number,
        default:1999,
    },
    history:{
    	type:Array,
    	default:[]
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
},{timestamps:true})

userSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;  
    });


userSchema.methods={
authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};    

module.exports= mongoose.model('User',userSchema);