import Institutes from "../models/Institute.js"
import { Category } from "../models/categoryModel.js"
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    // Configure your email transport options here, such as SMTP or SendGrid
    // Example SMTP configuration:
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'mepe.leos@gmail.com',
        // pass: 'mepeleos11',
        pass: 'ruls jjcj roya weub',
    },
    tls: {
        rejectUnauthorized: false // Disable certificate verification
    }
});

const instituteCtrl = {
    async sendEmail(req, res, next) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        try {
            const { link, email, id, to, subject, text } = req.body; // Assuming these details are provided in the request body

            const emailText = `${text}\n\nFrom Email: ${email}\nInstitution ID: ${id}\nLink: ${link}`;
            // Send email
            await transporter.sendMail({
                from: 'mepe.leos@gmail.com', // Sender email address
                to,
                subject,
                text: emailText,
            });

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Error sending email:', error);
            next({ stack: error });
        }
    }
    ,
    async getInstitutesCount(req, res, next) {
        try {
            const count = await Institutes.countDocuments();
            res.status(200).json({ count });
        } catch (error) {
            next({ stack: error });
        }

    },
    async getInstitutes({ query, body, payload }, res, next) {
        const { limit, offset } = query
        try {
            let institutes = []
            if (limit) {
                institutes = await Institutes.find({}).limit(limit).skip(offset || 0)
            }
            else {
                institutes = await Institutes.find({})
                return res.status(200).json(reviews)
            }
            return res.status(200).json({
                institutes,
                next: process.env.SERVER_URL + `Institutes/getInstitutes/?limit=${limit}&offset=${parseInt(limit) + (parseInt(offset) || 0)}`
            })
        } catch (error) {
            next({ stack: error, message: "faild to get" })
        }
    },
    async getInstituteById({ query }, res, next) {
        try {

            const institute = await Institutes.findById(query.id);

            if (!institute) {
                return res.status(404).json({ message: "Institute not found" });
            }

            res.status(200).json(institute);
        } catch (error) {
            next({ stack: error });
        }
    },
    async addRating({ query, payload, body }, res, next) {
        try {
            const existingRating = await Institutes.findOne({
                '_id': query.institutId,
                'Rating.userId': payload._id,
            }).select("Rating avgRating");

            if (existingRating) {
                return res.status(400).json({ msg: "User has already added a rating" });
            }

            const newRating = {
                userId: payload._id,
                ...body,
            };
            if (!newRating.count || typeof newRating.count !== 'number' || isNaN(newRating.count)) {
                newRating.count = 0; // Set count to 0 if it's not provided or not a valid number
            }

            const result = await Institutes.updateOne(
                { _id: query.institutId },
                {
                    $push: { Rating: newRating },
                    $inc: {
                        'avgRating.count': 1,
                        'avgRating.sum': newRating.count,
                    },
                }
            );

            // Check if the update was successful
            if (result && result.nModified > 0) {
                // Update the average rating
                const updatedInstitute = await Institutes.findById(query.institutId);

                if (updatedInstitute) {
                    const newAverageRating =
                        updatedInstitute.avgRating.count > 0
                            ? updatedInstitute.avgRating.sum / updatedInstitute.avgRating.count
                            : 0;

                    await Institutes.updateOne(
                        { _id: query.institutId },
                        { $set: { "avgRating.averageRating": newAverageRating } }
                    );

                    return res.status(201).json({ msg: "Rating added successfully" });
                }
            }

            return res.status(400).json({ msg: "Failed to add rating" });
        } catch (error) {
            console.error("Error adding rating:", error);
            next({ stack: error });
        }
    },
    async updateRating({ query, body, payload }, res, next) {

        try {
            const existingRating = await Institutes.findOne({
                '_id': query.institutId,
                'Rating.userId': payload._id
            }).select("Rating avgRating")

            const sumRating = existingRating.avgRating.sum;
            existingRating.avgRating.sum -= sumRating;
            existingRating.avgRating.sum += body.count;
            for (const rating of existingRating.Rating) {
                if (rating.userId == payload._id) {
                    rating.count = body.count
                    break;
                }
            }
            await existingRating.save()
            return res.status(200).send("rating updated succsess")
        }
        catch (error) {
            next({ stack: error })
        }
    },
    async deleteRating({ query, body, payload }, res, next) {
        try {
            const userId = payload._id;
            const reviewId = query.reviewId;
            const institutId = body.institutId;
            const existingReview = await Reviews.findOne({ _id: reviewId, userId });

            if (!existingReview) {
                return res.status(404).json({ msg: "Review not found" });
            }

            if (existingReview.Rating && existingReview.Rating.length > 0) {
                await deleteRating({ query: { institutId, commentId: reviewId }, payload }, res, next);
            }

            const { deletedCount } = await Reviews.deleteOne({ _id: reviewId, userId });

            if (deletedCount) {
                const existingRating = await Institutes.findOne({
                    '_id': institutId,
                    'Rating.userId': userId
                }).select("Rating avgRating");

                const result = await Institutes.updateOne(
                    { _id: institutId },
                    {
                        $pull: {
                            Rating: { userId },
                        },
                        $inc: {
                            'avgRating.count': -1,
                            'avgRating.sum': -existingReview.count,
                        },
                    }
                );

                if (result.ok === 1) {
                    res.status(200).json({ msg: "Deleted successfully" });
                } else {
                    res.status(500).json({ msg: "Failed to update Institutes collection" });
                }
            } else {
                res.status(404).json({ msg: "Review not found" });
            }
        } catch (error) {
            next({ stack: error });
        }
    }, async searchByCategory({ query, body, payload }, res, next) {
        try {

            const { limit, offset, search, category } = query;
            let institutes = [];
            const searchValue = new RegExp(search, 'i');
            let categoryFilter = {};

            if (category) {
                // If a category is provided, include it in the filter
                categoryFilter = { Type_Descr: category };
            }

            let searchConditions = {
                ...categoryFilter,
                $or: [
                    { Name: searchValue },
                    { Head_Department: searchValue },
                    { Region_Descr: searchValue },
                    { City_Name: searchValue }
                ]
            };

            if (limit) {
                institutes = await Institutes.find(searchConditions).limit(limit).skip(offset || 0);
            } else {
                institutes = await Institutes.find(searchConditions);
                return res.status(200).json(institutes);
            }

            return res.status(200).json({
                institutes,
                next: process.env.SERVER_URL + `/Institutes/search/?limit=${limit}&offset=${parseInt(limit) + (parseInt(offset) || 0)}&search=${search}&category=${category}`,
            });

        } catch (error) {
            next({ stack: error });
        }
    },

    async search({ query, body, payload }, res, next) {
        try {
            const { limit, offset } = query
            let institutes = [];
            const searchValue = new RegExp(query.search, 'i')

            if (limit) {
                institutes = await Institutes.find({
                    $or: [
                        { Name: searchValue },
                        { Type_Descr: searchValue },
                        { Head_Department: searchValue },
                        { Region_Descr: searchValue },
                        { City_Name: searchValue }
                    ]
                }).limit(limit).skip(offset || 0)
            }
            else {
                institutes = await Institutes.find({
                    $or: [
                        { Name: searchValue },
                        { Type_Descr: searchValue },
                        { Head_Department: searchValue },
                        { Region_Descr: searchValue },
                        { City_Name: searchValue }
                    ]
                })

                return res.status(200).json(institutes)
            }
            return res.status(200).json({
                institutes,
                next: process.env.SERVER_URL + `Institutes/search/?limit=${limit}&offset=${parseInt(limit) + (parseInt(offset) || 0)}&search=${query.search}`
            })

        } catch (error) {
            next({ stack: error })
        }
    },
    async getCategories(req, res, next) {
        try {
            const resp = await Category.find({})
            res.status(200).json(resp)
        } catch (error) {
            next({ stack: error })
        }
    },
    async getByCategories({ query }, res, next) {
        const { limit, offset, category } = query
        let institutes = [];
        try {
            if (limit) {
                institutes = await Institutes.find({ Type_Descr: category }).limit(limit).skip(offset || 0)
            }

            else {
                institutes = await Institutes.find({ Type_Descr: category })
                return res.status(200).json(institutes)
            }
            res.status(200).json({
                next: process.env.SERVER_URL + `Institutes/getByCategory/?limit=${limit}&offset=${parseInt(limit) + (parseInt(offset) || 0)}&category=${query.category}`,
                institutes
            })

        } catch (error) {
            next({ stack: error })
        }
    }
}


export default instituteCtrl