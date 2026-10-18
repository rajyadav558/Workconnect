"use client"

import { useState } from "react";
import { FiMinus,FiPlus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addProduct, removeProduct } from "../store/slices/Slicer";
import { useEffect } from "react";

export default function PlusMinus({data,qty}){
    const [value,setvalue]=useState(qty)
    const dispatch = useDispatch()


    useEffect(()=>{
    setvalue(qty)
},[qty])

    const handleincre=()=>{
        var v= value+1;
        setvalue(v);
        var UpdatedData = {
          ...data ,qty :v
        }
        console.log(JSON.stringify(UpdatedData))
        var payload = [UpdatedData.priceid, UpdatedData]
        dispatch(addProduct(payload))
    }

      const handledecre=()=>{
        var v = value - 1;
        setvalue(v);
        if(v==0){
          var payload = [data.priceid]
          dispatch(removeProduct(payload))
        }
        else{
          var UpdatedData = {
            ...data ,qty :v
          }
          var payload = [UpdatedData.priceid, UpdatedData]
          dispatch(addProduct(payload))
        }
    }

    return(
        <div style={{height:"40px",cursor:"pointer",display:"flex",justifyContent:"space-around",alignItems:"center",marginTop:"-13px",width:"80px",padding:"2px 4px",color:"#6e42e5",borderRadius:"12px",border:"1px solid #A5A1F7",backgroundColor:"#fff"}}>
          <div onClick={handledecre} style={{cursor:"pointer"}}>
            {value==0?"":<FiMinus />}
          </div>
          <div onClick={handleincre} style={{fontWeight:600,cursor:"pointer",fontSize:"14px",lineHeight:"20px",color:"#6e42e5"}}>
           {value==0?"Add":qty}
          </div>
          <div onClick={handleincre} style={{cursor:"pointer"}}>
            {value==0?"":<FiPlus />}
          </div>
        </div>
    )
}