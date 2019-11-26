const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path   = require('path');
const exphbs    = require('express-handlebars') 
const uuid   =    require('uuid/v4')
const app = express();




//mongoose 
require('./database.js')

//setting
app.set('views', path.join(__dirname,'views'))
app.set('port', process.env.PORT || 3000)
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:  path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'
}))
app.set('view engine', '.hbs' )


//middleware 
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


//multer
const storage = multer.diskStorage({
    destination: path.join(__dirname,'/public/upload'),
   
    filename: function(req, file , cb){
        cb(null, uuid()+path.extname(file.originalname))
    }
})
app.use(multer({storage:storage}).single('image'))


//route
app.use(require('./routes/index.js'))


//static
app.use(express.static(path.join(__dirname, 'public')))



module.exports = app