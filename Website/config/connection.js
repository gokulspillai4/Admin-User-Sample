const MongoClient = require('mongodb').MongoClient;
const state = { db: null }

module.exports.connect=function(done){
    const url='mongodb://localhost:27017'
    const dbname='myDB'


MongoClient.connect(url,(err,data)=>{
    if(err){
        console.log(err);
        return done(err)
    }
    else {
        state.db=data.db(dbname)
        done()
    }
   
})
}


module.exports.get=()=>{
    return state.db
}