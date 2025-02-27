import React from "react";
import {
    ProductListParams,
    FetchProductsParams,
  } from "../TypesCheck/HomeProps";
import axios from "axios"

interface ICatProps{
    setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}
interface IProdByCatProps {
    catID: string;
    setGetProductsByCatID: React.Dispatch<
      React.SetStateAction<ProductListParams[]>
    >;
  }

  interface ITrendingProductProps {
    setTrendingProduct: React.Dispatch<React.SetStateAction<ProductListParams[]>>
  }
  
export const fetchCategories = async ({ setGetCategory }: ICatProps) => {
    try{
        const Response = await axios.get("http://192.168.1.8:8888/category/getAllCategories");
        // console.log("API Response:", Response.data);

        if( Array.isArray( Response.data)) {
            const fixedData = Response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) =>
                    img.replace("http://localhost", "http://192.168.1.8")
            )
            }));

            setGetCategory(fixedData);
        }else {
            console.warn("fetchCategories: Du lieu API khong phai la mang", Response.data);
            setGetCategory([]);
        }

    }catch (error) {
        console.log("axios get error", error);
        setGetCategory([]);
    }
};

export const fetchProductsByCatID = async ({
    setGetProductsByCatID,
    catID,
  }: IProdByCatProps) => {
    try {
      const response: FetchProductsParams = await axios.get(
        `http://192.168.1.8:8888/product/getProductByCatID/${catID}`
      );
      // console.log("API Response:", response.data);
  
      if (Array.isArray(response.data)) {
        const fixedData = response.data.map((item) => ({
          ...item,
          images: item.images.map((img: string) =>
            img.replace("http://localhost", "http://192.168.1.8")
          ),
        }));
  
        setGetProductsByCatID(fixedData);
      } else {
        console.warn("fetchProductsByCatID: Dữ liệu API không phải là mảng", response.data);
        setGetProductsByCatID([]);
      }
    } catch (error) {
      console.log("axios get error", error);
      setGetProductsByCatID([]);
    }
  };

  export const fetchTrendingProducts = async ({setTrendingProduct }:ITrendingProductProps) => {
    try {
      const response: FetchProductsParams = await axios.get(`http://192.168.1.8:8888/product/getTrendingProduct`);
      console.log("API Response:", response.data);
  
      if (Array.isArray(response.data)) {
        const fixedData = response.data.map((item) => ({
          ...item,
          images: item.images.map((img: string) =>
            img.replace("http://localhost", "http://192.168.1.8")
          ),
        }));
  
        setTrendingProduct(fixedData);
      } else {
        console.warn("fetchProductsByCatID: Dữ liệu API không phải là mảng", response.data);
        setTrendingProduct([]);
      }
    } catch (error) {
      console.log("axios get error", error);
      setTrendingProduct([]);
    }
  };

