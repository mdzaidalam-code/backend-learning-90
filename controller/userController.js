const { JsonWebTokenError } = require('jsonwebtoken');
const asyncHandler = require('../middleware/asyncHandler')
const User = require('../models/User')


exports.getUsers = asyncHandler(
    async(req,res,next) => {
        const {role} = req.query;
        let query ={};

        if(role){
            query.role = role.toLowerCase();
        }

        const users = await User.find(query);

        res.status(200).json({Success : true, count:users.length, data:users })
    })

exports.getUserById =asyncHandler(
    async (req,res,next) =>{
    
        const user = await User.findById(req.params.id);
        

        if (!user) {
            const error = new Error(`User not Found with user ID of ${req.params.id}`)
            error.statusCode = 404;
            return next(error);
        }
        res.status(200).json({Success: true, data: user} )
    })

exports.createUser = asyncHandler(async(req,res,next) =>{
        const newUser = await User.create(req.body);


        res.status(201).json({
            Success : true, data:newUser
        })
    })


exports.updateUser = asyncHandler(async(req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.params.id,req.body,
    {
        new : true,
        runValidators : true
    })

    if (!user) {
            const error = new Error(`User not Found with user ID of ${req.params.id}`)
            error.statusCode = 404;
            return next(error);
        }

    res.status(200).json({ success: true, data: user });

})

exports.deleteUser = asyncHandler(async(req,res,next)=>{
    const user = await User.findByIdAndDelete(req.params.id)

    if(!user){
        const error = new Error(`User not found with user ID of${req.params.id}`)
        error.statusCode = 404;
            return next(error);
    }
    
    res.status(200).json({ success: true, data: {} });
})

const generateToken = (id) => {
    const jwt = require('jsonwebtoken');
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRE})
}

exports.loginUser = asyncHandler(async(req,res,next) => {
    const {email,password} = req.body

    if(!email || !password){
        const error = new Error('Please provide email and password')
        error.statuscode = 400
        throw error
    }

    const user = await User.findOne({email}).select('+password')

    if(!user){
        const error = new Error('Invalid Credentials')
        error.statuscode = 401
        throw error
    }

    const ismatch = await bcrypt.compare(password,user.password);

    if(!ismatch){
        const error = new Error('Invalid Credentials')
        error.statuscode = 401
        throw error
    }

    const token = generateToken(user._id);

    res.status(200).json({
        Success : true,
        token
    })
})