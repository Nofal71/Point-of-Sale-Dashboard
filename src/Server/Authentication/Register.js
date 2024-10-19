import axios from "axios";

export const registerUser = async (userDetails) => {
    try {
        const response = await axios.post('http://localhost:3000/user', userDetails);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Registration failed. Please try again.');
    }
};
