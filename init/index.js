// init/index.js

const mongoose = require('mongoose');
const initData = require('../init/data'); 
const Listing = require('../models/listing');

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error:', err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
    
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner:"689ee39180202718c083099b"
    }));

    await Listing.insertMany(initData.data);
    console.log("Database initialized");
};


initDB();
