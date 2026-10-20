const Post = require('../models/Post');
const User = require('../models/User')
const asyncHandler = require('../middleware/asyncHandler')

exports.getPosts = asyncHandler(async(req,res,next) => {
    const posts = await Post.find().populate({
        path : 'user',
        select : 'name role'
    })

    res.status(200).json({
        Success : true,
        count : posts.length,
        data : posts
    })
})

exports.createPost = asyncHandler(async(req,res,next) => {
    const {title, content, userId} = req.body

    const user = await User.findById(userId)

    if(!user){
        const error = new Error(`User not found with id Of ${userId}`)

        error.statusCode = 404;
        throw error;
    }

    const post = await Post.create({
        title,content,user:userId
    })

    res.status(201).json({
        Success : true,
        data : post
    })
})