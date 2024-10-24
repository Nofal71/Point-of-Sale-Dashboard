import axios from 'axios';

export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);  // Add the file

    formData.append('upload_preset', 'ml_default'); 

    try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dm2i7jwvo/image/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.secure_url;  // Return the secure URL for the uploaded image
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error.response.data);
        throw error;
    }
};
