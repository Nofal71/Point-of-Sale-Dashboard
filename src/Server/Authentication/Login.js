import axios from 'axios';
import { makeRequest } from '../api/instance';

export const authUser = async (email, password) => {

  try {
    const users = await makeRequest('GET', '/user')
    const authenticatedUser = users?.find(
      (user) => user.email === email && user.password === password
    );

    if (authenticatedUser) {
      console.log('User authenticated successfully');
      return true;
    } else {
      console.error('Invalid credentials');
      return false;
    }
  } catch (error) {
    console.error('Error fetching users:', error);
    return false;
  }
};


export const getUserDetials = async (email) => {
  try {
    const users = await makeRequest('GET', '/user')
    const userData = users.find(user => user.email === email);
    return userData || null;
  } catch (error) {
    console.error('Error in fetching data:', error);
    return null;
  }
};

