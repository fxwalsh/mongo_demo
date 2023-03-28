export default (dependencies) => {

    const { userSchema } = dependencies;

    const validateUser = async (request, response, next) => {
        // Input
        try {
            const validated = await userSchema.validateAsync(request.body);
            request.body = validated;
            next();
        } catch (err) {
 
            next(new Error(`Invalid Data ${err.message}`));
        }
    };

    return {
        validateUser
    };
};