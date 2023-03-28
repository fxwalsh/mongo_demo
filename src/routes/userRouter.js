import express from 'express';
import userController from '../controllers/userController';
import userValidationController from '../controllers/userValidationController';

const createRouter = (dependencies) => {
    const router = express.Router();
    // load controller with dependencies
    const controller = userController(dependencies);
    const validationController = userValidationController(dependencies);
    router.route('/')
        .post(validationController.validateUser,controller.createUser);

    router.route('/')
        .get(controller.listUsers);

    return router;
};
export default createRouter;