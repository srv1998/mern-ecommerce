const express=require('./node_modules/express');
require('dotenv').config();
const mongoose=require('mongoose');
const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const braintreeRoutes=require('./routes/braintree');
const categoryRoutes=require('./routes/category');
const orderRoutes=require('./routes/order');
const productRoutes=require('./routes/product');
const morgan=require('./node_modules/morgan');
const cors = require('./node_modules/cors/lib');
const bodyparser=require('./node_modules/body-parser');
const cookieparser=require('./node_modules/cookie-parser');
const expressValidator=require('./node_modules/express-validator');
const session =require('./node_modules/express-session')
const flash=require('./node_modules/connect-flash')
const setFlash=require('./controller/auth')
const app= express();

mongoose.connect(process.env.MONGO_URI,{
	useNewUrlParser:true,
	useCreateIndex:true
}).then(()=>console.log('DataBase Connected...')).catch((err)=>console.log(err));


app.use(cors());
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(cookieparser());
app.use(expressValidator());
app.use(session({
  secret:'secret123',
  saveUninitialized:true,
  resave:true
}))
app.use(flash())
app.use(setFlash.connectFlash)

app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);
app.use('/api',braintreeRoutes);
app.use('/api',orderRoutes);


/*var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}*/

const port= process.env.PORT||8000;
app.listen(port,()=>console.log(`port ${port} running...`))