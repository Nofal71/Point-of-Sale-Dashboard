import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useCommon } from "../common/useCommon";
import { makeRequest } from "../../Server/api/instance";

export const useProducts = () => {
  const [products, setProducts] = useState(null);
  const { setAlert, setConfirm } = useCommon();
  const [sort, setSorting] = useState("");
  const [progress, setProgress] = useState(false);
  const [saveProducts, setSave] = useState(null);
  const [input, saveInput] = useState(null);
  const [isPending, startTransition] = useTransition(); // Adding useTransition

  const handleSorting = (e) => {
    setSorting(e.target.value);

    startTransition(() => {
      let sortedProducts = [...products];
      if (e.target.value === "LowPrice") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (e.target.value === "HighPrice") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (e.target.value === "Name") {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (e.target.value === "stock") {
        sortedProducts.sort(
          (a, b) => Number(a.inventory?.quantity) - Number(b.inventory?.quantity)
        );
      }
      setProducts(sortedProducts);
    });
  };

  const searchData = async (inputValue) => {
    try {
      setProgress(true);
      const search = await makeRequest("GET", "/products");
      const nameData = search?.filter(
        (e) =>
          e.name.toLowerCase().includes(inputValue) ||
          e.name.toLowerCase() === inputValue
      );
      const desData = search?.filter(
        (e) =>
          e.description.toLowerCase().includes(inputValue) ||
          e.description.toLowerCase() === inputValue
      );
      const filteredData = [...new Set([...nameData, ...desData])];
      return filteredData;
    } catch (error) {
      console.log(error, "error");
      return [];
    } finally {
      setProgress(false);
    }
  };

  const searchProducts = (e) => {
    const inputValue = JSON.parse(localStorage.getItem("cached"))
      ? JSON.parse(localStorage.getItem("cached"))
      : e.target.value.toLowerCase();
    if (inputValue === "") return setProducts(saveProducts);

    startTransition(() => {
      searchData(inputValue).then((filteredData) => {
        setProducts(filteredData);
        saveInput(inputValue);
      });
    });
  };

  const loadProducts = useCallback(async () => {
    setSorting("");
    try {
      startTransition(async () => {
        const data = await makeRequest("GET", "/products");
        setSave(data);
        setProducts(data);
      })
    } catch (error) {
      console.log(error, "Error in Fetching Data");
      setAlert("Data Load failed", "error");
    } finally {
    }
  }, [setProducts]);

  const deleteProduct = useCallback(
    (productId) => {
      setConfirm("Are You Sure To Delete This Product ?", async () => {
        try {
          await makeRequest("DELETE", `products/${productId}`);
          setAlert("Product Deleted", "info");
          loadProducts();
        } catch (error) {
          console.log(error, "Error in Deleting Product");
        } finally {
        }
      });
    },
    [setProducts]
  );

  useEffect(() => {
    loadProducts();
    JSON.parse(localStorage.getItem("cached")) &&
      searchProducts(JSON.parse(localStorage.getItem("cached")));
    localStorage.clear("cached");
  }, []);

  return {
    products,
    progress,
    input,
    sort,
    handleSorting,
    searchData,
    searchProducts,
    loadProducts,
    deleteProduct,
    isPending, // Expose isPending to manage UI states if needed
  };
};
