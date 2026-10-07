const errorHandler = (err,req,res,next) =>{
    console.error(`Error Stack : ${err.stack}`)

    const statusCode = err.statusCode;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        Success : false,
        error : message,
        satck : process.env.NODE_ENV==='development' ? err.satck : 'NULL'
    })
}

module.exports = errorHandler;