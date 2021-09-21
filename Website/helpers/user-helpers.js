var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcryptjs')
const { USER_COLLECTION } = require('../config/collections')
const { response } = require('express')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
            resolve(data.ops[0])
        })
        })
        

        

    }
}