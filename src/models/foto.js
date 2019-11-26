const {Schema, model} = require('mongoose')



const Foto = new Schema({

    title:{type:String},
    description:{type:String},
    imageUrl:{type:String},
    public_id:{type:String}

})

module.exports = model('Foto',Foto)



