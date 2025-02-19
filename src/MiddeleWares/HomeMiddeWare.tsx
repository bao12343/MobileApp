import React from "react";
import { ProductListParams, FetchProductsParam } from "../TypesCheck/HomeProps";
import axios from "axios"

interface ICatProps{
    setGetCategory: React.Dispatch<React.SetStateAction<ProductListParams[]>>
}

export const fetchCategories = async ({ setGetCategory }: ICatProps) => {
    try{
        const Response = await axios.get("http://10.106.21.185:8888/category/");
        console.log("API Response:", Response.data);

        if( Array.isArray( Response.data)) {
            const fixedData = Response.data.map(item => ({
                ...item,
                images: item.images.map((img: string) =>
                    img.replace("http://localhost", "http://10.106.21.185")
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