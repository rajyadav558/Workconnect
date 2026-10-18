import { ServerURL } from "../fetchservices/FetchnodeServices";
import styles from "./CartSection.module.css";
import { TiTick } from "react-icons/ti";
import { IconName } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { useSelector } from "react-redux";
import { FiMinus, FiPlus } from "react-icons/fi";
import PlusMinus from "./PlusMinus";
import {useRouter} from "next/navigation";

export default function CartSection() {
  var product = useSelector((state)=>state.product)
  var cartItem = Object.values(product)
 
  var Router = useRouter()
  

  const totalOfferAmount = cartItem.reduce((total, item) => total + ((item.amount - item.offer) * item.qty), 0);
  const totalAmount = cartItem.reduce((total, item) => total + (item.amount * item.qty), 0);
  const features = [
    "Verified Professionals",
    "Hassle Free Booking",
    "Transparent Pricing",
  ];

  const check = ()=>{
    Router.push("/paymentgateway")
   
  }

  const fillCart = ()=>{
    return  cartItem.map((item,index) => {
        return(
          <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 15px",
            borderBottom: "1px solid #eee",
          }}
        >
          {/* Left */}
          <div>
            <div
              style={{
                fontSize: "15px",
                color: "#555",
                fontWeight: "500",
              }}
            >
              {item.typeofservices}
            </div>

            <div
              style={{
                marginTop: "5px",
                color: "#555",
                fontSize: "15px",
              }}
            >
              ({item.no_of_acs} ACs)
            </div>
          </div>

          {/* Right */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            {/* Plus Minus */}
           <PlusMinus data={item} qty={item.qty}/>

            {/* Price */}
            <div
              style={{
                textAlign: "right",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                ₹{item.offer>0?(item.amount-item.offer) * item.qty:(item.amount)*item.qty}
              </div>

              <div
                style={{
                  color: "#888",
                  textDecoration: "line-through",
                  fontSize: "18px",
                }}
              >
                ₹{item.offer==0?0:item.amount * item.qty}
              </div>
            </div>
          </div>
        </div>
        )
    })}
  

  return (
    <div className={styles.container}>
      
      {/* UC Promise Card */}
      <div className={styles.card}>
        <div className={styles.promiseContent}>
          
          <div>
            <h2 className={styles.title}>UC Promise</h2>

            {features.map((item, index) => (
              <div key={index} className={styles.feature}>
                <FiCheck />
                <span style={{lineHeight:"10px"}}>{item}</span>
              </div>
            ))}
          </div>

          <div >
            <img src={`${ServerURL}/images/${'promise.jpeg'}`} style={{height:"70px",marginTop:"18px",objectFit:"cover"}} />
          </div>

        </div>
      </div>
           {/* yha se cartfill ke liye bn rha jb fill hoga tb ayega */}

      {cartItem.length>0?(<div
      style={{
        width: "380px",
        border: "1px solid #e5e5e5",
        borderRadius: "8px",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          margin: "15px",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        Cart
      </h2>

     { fillCart()}

           <div
        style={{
          background: "#6D3EF5",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 20px",
          margin: "15px",
          borderRadius: "10px",
          fontWeight: "600",
          fontSize: "14px",
        }}
        onClick={()=>{check()}}
      >
        <div>
          <span
            style={{
              fontSize: "14px",
            }}
          >
            ₹{totalOfferAmount}
          </span>

          <span
            style={{
              marginLeft: "8px",
              textDecoration: "line-through",
              opacity: 0.7,
              fontSize: "14px",
            }}
          >
            ₹{totalAmount}
          </span>
        </div>

        <div
          style={{
            cursor: "pointer",
          }}
        >
          View Cart
        </div>
      </div>
    </div>):(<div className={styles.emptyCart}>
        <img
          src={`${ServerURL}/images/${'cart.png'}`}
          alt="cart"
          className={styles.cartImage}
        />
        <p>No items in your cart</p>
      </div>)}

      {/* Empty Cart Card */}
      

    </div>
  );
}