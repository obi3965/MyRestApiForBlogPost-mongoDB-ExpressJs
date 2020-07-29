
const fs = require('fs')
const mongoose = require('mongoose')
// const dotenv = require('dotenv');

const Tour = require('../models/tourModel')


const config = require('../config/db')



//hosted Database connection
mongoose.connect(config.DB,{
  useNewUrlParser:true,
  useCreateIndex:true,
  findOneAndReplace:true,
  useFindAndModify:true,
  useUnifiedTopology:true
}).then(() =>{
  // console.log(con.connections);
  console.log('Database is connected')
})

//read the json files
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`,'utf-8'));


//import json data into database
const importData = async()=>{
    try{
     await Tour.create(tours)
     console.log('data successfully loaded')
    }catch(err){
        console.log(err)
    }
    process.exit();
}

//delete all data from database
const deletData =async()=>{
    try{
     await Tour.deleteMany()
     console.log('data successfully deleted')
     process.exit();
    }catch(err){
        console.log(err)
    }
    process.exit();
}

if(process.argv[2] === '--import'){
    importData();

}else if(process.argv[2] === '--delete'){
    deletData()
}
console.log(process.argv);