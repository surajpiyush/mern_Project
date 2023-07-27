const app=require('./app')
const dotenv=require('dotenv')
const connectDatabase=require('./config/database')
console.log('this iss  piyush kumar developer')
console.log('this is full stack developer');

dotenv.config({path:'backend/config/config.env'})


connectDatabase()

app.listen(process.env.PORT,()=>{  console.log(`server is working on port http://localhost:${process.env.PORT}`)})
