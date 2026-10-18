import axios from 'axios'
const ServerURL= "http://localhost:5000";

const postDATA= async(URL,body)=>{
    try{
        var response=await axios.post(`${ServerURL}/${URL}`,body);
        var res = response.data;
        return res
    }
    catch(error){
        console.log("Full Error:", error);
    console.log("Error Response:", error?.response);
    console.log("Error Data:", error?.response?.data);
    console.log("Error Message:", error?.message);
    return null;
    }
    console.log(`${ServerURL}/${URL}`)
}

const getDATA= async(URL)=>{
    try{
        var response= await axios.get(`${ServerURL}/${URL}`);
        var res= response.data;
        return res
    }
    catch(error){
        console.log("Full Error:", error);
    console.log("Error Response:", error?.response);
    console.log("Error Data:", error?.response?.data);
    console.log("Error Message:", error?.message);
    return null;
    }
}

export {ServerURL,getDATA,postDATA}