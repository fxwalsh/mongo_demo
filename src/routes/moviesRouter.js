import express from 'express';
import userController from '../controllers/userController';

const createRouter = (dependencies) => {
    const router = express.Router();
    // load controller with dependencies

    const controller = userController(dependencies);
    router.route('/').all(controller.verifyToken);
    router.route('/')
        .get((req,res)=>{res.end("I should be a list of movies")});

    return router;
};
export default createRouter;