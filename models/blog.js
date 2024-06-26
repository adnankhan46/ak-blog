const {mongoose, Schema, Model, model} = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImageUrl: {
        type: String,
        required: false
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true});

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;