'use client'

import Header from "@/app/components/headercomponent/Header";
import CategoryComponent from "@/app/subcategorycomponent/categorycomponent";
import {useParams} from "next/navigation";
import { useEffect, useState } from "react";
import { postDATA } from "@/app/fetchservices/FetchnodeServices";
import ServiceCard from "@/app/subcategorycomponent/ServiceCard";

export default function subcategory(){
    const params=useParams()
    const {id}=params
    const [subcategory,setSubcategory]=useState([])
    const [pricing,setPricing]=useState([])

    const fetchsubcategory=async()=>{
         try {
    const res = await postDATA(
      "userinterface/fetch_all_subcategory_by_categoryid",
      { categoryid: id }
    );

    console.log("page",res);

    if (res) {
      setSubcategory(res.data);
    }
  }
  catch(err) {
    console.log(err);
  }
    }

    console.count("Subcategory Page Render");

    useEffect(()=>{
        fetchsubcategory()
    },[])

    return(<div style={{width:"100%",fontFamily:"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Oxygen-Sans, Ubuntu, Cantarell, Helvetica, Arial, sans-serif"}}>
        <Header />

        <div style={{paddingTop:"150px",maxWidth:"100%",display:"flex",justifyContent:"center"}}>
            <CategoryComponent data={subcategory} pricing={pricing} setPricing={setPricing} />
           
        </div>
    </div>)
}