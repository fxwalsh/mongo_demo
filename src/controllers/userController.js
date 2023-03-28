import userService from "../services/userService";

export default (dependencies) => {

    const createUser = async (request, response, next) => {
        // Input
        const { name, email, password, dob, type } = request.body;
        // Treatment
        const user = await userService.registerUser(name, email, password, dob, type, dependencies);
        //output
        response.status(201).json(user)
    };
    const listUsers = async (request, response, next) => {
        // Treatment
        const users = await userService.find(dependencies);
        //output
        response.status(200).json(users);
    };

    return {
        createUser,
        listUsers
    };
};