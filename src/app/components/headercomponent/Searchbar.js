import { GrLocation } from "react-icons/gr";
import { SlLocationPin } from "react-icons/sl";
import { FaAngleDown } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
export default function Searchbar(){
    return(
       
            <div style={{display:"flex", gap:"8px"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-evenly",height:"48px",width:"230px",paddingLeft:"2px",paddingRight:"2px",borderRadius:"8px",border:"1px solid #e3e3e3"}}>
                <SlLocationPin  color="#757575"/><p style={{fontSize:"14px",lineHeight:"20px",color:"rgb(117, 117, 117)",fontWeight:"400",marginRight:"28px"}}>Gwalior Zoo, 'Gwalior </p><FaAngleDown color="#757575"/>
              </div>
             
                <div style={{ position: "relative", width: "230px" }}>
      
      <FiSearch
        style={{
          position: "absolute",
          left: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "gray",
          fontSize: "18px",
        }}
      />

      <input
        type="text"
        placeholder="Search for 'Services..'"
        style={{
          height: "48px",
          width: "100%",
          paddingLeft: "35px",
          paddingRight: "10px",
          borderRadius: "8px",
          border: "1px solid #e3e3e3",
          outline: "none",
        }}
      />
    </div>
              
            </div>
       
    )
}