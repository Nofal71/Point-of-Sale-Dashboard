import axios from 'axios';

export const authUser = async (email, password) => {

  try {
    const response = await axios.get('http://localhost:3000/user');
    const users = response.data;

    const authenticatedUser = users.find(
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
        const response = await axios.get('http://localhost:3000/user');
        const users = response.data;
        const userData = users.find(user => user.email === email);
        return userData || null; 
    } catch (error) {
        console.error('Error in fetching data:', error);
        return null; 
    }
};

