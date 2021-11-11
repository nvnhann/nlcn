const Review = require('../models/Review.model');

exports.create = (req,res) =>{
   const review = new Review({
       idtk : req.idtk,
       binhluan: req.body.comment,
       danhgia: req.body.rating,
       idsach: req.body.idsach
   });

    Review.create(review, (err, _)=>{
        if(err){
            console.log(err)
            return res.status(500).send({
                message: err.message || "Some error occurred while creating."
            });
        }
        return  res.send({message: "thanhcong"})
    })

}

exports.getById = (req, res)=>{
    Review.getById(req.params.idsach, (err, data)=>{
        if(err)
          return  res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers."
            });
        return res.send(data)
    })
}

