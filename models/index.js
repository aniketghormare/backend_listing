const dbConfig=require("../config/dbconfig.js");

const {Sequelize,DataTypes}=require("sequelize")

const sequelize=new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host:dbConfig.HOST,
        dialect:dbConfig.dialect,
        operatorsAlises:false,
    }

)

sequelize.authenticate()
.then(()=>{
    console.log("connected..")
})
.catch((err)=>{
    console.log("error"+ err)
})

const db={}

db.Sequelize=Sequelize
db.sequelize=sequelize


db.buys=require("./BuyModel.js")(sequelize,DataTypes)
db.rents=require("./RentModel.js")(sequelize,DataTypes)
db.auctions=require("./AuctionModel.js")(sequelize,DataTypes)
db.tenders=require("./TenderModel.js")(sequelize,DataTypes)
db.jobs=require("./JobModel.js")(sequelize,DataTypes)
db.registers=require("./RegisterModel.js")(sequelize,DataTypes)
db.buycart=require("./BuyCartModel.js")(sequelize,DataTypes)
db.rentcart=require("./RentCartModel.js")(sequelize,DataTypes)



db.sequelize.sync({force:false})
.then(()=>{
    console.log("yes re-sync done!")
})

module.exports=db