var db=require('../config/connection')
var collection=require('../config/collections')
const bcrypt=require('bcryptjs')
const { USER_COLLECTION } = require('../config/collections')
const { response } = require('express')
const { resolve, reject } = require('promise')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
    
            console.log("data failed");
            userData.password=await bcrypt.hash(userData.password,10)

        })
    },

    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false
            let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne(({email:userData.email}))
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log("Login Success")
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log("Login Failed")
                        resolve({status:false})
                    }

                })
            }else{
                console.log("Login Failed")
                resolve({status:false})
            }

        })
    },
    doAdd:(userData)=>{
       
        return new Promise(async(resolve,reject)=>{
    

            
            let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({email:userData.email})
            if(user){
                        response.status=true
                        resolve(response)
            }else{
                console.log("Add success");
                response.user=userData
                response.status=false
                db.get().collection(collection.USER_COLLECTION).insertOne(userData)
                resolve(response)
            }

            


        })
    },
getAllUsers:()=>{
    return new Promise(async(resolve,reject)=>{
        let users=db.get().collection(collection.USER_COLLECTION).find().toArray()
        await resolve(users)
    })
}
   
}