import axios from 'axios';
import { globalApi } from './api';

// Base URL for your users API
const baseURL = globalApi;

// Create an Axios instance
export const instance = axios.create({
    baseURL: baseURL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const makeRequest = async (type, path = '', body = null, options = {}) => {
    try {
        const config = {
            timeout: 30000,
            ...options,
        };

        let response;

        switch (type.toUpperCase()) {
            case 'GET':
                response = await instance.get(path, config);
                break;
            case 'POST':
                response = await instance.post(path, body, config);
                break;
            case 'PUT':
                response = await instance.put(path, body, config);
                break;
            case 'PATCH':
                response = await instance.patch(path, body, config);
                break;
            case 'DELETE':
                response = await instance.delete(path, config);
                break;
            default:
                throw new Error('Unsupported request type');
        }

        // return new Promise((resolve) => {
        //     setTimeout(() => {
        //       resolve(response.data);
        //     }, 2000);
        //   });

        return response.data
    } catch (error) {
        console.error('Error making request:', error);
        if (error.response?.status === 401) {
            console.error('Unauthorized request. Please log in.');
        }
        throw error;  // Re-throw error so you can handle it in your components
    }
};
