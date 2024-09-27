class ApiError extends Error {

    constructor(
        statusCode,
        message = "something error",
        error = [],
        statck = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.error = error
        this.statck = statck    
    if(stack){
        this.stack = statck
    }
    else{
        Error.captureStackTrace(this, this.constructor) 
    }
}
}


export {ApiError}