import { makeRequest } from "../api/instance";

export const registerUser = async (userDetails) => {
    try {
        const users = await makeRequest('POST', '/user', userDetails)
        return users.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Registration failed. Please try again.');
    }
};
