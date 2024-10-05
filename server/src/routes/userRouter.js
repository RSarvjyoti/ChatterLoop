const {Router} = require("express");
const { register, emailVerify, checkPassword } = require("../controller/registerUser");

const userRouter = Router();

userRouter.post('/register', register);
userRouter.post('/email', emailVerify);
userRouter.post('/password', checkPassword);


module.exports = userRouter;