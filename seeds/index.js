const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const url = 'mongodb://localhost:27017';
const Campground = require('../models/campground');

mongoose.connect(`${url}/yelp-camp`, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
 });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60b21cc52c528fe44eddb8c3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: "https://source.unsplash.com/collection/483251",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum impedit libero et voluptates animi consequatur placeat dolore repellendus, rerum aperiam veritatis rem quisquam modi, voluptas illum eveniet. Iusto, nostrum. Neque.",
            price
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
