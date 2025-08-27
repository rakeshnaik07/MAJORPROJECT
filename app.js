if(process.env.NODE_ENV != "production")
require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose'); 
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require("express-session")
const MongoStore = require('connect-mongo')
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")

const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");




const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true })); // to parse form data
app.use(express.static(path.join(__dirname, 'public'))); // to serve static files
app.use(methodOverride('_method')); // to support PUT and DELETE methods in forms
app.engine('ejs', ejsMate); // to use ejs-mate for layout support
app.use(express.static("public"));
app.use(bodyParser.json());


const dbUrl = process.env.ATLASDB_URL


main().then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

async function main(){
    await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
    mongoUrl : dbUrl,
    crypto: {
        secret : process.env.SECRET,
    },
    touchAfter: 24 * 3600,
})

store.on('error', (err)=> {
    console.log("Error in Mongo session", err);
})

const sessionOptions = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000
    }

}

app.use(express.json());


app.use(session(sessionOptions))
app.use(flash())


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");  
    res.locals.currUser = req.user;
    next();
})


app.get("/demouser", async (req, res) => {
    let fakeUser = new User({
        email : "student@gmail.com",
        username : "rakesh_naik"
    });
    let registeredUser =  await User.register(fakeUser, "helloworld");
    res.send(registeredUser)
})
// const reservationRoutes = require("./routes/listing.js");
// app.use("/reservations", reservationRoutes);

const accountRoutes = require("./routes/account");
const { options } = require('joi');
app.use("/account", accountRoutes);


app.use("/", userRouter);  // Now signup will be at /users/signup
app.use("/listings", listingRouter)
app.use("/listings/:id/reviews", reviewRouter)

const Listing = require("./models/listing"); // adjust path if needed

// Home / Landing page
app.get("/", async (req, res) => {
  try {
    // fetch latest 4 listings (you can change limit)
    const allListings = await Listing.find({}).limit(4);

    res.render("home", { allListings });
  } catch (err) {
    console.error("Error loading home listings:", err);
    req.flash("error", "Could not load home page.");
    res.redirect("/listings");
  }
});


app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.render("error.ejs",{message})
});




const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
