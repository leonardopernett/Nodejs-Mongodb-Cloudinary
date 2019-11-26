const controller = {}
const cloudinary = require('cloudinary')
const fs = require('fs-extra')
const Foto = require('../models/foto.js')


cloudinary.config({

    cloud_name:'bylekong',
    api_key: '861497675852228',
    api_secret:'iajh04Ox-ECNbw1U2DBGzPSZmks'
})

controller.index = async (req,res,next)=>{
    
    const foto = await Foto.find()
    res.render('image',{image:foto})

}

controller.create = async(req,res,next)=>{
    const foto = await Foto.find()
    res.render('imageForm',{image:foto})

}

controller.store = async (req,res,next)=>{
  const result = await cloudinary.v2.uploader.upload(req.file.path)
  const foto = new Foto;

    foto.title = req.body.title
    foto.description = req.body.description
    foto.imageUrl = result.url
    foto.public_id =result.public_id

    await foto.save()
    await fs.unlink(req.file.path)

    res.redirect('/')
}

controller.delete = async(req,res,next)=> {

    const id    = req.params.id
       const image  = await Foto.findByIdAndRemove(id)
       const result = await  cloudinary.v2.uploader.destroy(image.public_id)
       res.redirect('/image/add')
}

module.exports = controller;