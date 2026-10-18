'use client'

import { ServerURL,postDATA } from "@/app/fetchservices/FetchnodeServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect } from "react";
import Slider from "react-slick";
import { useState,useRef } from "react";
import styles from "./slide.module.css"
import ServiceCard from "./ServiceCard";
import CartSection from "./CartSection";

export default function SubCategoryPage({data,pricing,setPricing}) {

  console.count("CategoryComponent Render");

    const [activeSlide, setActiveSlide] = useState(0);
    const [active, setActive] = useState(null);
    const sliderRef = useRef(null);


    useEffect(() => {
  // Last slide hai to kuch mat karo
  if (activeSlide === sliderData.length - 1) return;

  const timer = setTimeout(() => {
    sliderRef.current?.slickNext();
  }, 4000);

  return () => clearTimeout(timer);
}, [activeSlide]);
   
    const fetchPricing= async()=>{

      if(!active){
        console.log("Active not available");
        return;
    }

      console.log("active =", active);

    const body = {
        Subcategoryid: active
    }

    console.log("sending =", body);
       var response = await postDATA('userinterface/fetch_all_pricing',body)
        setPricing(response?.data)
       
    }

  useEffect(() => {
  if (data?.length > 0) {
    setActive(data[1].subcategoryid);
  }
}, [data]);

    useEffect(() => {
   if(active !== undefined){
      fetchPricing()
   }
}, [active])

    const settings = {
  dots: false,
  infinite: false,
  autoplay: false,   // 👈 autoplay band
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  afterChange: (current) => {
    setActiveSlide(current);
  }
};

  const sliderData = [{id:1,pic:"pic1.jpg"},{id:2,pic:"pic2.jpg"},{id:3,pic:"pic3.jpg"}]

  const showslider=()=>{
    return sliderData.map((item,index)=>{
        return <div key={index} style={{width:"100%",height:"400px",overflow:"hidden", borderRadius:10,boxShadow: "none"}}>
                    <img
          key={index}
          src={`${ServerURL}/images/${item.pic}`}
          className={activeSlide === index ? styles.zoomImage : ""}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        </div>
    })
  }

    const services = [
  {
    id: 1,
    name: "Super Saver Packages",
    image: "image3.jpg",
  },
  {
    id: 2,
    name: "Service",
    image: "image.jpg",
  },
  {
    id: 3,
    name: "Repair & gas refill",
    image: "/image1.jpg",
  },
  {
    id: 4,
    name: "Installation/uninstallation",
    image: "image2.jpg",
  },
];
      console.log("Subcategory DAAAAAATTTAAA:",data)

    return(
        <div style={{display:"flex",gap:40,maxWidth:"1300px"}}>
        <div style={{display:"flex",flexDirection:"column",gap:20}}>
            <div
  style={{
    width: "330px",
    
    fontFamily: "Arial, sans-serif",
    
  }}
>
  <h1
    style={{
      fontSize: "36px",
      fontWeight: "600",
      margin: "0 0 15px 0",
      lineHeight: "44px",
      color: "#0f0f0f",
      textAlign: "left",
    }}
  >
    AC Service and
    <br />
    Repair
  </h1>

  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "20px",
      fontSize: "16px",
    }}
  >
    <span
      style={{
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        backgroundColor: "#6d28d9",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "12px",
      }}
    >
      ★
    </span>

    <span style={{ color: "#0f0f0f",fontSize:"16px",lineHeight:"24px", fontWeight: "400" }}>
      4.76 <span style={{ paddingBottom:6,borderBottom:"2px dashed #e3e3e3" }}>(13.4 M bookings)</span>
    </span>
  </div>

  <div
    style={{
      backgroundColor: "#f3f3f3",
      borderRadius: "14px",
      padding: "18px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: "#545454",
          fontWeight: "600",
          marginBottom: "10px",
          fontSize: "12px",
          lineHeight: "16px",

        }}
      >
        <img src='/verify.jpg' style={{height:"10px",width:"10px",objectFit:"cover" }} />
        UC COVER
      </div>

      <div
        style={{
          fontSize: "14px",
          color: "#0f0f0f",
          fontWeight: "400",
          lineHeight: "24px",
        }}
      >
        Upto 30 days warranty on repairs
      </div>
    </div>

    <div
      style={{
        fontSize: "28px",
        color: "#333",
      }}
    >
      ›
    </div>
  </div>
</div>

                                                         {/* /* Category component*\ */}

<div
  style={{
    width: "300px",
    border: "1px solid #ddd",
    borderRadius: "15px",
    padding: "20px",
    background: "#fff",

    position: "sticky",
    top: "90px", // navbar height + thoda gap
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "25px",
    }}
  >
    <span
      style={{
        color: "#757575",
        fontWeight: 600,
        whiteSpace: "nowrap",
        fontSize: "12px",
         lineHeight: "16px",
      }}
    >
      Select a service
    </span>

    <div
      style={{
        height: "1px",
        background: "#ddd",
        flex: 1,
        marginLeft: "15px",
      }}
    />
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "30px 20px",
    }}
  >
    {data.map((item) => (
      <div
      onClick={() => setActive(item.subcategoryid)}
        key={item.subcategoryid}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <img
          src={`${ServerURL}/images/${item.subicon}`}
          alt={item.subcategoryname}
          style={{
            width: "82px",
            height: "82px",
            borderRadius: "12px",
            objectFit: "cover",
            marginBottom: "10px",
          }}
        />

        <span
          style={{
            fontSize: "12px",
            lineHeight: "16px",
            fontWeight: "400",
            color: "#0f0f0f",
              textAlign: "center",
    width: "100%",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    whiteSpace: "normal",
        
          }}
        >
          {item.subcategoryname}
        </span>
      </div>
    ))}
  </div>
</div>

        </div>

                                                  {/*  slider component*/ }

          <div  style={{display:"flex",flexDirection:"column",gap:"20px"}}>
             <div style={{maxWidth:"870px",position:"relative",maxHeight:"480px", borderRadius:"10px"}}>
            <Slider ref={sliderRef} {...settings}>
            {showslider()}
           </Slider>

            <div
  style={{
    position: "absolute",
    bottom: "15px",
    left: "20px",
    right: "20px",
    display: "flex",
    gap: "10px",
    zIndex: 10,
  }}
>
  {sliderData.map((_, index) => (
    <div
      key={index}
      style={{
        flex: 1,
        height: "4px",
        backgroundColor: "rgba(255,255,255,0.4)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      {activeSlide === index && (
        <div key={`${activeSlide}-${index}`}
          style={{
            height: "100%",
            width:"100%",
            backgroundColor: "#fff",
            
          }}
          className={styles.progressFill}
        />
      )}
    </div>
  ))}
</div>

      

           </div>
                               {/* Service card ,promise card, cart  */}

<div style={{display:"flex",marginTop:"30px"}}>
   <div  style={{width:"500px",height:"auto",border:"1px solid #ededed"}}>
  <ServiceCard  data={pricing} />
  
</div>
<div style={{paddingLeft:"30px",borderTop:"1px solid #ededed"}}>
  <CartSection />
</div>
</div>
          </div>
    </div>
    )
}