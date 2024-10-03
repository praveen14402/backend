
//  different ways to write  production grade
const asyncHandler = (requestHandler) => {
      return  (req, res, next) =>{
        Promise.resolve(requestHandler(req, res, next)).catch((error) => next(error));
      }
    }
export  {asyncHandler}










// higer order function
// const asyncHandler = () =>{}
// const asyncHandler = () => ()=>{}
// const asyncHandler = (func) => async ()=>{}



// const asyncHandler = (fn) => async (req, res, next) =>{
//     try {
//         await fn(req, res, next)
//     }catch (error) {    
//         res.status(error.statusCode || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }