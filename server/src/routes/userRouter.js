const {Router} = require("express");
const { register, emailVerify, checkPassword } = require("../controller/registerUser");
const userDetails = require("../controller/userDetails");
const logout = require("../controller/logout");
const updateUserDetail = require("../controller/updateUserDetail");

const userRouter = Router();

// create user api
userRouter.post('/register', register);
// check user email
userRouter.post('/email', emailVerify);
// check user password
userRouter.post('/password', checkPassword);
// login user details
userRouter.get('/user-details', userDetails);
// logout user
userRouter.get('/logout', logout);
// update user details
userRouter.post('/update-user', updateUserDetail);


module.exports = userRouter;