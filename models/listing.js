const mongoose = require('mongoose');
const Review = require('./reviews/reviews');
const Reservation = require('./reservation'); // ✅ Import Reservation model
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: { 
        url: String,
        filename: String
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    }
});

// ✅ Auto-cleanup reviews + reservations when listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        // Delete reviews linked to this listing
        await Review.deleteMany({ _id: { $in: listing.reviews } });

        // Delete reservations linked to this listing
        await Reservation.deleteMany({ listing: listing._id });

        console.log(`🧹 Cleaned reviews & reservations for listing ${listing._id}`);
    }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
