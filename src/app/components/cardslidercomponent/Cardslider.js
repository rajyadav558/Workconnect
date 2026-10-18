"use client"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ServerURL } from "@/app/fetchservices/FetchnodeServices";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import { useRef, useState } from "react";
import styles from './Cardslider.module.css'

export default function Cardslider(){
  const [mousestate,setmousestate]=useState("#fff")
    const [mousestatefor,setmousestatefor]=useState("#fff")
    const mySlider=useRef()
  
   const data=[{id:1,image:"Slide1.jpg"},
               {id:2,image:"Slide2.jpg"},
               {id:3,image:"Slide3.jpg"},
               {id:4,image:"Slide4.jpg"}
   ]


   const showSlide=()=>{
    return data.map((item)=>{
       return(
        <div className={styles.slideCard}>
          
          <img src={`${ServerURL}/images/${item.image}`} />
       
        </div>
       )
    })
   }

   const handleleft=()=>{
    mySlider.current.slickPrev();
   }
   const handleright=()=>{
    mySlider.current.slickNext();
   }

   var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows:false
  };

    return(
        <div style={{width:"93%",position:"relative",margin: "0 auto"}}>
          <div onClick={handleleft}  onMouseDown={()=>setmousestate("#dfe6e9")} onMouseUp={()=>setmousestate("#fff")} style={{position:"absolute",zIndex:2,top:100,left:-25,cursor:"pointer",height:50,width:50,borderRadius:40,display:"flex",justifyContent:"center",alignItems:"center",background:mousestate,border:"2px solid #e3e3e3"}}>
            <HiOutlineArrowSmLeft onClick={handleleft}  style={{color:"#0f0f0f",fontSize:"28px"}} />
          </div>
          <div onClick={handleright} onMouseDown={()=>setmousestatefor("#dfe6e9")} onMouseUp={()=>setmousestatefor("#fff")} style={{position:"absolute",zIndex:2,top:100,right:-25,cursor:"pointer",height:50,width:50,borderRadius:40,display:"flex",justifyContent:"center",alignItems:"center",background:mousestatefor,border:"2px solid #e3e3e3"}}>
            <HiOutlineArrowSmRight onClick={handleright} style={{color:"#0f0f0f",fontSize:"28px"}}/>
          </div>
        
         
            <Slider ref={mySlider} {...settings} >
            {showSlide()}
          </Slider>
          
         
        </div>
    )
}