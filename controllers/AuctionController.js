const db = require("../models");
const pagination = require("../helper/pagination");
const Buy = db.buys;
const Rent = db.rents;
const Auction = db.auctions;
const addAuction = async (req, res) => {
  let info = {
    image:req.body.image,
    title:req.body.title,
    seller:req.body.seller,
    brand:req.body.brand,
    moq:req.body.moq,
    price: req.body.price,
    rating: req.body.rating
   
  };

  const auction = await Auction.create(info);
  res.status(200).send(auction);
  console.log(auction);
};

const getAllAuction = async (req, res) => {
  //   let products = await Product.findAll({
  //     attributes:[
  //         "title",
  //         "price"
  //     ]
  //   });
  let auction = await Auction.findAll({});
  res.status(200).send(auction);
};

const getOneAuction = async (req, res) => {
  let id = req.params.id;
  let auction = await Auction.findOne({where:{id:id}});
  res.status(200).send(auction);
};


const updateAuction = async (req, res) => {
    let id = req.params.id;
    let auction = await Auction.update(req.body,{where:{id:id}});
    res.status(200).send(auction);
};

const deleteAuction=async(req,res)=>{
    let id = req.params.id
   await  Auction.destroy({where:{id:id}})
   res.status(200).send("Auction is deleted");

}
// const getPublishedBuy=async(req,res)=>{
    
//     let products = await Product.findAll({where:{published:true}});
//     res.status(200).send(products);

// }
const paginationdata = async (req, res) => {
 
  const { page, limit } = req.query;
  const { newlimit, offset } = await pagination.getPagination(page, limit);
  const lm = parseInt(limit);
  await Auction.findAndCountAll({
    limit: lm,
    offset: offset,
  })
    .then((data) => {
      const resp = pagination.getPagingData(data, page, limit);
      res.status(200).json({
        success: true,
        data: resp,
        message: "Services Fetched Successfully !!",
      });
    })
    .catch((err) => {
      res.status(500).send({ success: false, message: err.message });
    });
};
module.exports={
    addAuction,
    getAllAuction,
    getOneAuction,
    updateAuction,
    deleteAuction,
    paginationdata
    // getPublishedProduct
}