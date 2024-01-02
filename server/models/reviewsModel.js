import mongoose from "mongoose";

// Define the allowed options for ReligiousLevel
const religiousLevels = ['religious', 'secular', 'orthodox'];

// Create schema
const reviewsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    InstitutesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'institutes',
        required: true,
    },
    Collaboration: {
        comment: { type: String },
        rating: { type: Number, min: 1, max: 5 },
    },
    Maintenance: {
        comment: { type: String },
        rating: { type: Number, min: 1, max: 5 },
    },
    ReligiousLevel: {
        comment: { type: String },
        enum: religiousLevels,
    },
    AdjacentPsychiatrist: {
        comment: { type: String },
        response: { type: Boolean },
    },
    HostFamilyOption: {
        comment: { type: String },
        response: { type: Boolean },
    },
    StayOnSaturdaysAndHolidays: {
        comment: { type: String },
        response: { type: Boolean },
    },
    isBoardingSchool: {
        comment: { type: String },
        response: { type: Boolean },
    },
    emotionalResponse: {
        comment: { type: String },
        response: { type: Boolean },
        rating: { type: Number, min: 1, max: 5 },
    },
    afternoonClasses: {
        comment: { type: String },
        response: { type: Boolean },
        rating: { type: Number, min: 1, max: 5 },
    },
    averageRating: {
        type: Number,
        get: function () {
            const ratings = [
                { comment: this.Collaboration.comment, rating: this.Collaboration.rating },
                { comment: this.Maintenance.comment, rating: this.Maintenance.rating },
                { comment: this.ReligiousLevel.comment, rating: null },
                { comment: this.AdjacentPsychiatrist.comment, rating: null },
                { comment: this.HostFamilyOption.comment, rating: null },
                { comment: this.StayOnSaturdaysAndHolidays.comment, rating: null },
                { comment: this.isBoardingSchool.comment, rating: null },
                { comment: this.emotionalResponse.comment, rating: this.emotionalResponse.rating },
                { comment: this.afternoonClasses.comment, rating: this.afternoonClasses.rating }
            ];

            const validRatings = ratings.filter(({ rating }) => !isNaN(rating) && rating !== null);
            const total = validRatings.reduce((sum, { rating }) => sum + rating, 0);
            const average = total / validRatings.length || 0;

            return average;
        }
    }
}, { timestamps: true });

// create model (collection, schema)
export const Reviews = mongoose.model("reviews", reviewsSchema);
