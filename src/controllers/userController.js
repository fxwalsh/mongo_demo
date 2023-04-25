import userService from "../services/userService";

export default (dependencies) => {

    const createUser = async (request, response, next) => {
        // Input
        try {
            const { name, email, password, dob, type } = request.body;
            // Treatment
            const user = await userService.registerUser(name, email, password, dob, type, dependencies);
            //output
            response.status(201).json(user)
        } catch (err) {
            next(err);
        }
    };
    const listUsers = async (request, response, next) => {
        // Treatment
        const users = await userService.find(dependencies);
        //output
        response.status(200).json(users);
    };
    const authenticateUser = async (request, response, next) => {
        try {
            const { email, password } = request.body;
            const token = await userService.authenticate(email, password, dependencies);
            response.status(200).json({ token: `BEARER ${token}` });
        } catch (error) {
            response.status(401).json({ message: 'Unauthorised' });
        }
    };
    const verifyToken = async (request, response, next) => {
        try {
            // Input
            const authHeader = request.headers.authorization;

            // Treatment
            const accessToken = authHeader.split(" ")[1];
            await userService.verify(accessToken, dependencies);
            //output
            next();
        } catch (err) {
            //Token Verification Failed
            next(new Error(`Verification Failed ${err.message}`));
        }
    };

    return {
        createUser,
        listUsers,
        authenticateUser,
        verifyToken
    };
};