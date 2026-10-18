"use client";

import { ServerURL } from "../fetchservices/FetchnodeServices";
import PlusMinus from "./PlusMinus";
import styles from "./ServiceCard.module.css";
import parse from 'html-react-parser';
import { PiTagFill } from "react-icons/pi";
import { useSelector } from "react-redux";

export default function ServiceCard({ data }) {
const product = useSelector((state)=>state.product)
const cartItem = product=={}?[]: Object.values(product)

  return (
    <div style={{margin:"0px 20px"}}>
     <div className={styles.heading} >
      <h2>{data[0]?.subcategoryname}</h2>
     </div>
    {data.map((item,index)=>{
      return(
         <div key={index} className={styles.card}>
      
      <div className={styles.left}>
        <h2 style={{color:"black"}}>{item.typeofservices}({item.no_of_acs}ACs)</h2>

        <div className={styles.rating}>
           <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      
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

    <span style={{ color: "#545454",borderBottom:"2px dashed #e3e3e3",fontSize:"12px",lineHeight:"16px", fontWeight: "400" }}>
      4.76 <span style={{ paddingBottom:6 }}>(2.7M reviews)</span>
    </span>
  </div>
  
        </div>
{item.offer==0?<div style={{display:"flex",alignItems:"center",gap:10}}><h3>Starts at ₹{item.amount}</h3><h3 style={{color:"#545454",fontWeight:"400"}}>{item.time_services}</h3></div>:<div style={{display:"flex",alignItems:"center",gap:10}}><h3>₹{item.amount-item.offer}</h3><h3 style={{color:"#545454",fontWeight:"400"}}><s>₹{item.amount}</s></h3><h3 style={{color:"#545454",fontWeight:"400"}}>{item.time_services}</h3></div>}
        <div style={{fontSize:"12px",color:"#067e20",}}><PiTagFill/> ₹{item.offer==0?parseInt(item.amount):parseInt(item.amount-item.offer)/parseInt(item.no_of_acs)} per AC </div>
        <div className={styles.para}>
          {parse(item.description)}
        </div>

        <span className={styles.details}>
          View details
        </span>
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        <img
          src={`${ServerURL}/images/${item.picture}`}
          alt={item.typeofservices}
          className={styles.image}
        />

        <PlusMinus data={item} qty={cartItem?.find(product => item?.priceid === product?.priceid)?.qty||0} />

        
      </div>
    </div>
      )
    })}
    </div>
  );
}