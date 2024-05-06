const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('DB connected'))
.catch((error)=>console.log(error))