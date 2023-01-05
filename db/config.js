const mongoose = require('mongoose');


const dbConnection = async () => {

    mongoose.set("strictQuery", false); //Solucionar un deprecated message en consola. Ignorar

    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION, console.log('SUCCESS: Database connected.'));
    } catch (err) {
        console.log(err);
        throw new Error( 'DATABASE ERROR...' )
    }
}



module.exports = {
    dbConnection
}