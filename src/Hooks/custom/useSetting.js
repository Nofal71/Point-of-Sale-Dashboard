import { useState, useRef, useEffect } from 'react';
import { useCommon } from '../common/useCommon';
import { makeRequest } from '../../Server/api/instance';
import { useUser } from './useUser';

export const useSettings = () => {
  const [categories, setCategories] = useState([]);
  const { setLoader, setAlert, setConfirm } = useCommon();
  const { setLogo, logo, setName, companyName } = useUser();


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

  const handleAddCategory = async (category) => {
    if (!category) {
      setAlert('Please Fill Category First', 'error');
      return;
    }
    try {
      setLoader(true);
      await makeRequest('POST', '/categories', { name: category });
      setAlert('Category added successfully', 'success');
      getCategory();
    } catch (error) {
      setAlert('Failed to add category', 'error');
    } finally {
      setLoader(false);
    }
  };

  const handleProfileImage = async (e) => {
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
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleAdminSiteName = async (name) => {
    try {
      await makeRequest('PATCH', '/assets/adminSiteName', { data: name });
      setName(name);
    } catch (error) {
      setAlert('Failed to save Company Name', 'error');
    } finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return {
    categories,
    logo,
    companyName,
    handleAdminSiteName,
    handleDeleteCategory,
    handleAddCategory,
    handleProfileImage,
  };
};
