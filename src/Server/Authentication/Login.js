import axios from 'axios';

const authUser = async (credentials) => {
  const { username, password } = credentials; 

  if (!username || !password) {
    console.error('Username and password are required');
    return false;
  }

  try {
    const response = await axios.get('http://localhost:3000/user');
    const users = response.data;

    const authenticatedUser = users.find(
      (user) => user.username === username && user.password === password 
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

export default authUser;
