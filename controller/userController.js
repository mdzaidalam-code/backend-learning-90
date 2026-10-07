let users =[
    {id:1, name : 'Zaid', role : 'developer'},
    {id:2, name : 'Sara', role : 'designer'}
]

exports.getUsers = (req,res,next) => {
    try {
        const {role} = req.query;
        if(role){
            const filtered = users.filter((u) => u.role === role.toLowerCase())
            return res.status(200).json({ SUccess : true, count : filtered.length, data : filtered});
        }
        res.status(200).json({Success : true, count:users.length, data:users })
    }
    catch (err){
        next(err);
    }
}

exports.getUserById =(req,res,next) =>{
    try{
        const userId = parseInt(req.params.id,10);
        const user = users.find((u) => u.id === userId);

        if (!user) {
            const error = new Error(`User not Found with user ID of ${userId}`)
            error.statusCode = 400;
            return next(error);
        }
        res.status(200).json({Success: true, data: user} )
    }
    catch(err){
        next(err)
    }
}

exports.createUser = (req,res,next) =>{
    try{
        const {name, role} = req.body;

        if(!name || !role){
            const error = new Error('plz provide both name and role');
            error.statusCode = 400;
            return next(error)
        }
        const newUser = {
            id: users.length+1,
            name,
            role : role.toLowerCase()
        }
        
        users.push(newUser)

        res.status(201).json({
            Success : true, data:newUser
        })
    }
    catch(err){
        next(err)
    }
}