const asyncHandler = require('../middleware/asyncHandler')

let users =[
    {id:1, name : 'Zaid', role : 'developer'},
    {id:2, name : 'Sara', role : 'designer'}
]

const DBQuery = (data , delay = 500) =>{
    return new Promise((resolve) => {
        setTimeout(() => resolve(data),delay)
    })
}

exports.getUsers = asyncHandler(
    async(req,res,next) => {
        const {role} = req.query;

        const dbUsers = await DBQuery(users);

        if(role){
            const filtered = dbUsers.filter((u) => u.role === role.toLowerCase())
            return res.status(200).json({ SUccess : true, count : filtered.length, data : filtered});
        }
        res.status(200).json({Success : true, count:users.length, data:users })
    })

exports.getUserById =asyncHandler(
    async (req,res,next) =>{
    
        const userId = parseInt(req.params.id,10);
        const dbUsers = await DBQuery(users);
        const user = dbUsers.find((u) => u.id === userId);

        if (!user) {
            const error = new Error(`User not Found with user ID of ${userId}`)
            error.statusCode = 400;
            throw error
        }
        res.status(200).json({Success: true, data: user} )
    })

exports.createUser = asyncHandler(async(req,res,next) =>{
        const {name, role} = req.body;


        if(!name || !role){
            const error = new Error('plz provide both name and role');
            error.statusCode = 400;
            throw error
        }
        const newUser = {
            id: users.length+1,
            name,
            role : role.toLowerCase()
        }
        
        await DBQuery(newUser);
        users.push(newUser)

        res.status(201).json({
            Success : true, data:newUser
        })
    })