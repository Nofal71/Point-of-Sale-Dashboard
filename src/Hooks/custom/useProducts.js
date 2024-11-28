import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useCommon } from "../common/useCommon";
import { makeRequest } from "../../Server/api/instance";

export const useProducts = () => {
  const [products, setProducts] = useState(null);
  const { setAlert, setConfirm, setLoader } = useCommon();
  const [sort, setSorting] = useState("");
  const [saveProducts, setSave] = useState(null);
  const [input, saveInput] = useState(null);
  const [isPending, startTransition] = useTransition();
  const debounceTimeout = useRef(null); 

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
    }
  };

  const searchProducts = (e) => {
    const inputValue = e.target.value.toLowerCase();

    if (inputValue === "") {
      setProducts(saveProducts);
      saveInput("");
      return;
    }

    clearTimeout(debounceTimeout.current); 

    debounceTimeout.current = setTimeout(() => {
      startTransition(() => {
        searchData(inputValue).then((filteredData) => {
          setProducts(filteredData);
          saveInput(inputValue);
        });
      });
    }, 500); 
  };

  const loadProducts = useCallback(async (update) => {
    setSorting("");
    !update && setLoader(true);
    try {
      const data = await makeRequest("GET", "/products");
      startTransition(() => {
        setSave(data);
        setProducts(data);
      });
    } catch (error) {
      console.log(error, "Error in Fetching Data");
      setAlert("Data Load failed", "error");
    } finally {
      setLoader(false);
    }
  }, [setProducts]);

  const deleteProduct = useCallback(
    (productId) => {
      setConfirm("Are You Sure To Delete This Product ?", async () => {
        try {
          await makeRequest("DELETE", `products/${productId}`);
          setAlert("Product Deleted", "info");
          loadProducts(true);
        } catch (error) {
          setAlert("Unknown Error Please Check Your Internet Connection", "error");
          console.log(error, "Error in Deleting Product");
        }
      });
    },
    [setProducts]
  );

  useEffect(() => {
    loadProducts();
    const cachedInput = JSON.parse(localStorage.getItem("cached"));
    if (cachedInput) searchProducts({ target: { value: cachedInput } });
    localStorage.clear("cached");
  }, []);

  return {
    products,
    input,
    sort,
    handleSorting,
    searchData,
    searchProducts,
    loadProducts,
    deleteProduct,
    isPending, 
  };
};
