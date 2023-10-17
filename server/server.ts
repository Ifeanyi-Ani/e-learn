import {app} from "./app";
import mongoose from 'mongoose';

// mongoose.connect(process.env.CON_STR,{
//     useUnifiedTopology:true,
//     useNewUrlParser:true,
// }).then(()=>console.log("server is connected")).catch((err)=>console.log(err.message))


app.listen(process.env.PORT, ()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})