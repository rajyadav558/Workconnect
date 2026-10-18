import { FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
export default function Usercart(){
    var product = useSelector((state)=> state.product)
    var products = Object.values(product)
    var count = products.length
    return(
        <div style={{height:"100px",width:"200px",display:"flex",alignItems:"center",justifyContent:"center",gap:"30px"}} >
           <div style={{height:"40px",width:"40px",display:"flex",alignItems:"center",justifyContent:"center",border: "2px solid #e3e3e3",borderRadius:"20px"}}>
             <Badge color="secondary" badgeContent={count}>
             <FiShoppingCart color="#0f0f0f"/>
             </Badge>
           </div>
           <CgProfile fontSize="20px" color="#0f0f0f"/>
        </div>
    )
}