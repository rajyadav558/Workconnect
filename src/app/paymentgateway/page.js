"use client";
import React from "react";
import "./Paymentlog.css";
import {useSelector} from "react-redux";
import PlusMinus from "../subcategorycomponent/PlusMinus";
import Swal from "sweetalert2";
import OpenPhoneLogin from "../components/paymentlogin_component/OpenPhoneLogin";
import Checkbox from "@mui/material/Checkbox";
import UsersDetails from "../components/paymentlogin_component/UsersDetails";
import { useDispatch } from "react-redux";
const paymentgateway = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);
  console.log("USER FROM REDUX:", user);
  const mobno = Object.keys(user)[0];

  const [loginStatus, setLoginStatus] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState(mobno);
 
  const product = useSelector((state)=>state.product)
  const cartItem = Object.values(product)

    const totalOfferAmount = cartItem.reduce((total, item) => total + ((item.amount - item.offer) * item.qty), 0);
  const totalAmount = cartItem.reduce((total, item) => total + (item.amount * item.qty), 0);

   var fees = cartItem.length >1 ? cartItem.length*50: 50

  const filldetails = ()=>{
    return  (!loginStatus ? (<><h3>Account</h3>

            <p>
              To book the service, please login or sign up
            </p>

            <button className="login-btn" onClick={()=>OpenPhoneLogin(setPhoneNumber,setLoginStatus,dispatch)} >
              Login
            </button></>):(<UsersDetails phoneNumber={phoneNumber} />))
  }


  return (
    <div className="payment-page">

      {/* Header */}
      <header className="payment-header">
        <div className="header-inner">
          <div className="uc-logo">WC</div>
          <h2>Checkout</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="payment-container">

        {/* LEFT SECTION */}
        <section className="payment-left">

          {/* Saving Banner */}
          <div className="saving-banner">
            <span className="tag-icon">◆</span>
            <span>Saving ₹{totalAmount - totalOfferAmount} on this order</span>
          </div>

          {/* Account Card */}
          <div className="account-card">
           {filldetails()}
          </div>

        </section>

        {/* RIGHT SECTION */}
         <section className="payment-right">

          {/* Service Card */}
          <div className="payment-card service-card">

            <h2>AC Service and Repair</h2>

           {cartItem.map((item,index)=>{
            return (
               <div className="service-row" key={index} style={{marginTop:"10px"}}>
              <div className="service-name">
                {item.typeofservices} ({item.no_of_acs} ACs)
              </div>

              <PlusMinus data={item} qty={item.qty} />

              <div className="service-price">
                <strong>₹{item.offer>0?(item.amount-item.offer) * item.qty:(item.amount)*item.qty}</strong>
                <del>₹{item.offer==0?0:item.amount * item.qty}</del>
              </div>
            </div>
            )
           })}

            <div className="divider"></div>

            <div className="avoid-call">
              <Checkbox  defaultChecked color="default" />
              <span>
                Avoid calling before reaching the location
              </span>
            </div>

          </div>

          {/* Coupon Card */}
          <div className="payment-card coupon-card">

            <div className="coupon-icon">%</div>

            <div>
              <h3>Coupons and offers</h3>
              <p>Login/Sign up to view offers</p>
            </div>

          </div>

          {/* Payment Summary */}
          <div className="payment-card summary-card">

            <h2>Payment summary</h2>

            <div className="summary-row">
              <span>Item total</span>

              <span>
                <del>₹{totalAmount}</del>{" "}
                <strong>₹{totalOfferAmount}</strong>
              </span>
            </div>

            <div className="summary-row">
              <span>Taxes and Fee</span>
              <span>₹{fees}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row total-row">
              <strong>Total amount</strong>
              <strong>₹{totalOfferAmount + fees}</strong>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <strong>Amount to pay</strong>
              <strong>₹{totalOfferAmount + fees }</strong>
            </div>

          </div>

          {/* Bottom Sticky Payment */}
          <div className="bottom-payment">

            <div>
              <h3>Amount to pay</h3>
            </div>

            <div className="bottom-right">
              <strong>₹{totalOfferAmount + fees }</strong>
              <span>View breakup</span>
            </div>

          </div>

        </section>

      </main>
    </div>
  );
};

export default paymentgateway;
