import mongoose from "mongoose";


const dbConnection = () => {
    // mongoose.connect("mongodb+srv://fathyamira689:amiraFGMongoAtlas159@cluster0.9yhzmr9.mongodb.net/ecommerce")// DB Link
   // mongodb+srv://fathyamira689:<db_password>@cluster0.lcr45o7.mongodb.net/
   // mongodb+srv://fathyamira689:amiraFGMongoAtlas159@cluster0.lcr45o7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0.lcr45o7.mongodb.net/Task1
   // mongoose.connect("mongodb+srv://backbenchersteam23:cZMciniOgAaEU45q@cluster0.q4aihf4.mongodb.net/ecommerce?retryWrites=true&w=majority")// DB Link
    mongoose.connect("mongodb+srv://fathyamira689:amiraFGMongoAtlas159@cluster0.lcr45o7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0.lcr45o7.mongodb.net/Task1")// DB Link

        .then(conn => {console.log(`Database connected on ${process.env.DB}`)
        
    })
        .catch(err => console.log(` Database Error ${err}`))
}

export default dbConnection