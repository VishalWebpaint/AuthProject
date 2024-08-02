import axios from "axios";
import getAuthHeaders from "./token";

 const login = async (data: any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, data);
    console.log(response.data, 'tttttttttttttttttttttt');
    return response.data;
};

export const signup = async (data: any) => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/signup`, data);
    console.log(response.data, 'ssssssssssssssss');
    return response.data;
};

export const email = async(data:any ) => {
    try{
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/mail`, data, {headers:await getAuthHeaders()})
    }catch(error:any){
        console.log(error.message)
    }
}

export const sendOtp = async (data:any) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/send`, data, { headers: await getAuthHeaders(), withCredentials:true });
    return response.data;
  } catch (error:any) {
    console.log(error.message);
  }
};

export default login;
