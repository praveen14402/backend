
//  different ways to write  production grade
const asyncHandler = (fn) => async (req, res, next) =>{
      (req, res, next) =>{
        Promise.resolve(fn(req, res, next)).catch((error) => next(error));
      }
}
export default asyncHandler










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