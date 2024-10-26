import { useState, useRef, useEffect } from 'react';
import { useCommon } from '../common/useCommon';
import { makeRequest } from '../../Server/api/instance';
import { useUser } from './useUser';

export const useSettings = () => {
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const imageRef = useRef();
  const { setLoader, setAlert, setConfirm } = useCommon();
  const { setLogo } = useUser();

  const handleChange = (e) => setFile(e.target.files[0]);

  const getCategory = async () => {
    try {
      const cat = await makeRequest('GET', '/categories');
      setCategories(cat);
    } catch (error) {
      setAlert('Failed to load Categories', 'error');
    }
  };

  const handleDeleteCategory = (categoryId) => {
    const deleteCategory = async () => {
      try {
        await makeRequest('DELETE', `/categories/${categoryId}`);
        setAlert('Category Deleted', 'info');
        getCategory();
      } catch (error) {
        setAlert('Error deleting category', 'error');
      }
    };
    setConfirm('Are You Sure To Delete This Category?', deleteCategory);
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      setAlert('Please Add Category First', 'error');
      return;
    }
    try {
      setLoader(true);
      await makeRequest('POST', '/categories', { name: newCategory });
      setNewCategory('');
      setAlert('Category added successfully', 'success');
      getCategory();
    } catch (error) {
      setAlert('Failed to add category', 'error');
    } finally {
      setLoader(false);
    }
  };

  const handleProfileImage = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      setLoader(true);

      try {
        await makeRequest('PATCH', '/assets/48c4', { imgData: base64String });
        setLogo(base64String);
      } catch (error) {
        setAlert('Failed to save image', 'error');
      } finally {
        setLoader(false);
        setFile(null);
        imageRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return {
    file,
    categories,
    newCategory,
    setNewCategory,
    imageRef,
    handleChange,
    handleDeleteCategory,
    handleAddCategory,
    handleProfileImage,
  };
};
