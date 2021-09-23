var db = require('../config/connection')
var collection = require('../config/collections')
const bcrypt = require('bcryptjs')
const { USER_COLLECTION } = require('../config/collections')
const { response } = require('express')
const { resolve, reject } = require('promise')
var objectId = require('mongodb').ObjectID;
const { ObjectID } = require('bson')
module.exports = {
    doSignup: (userData) => {
        return new Promise(async (resolve, reject) => {


            userData.password = await bcrypt.hash(userData.password, 10)
            console.log("pass" + userData.password);
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })
            if (user) {
                response.status = true
                resolve(response)
            } else {
                console.log("Signup success");
                response.user = userData
                response.status = false
                db.get().collection(collection.USER_COLLECTION).insertOne(userData)
                resolve(response)
            }




        })
    },

    doLogin: (userData) => {
        return new Promise(async (resolve, reject) => {
            let loginStatus = false
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne(({ email: userData.email }))
            if (user) {
                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        console.log("Login Success")
                        response.user = user
                        response.status = true
                        resolve(response)
                    } else {
                        console.log("Login Failed")
                        resolve({ status: false })
                    }

                })
            } else {
                console.log("Login Failed")
                resolve({ status: false })
            }

        })
    },
    addUser: (userData) => {

        return new Promise(async (resolve, reject) => {


            userData.password = await bcrypt.hash(userData.password, 10)
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ email: userData.email })
            if (user) {
                response.status = true
                resolve(response)
            } else {
                console.log("Add success");
                response.user = userData
                response.status = false
                db.get().collection(collection.USER_COLLECTION).insertOne(userData)
                resolve(response)
            }




        })
    },
    getAllUsers: () => {
        return new Promise(async (resolve, reject) => {
            let users = await db.get().collection(collection.USER_COLLECTION).find().toArray()
             resolve(users)
        })
    },
    removeUser: (userId) => {

        return new Promise(async (resolve, reject) => {



            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(userId) })
            if (user) {


                response.status = true
                db.get().collection(collection.USER_COLLECTION).deleteOne({ _id: objectId(userId) }).then(() => {
                    console.log("Remove success");
                    resolve(response)
                })
            } else {
                console.log("removefailed");

                response.status = false
                resolve(response)
            }




        })
    },

    getUserDetails: (userId) => {
        return new Promise(async (resolve, reject) => {
            
            let user =await db.get().collection(collection.USER_COLLECTION).findOne({ _id: objectId(userId) })
            resolve(user)
        })
    },


    updateUser:(userId,userData)=>{

        return new Promise(async (resolve, reject) => {

            console.log("entered promise");
            console.log(userId);
            let response = {}
            let user = await db.get().collection(collection.USER_COLLECTION).findOne({ _id: ObjectID(userId) })
            if (user) {
                
                response.status = true
                await db.get().collection(collection.USER_COLLECTION).updateOne({_id:ObjectID(userId)},{
                    $set:{
                      username:userData.username,
                      email:userData.email  
                    }
                })
                resolve(response)


               
            } else {
                response.status = false
                resolve(response)
               
                
            }

        })

    }

}