"use client"
import { ServerURL } from '@/app/fetchservices/FetchnodeServices'
import CategoryComponent from './CategoryComponent'
import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react'
import {getDATA} from '@/app/fetchservices/FetchnodeServices'

export default function Homepageimage(){
      const [Category,setCategory]=useState([])

      useEffect(()=>{
        fetchcategory()
      },[])

      const fetchcategory = async()=>{
        var result = await getDATA("userinterface/fetch_all_category");
        console.log("result",result.data)
        setCategory(result.data)
      }
    
    const categories = [
  {
    name: "Hotels",
    image: "resturant.svg",
  },
  {
    name: "Restaurants",
    image: "resturant.svg",
  },
  {
    name: "Spa",
    image: "resturant.svg",
  },
   {
    name: "Hotels",
    image: "resturant.svg",
  },
  {
    name: "Restaurants",
    image: "resturant.svg",
  },
  {
    name: "Spa",
    image: "resturant.svg",
  },
   {
    name: "Hotels",
    image: "resturant.svg",
  },
  {
    name: "Restaurants",
    image: "resturant.svg",
  },
  {
    name: "Spa",
    image: "resturant.svg",
  },
   {
    name: "Hotels",
    image: "resturant.svg",
  },
  {
    name: "Restaurants",
    image: "resturant.svg",
  },
  {
    name: "Spa",
    image: "resturant.svg",
  },
   {
    name: "Hotels",
    image: "resturant.svg",
  },
  {
    name: "Restaurants",
    image: "resturant.svg",
  },
  {
    name: "Spa",
    image: "resturant.svg",
  },
];


    return(
            <div style={{width:"100%",display:"flex",justifyContent:"center"}} >
            <div style={{display:"flex",width:"85%",gap:"70px",justifyContent:"flex-start"}}>
               <div style={{width:"40%",marginLeft:"50px"}}>
                <Grid size={6}>
                <div style={{display:"flex",justifyContent:"center"}} >
                    <CategoryComponent Category={Category} />
                </div>
               </Grid>
                </div>
             <div style={{width:"40%",marginLeft:"30px"}} >
                <Grid size={6}>
                <img src={`${ServerURL}/images/homepageimage.jpg`} style={{height:"600px",width:"600px",borderRadius:"10px"}}/>
             </Grid>
             </div>
            </div>
       </div>
    )
}