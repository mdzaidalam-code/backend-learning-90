const errorHandler = (err,req,res,next) =>{
    console.error(`Error Stack : ${err.stack}`)

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        Success : false,
        error : message,
        stack : process.env.NODE_ENV==='development' ? err.stack : 'NULL'
    })
}

module.exports = errorHandler;