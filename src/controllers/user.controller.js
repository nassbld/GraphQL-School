import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

const ALLOWED_GENDERS = ['M', 'F'];

const validateUser = (input) => {
    if (!input.email || input.email === '') {
        throw new Error('email required');
    }
    if (!input.password || input.password === '') {
        throw new Error('password required');
    }
    if (!input.first_name || input.first_name === '') {
        throw new Error('first name required');
    }
    if (!input.last_name || input.last_name === '') {
        throw new Error('last name required');
    }
    if (!input.date_of_birth || input.date_of_birth === '') {
        throw new Error(`date of birth required`);
    }
}

export default {
    getUsers: () => userModel.getUsers(),
    getUserById: ({id}) => userModel.getUserById(id),
    getUserByEmail: ({email}) => userModel.getUserByEmail(email),
    createUser: async ({value}) => {
        validateUser(value)

        value.password = await bcrypt.hash(value.password, 5)

        await userModel.createUser(value)
    },
    updateUser: async ({id, value}) => {
        const user = await userModel.getUserById(id)
        const passwordUpdated = value.password !== undefined

        if (!user) {
            throw new Error(`User doesn't exist`)
        }

        const updatedUser = {...user, ...value}
        validateUser(updatedUser)

        if (passwordUpdated) {
            value.password = await bcrypt.hash(value.password, 5)
        }

        await userModel.updateUser(id, value)
    },
    deleteUser: async ({id}) => {
        const user = await userModel.getUserById(id)
        if (!user) {
            throw new Error(`User doesn't exist`)
        }
        await userModel.deleteUser(id)
    }
}