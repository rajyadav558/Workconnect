import React from "react";
import styles from "./UserDetails.module.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Slide from "@mui/material/Slide";
import { useState, useEffect } from "react";
import UserForm from "./UserForm";
import { postDATA, ServerURL } from "@/app/fetchservices/FetchnodeServices";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/app/store/slices/userSlicer";
import { useRazorpay } from "react-razorpay";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UsersDetails({ phoneNumber }) {
  const [address, setAddress] = useState([]);

  const dispatch = useDispatch();
 const userDATA = useSelector((state) => state.users);

  const {Razorpay} = useRazorpay();
  const [open, setOpen] = useState(false);
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [OpenUserForm, setOpenUserForm] = useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState({
    date: "",
    day: "",
    month: "",
    time: "",
  });

    const product = useSelector((state)=>state.product)
  const cartItem = Object.values(product)

    const totalOfferAmount = cartItem.reduce((total, item) => total + ((item.amount - item.offer) * item.qty), 0);
  const totalAmount = cartItem.reduce((total, item) => total + (item.amount * item.qty), 0);

  var amount = totalAmount - totalOfferAmount;

  useEffect(() => {
    fetchAddress();
  }, [phoneNumber]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpenUserForm(false);
    setOpen(false);
  };
  const handleSave = () => {
    setOpen(false);
    setStep2(true);
  };

  const dates = [];

  for (let i = 1; i <= 3; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);

    dates.push({
      day: date.toLocaleDateString("en-US", {
        weekday: "short",
      }),

      date: date.getDate(),

      month: date.toLocaleDateString("en-US", {
        month: "short",
      }),

      year: date.getFullYear(),
    });
  }

  console.log(dates);

  const timeSlots = [];

  for (let minutes = 8 * 60; minutes <= 19 * 60 + 30; minutes += 30) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;

    const time = `${String(displayHours).padStart(2, "0")}:${String(mins).padStart(2, "0")} ${period}`;

    timeSlots.push(time);
  }

  console.log(timeSlots);

  const fetchAddress = async () => {
    const response = await postDATA("users/fetch_all_address", {
      mobileno: phoneNumber,
    });

    if (Array.isArray(response?.data) && response.data.length > 0) {
      setAddress(response.data);

      setSelectedAddress((prev) => {
        const exists = response.data.some(
          (item) => String(item.addressid) === String(prev),
        );

        return exists ? prev : String(response.data[0].addressid);
      });

      setStep1(true);
    } else {
      setAddress([]);
      setSelectedAddress("");
      setStep1(false);
    }
  };

  const handlePayment = () => {

      if (!Razorpay) {
    alert("Razorpay is not loaded yet");
    return;
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: (totalOfferAmount + cartItem?.length *50) *100,
    currency: "INR",
    name: "Workconnect",
    description: "Test Payment",
    image:`${ServerURL}/images/wc.png`,

    handler: function (response) {
      alert("Payment Successful!");
      console.log(response.razorpay_payment_id);
    },
  
    prefill:{
         name:"Raj Yadav",
         email:"testRazor.com",
         contact:userDATA.mobileno
    },
    

    theme: {
      color: "#3399cc",
    },
    
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};

  const proceeddialog = () => {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        {/* Heading */}
        <div
          style={{
            margin: "12px 0 28px 12px",
            fontSize: "22px",
            fontWeight: 600,
            color: "#111",
          }}
        >
          Saved address
        </div>

        {/* Add another address */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            padding: "0 16px 25px 16px",
            cursor: "pointer",
            color: "#6f42e8",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", gap: "5px" }}
            onClick={() => setOpenUserForm(true)}
          >
            <span
              style={{
                fontSize: "28px",
                fontWeight: 300,
                lineHeight: "20px",
              }}
            >
              +
            </span>

            <span>Add another address</span>
          </div>

          <div>
            <FormControl fullWidth>
              <RadioGroup
                value={selectedAddress}
                onChange={(e) => setSelectedAddress(e.target.value)}
              >
                {address.map((item) => (
                  <FormControlLabel
                    key={item.addressid}
                    value={String(item.addressid)}
                    control={
                      <Radio
                        sx={{
                          color: "#777",
                          "&.Mui-checked": {
                            color: "#6C3CF0",
                          },
                        }}
                      />
                    }
                    label={
                      <div>
                        <div
                          style={{
                            fontWeight: 600,
                            fontSize: "14px",
                            color: "#222",
                          }}
                        >
                          {item.typeaddress}
                        </div>

                        <div
                          style={{
                            fontSize: "12px",
                            color: "#888",
                            marginTop: "6px",
                          }}
                        >
                          {item.fulladdress}
                        </div>
                      </div>
                    }
                    sx={{
                      margin: 0,
                      width: "100%",
                      padding: "12px 0",
                      borderBottom: "1px solid #eee",
                      alignItems: "center",
                      "& .MuiFormControlLabel-label": {
                        flex: 1,
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "3px",
            backgroundColor: "#eeeeee",
            boxShadow: "0 -1px 4px rgba(0,0,0,0.08)",
          }}
        ></div>

        {/* Proceed Button */}
        <div
          style={{
            padding: "12px",
            backgroundColor: "white",
          }}
        >
          <button
            onClick={() => {
              const selected = address.find(
                (item) => String(item.addressid) === String(selectedAddress),
              );

              if (!selected) {
                alert("Please select an address");
                return;
              }

              dispatch(
                updateUser({
                  mobileno: phoneNumber,
                  address: selected,
                }),
              );

              setStep1(true);
              setOpen(false);
            }}
            style={{
              width: "450px",
              height: "48px",
              border: "none",
              borderRadius: "10px",
              backgroundColor: "#6e42e5",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    );
  };

  const fillAddressstep = () => {
    return !step1 ? (
      <>
        <div
          style={{
            height: "auto",
            paddingTop: "20px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "10px",
            borderBottom: "2px solid #ddd",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "auto",
              paddingTop: "20px",
              width: "100%",
              display: "flex",
              gap: "20px",
            }}
          >
            <img
              src="loc.png"
              alt="user"
              style={{ height: "40px", width: "40px", objectFit: "cover" }}
            />
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "6vh",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#0f0f0f",
                  fontFamily: "sans-serif",
                }}
              >
                Address
              </div>
            </div>
          </div>

          <button className="login-btn" onClick={handleClickOpen}>
            Select address
          </button>
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={OpenUserForm ? true : false}
            maxWidth={"md"}
            slots={{
              transition: Transition,
            }}
          >
            {OpenUserForm ? (
              <UserForm handleClose={handleClose} fetchAddress={fetchAddress} />
            ) : (
              proceeddialog()
            )}
          </Dialog>
        </div>
      </>
    ) : (
      <div
        style={{
          height: "auto",
          paddingLeft: "20px",
          paddingTop: "20px",
          paddingBottom: "10px",
          borderBottom: "2px solid #ddd",
          width: "100%",
          display: "flex",
          gap: "20px",
        }}
      >
        <img
          src="loc.png"
          alt="user"
          style={{ height: "40px", width: "40px", objectFit: "cover" }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "6vh",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#0f0f0f",
              fontFamily: "sans-serif",
            }}
          >
            Address
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "400",
              color: "#545454",
              fontFamily: "sans-serif",
            }}
          >
            {
              address.find(
                (item) => String(item.addressid) === String(selectedAddress),
              )?.fulladdress
            }
          </div>
        </div>
        <button
          onClick={() => {
            setOpenUserForm(!OpenUserForm);
            setStep1(false);
          }}
          className={styles.btn}
        >
          Edit
        </button>
      </div>
    );
  };

  const fillSlotstep = () => {
    return !step2 ? (
      <>
        <div
          style={{
            height: "auto",
            paddingTop: "20px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "10px",
            borderBottom: "2px solid #ddd",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "auto",
              paddingTop: "20px",
              width: "100%",
              display: "flex",
              gap: "20px",
            }}
          >
            <img
              src="clocki.jpeg"
              alt="user"
              style={{ height: "40px", width: "40px", objectFit: "cover" }}
            />
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "6vh",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#0f0f0f",
                  fontFamily: "sans-serif",
                }}
              >
                Slot
              </div>
            </div>
          </div>

          <button className="login-btn" onClick={handleClickOpen}>
            Select date & time
          </button>
          <Dialog
            open={open}
            onClose={handleClose}
            slots={{
              transition: Transition,
            }}
            scroll={scroll}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <DialogTitle
              style={{
                fontSize: "28px",
                fontFamily: "sans-serif",
                fontWeight: "500",
              }}
            >
              When should the proffesional arrive ?
            </DialogTitle>
            <DialogContent
              style={{
                height: "auto",
                paddingTop: "20px",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingBottom: "10px",
                borderRadius: "2px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  height: "auto",
                  paddingTop: "20px",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                  paddingBottom: "10px",
                  border: "2px solid #ddd",
                  borderRadius: "2px",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: "700",
                      fontFamily: "sans-serif",
                      color: "#111",
                    }}
                  >
                    Schedule for letter
                  </div>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "500",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Select your prefered day & time
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "auto",
                    height: "14vh",
                    alignItems: "center",
                    gap: "25px",
                  }}
                >
                  {dates.map((item) => {
                    return (
                      <div
                        key={item.date}
                        style={{
                          height: "8vh",
                          width: "4vw",
                          padding: "10px ,30px",
                          display: "flex",
                          fontFamily: "sans-serif",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          border: "2px solid #ddd",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                        className={`${selectedDateTime.date === item.date ? styles.selected : ""}`}
                        onClick={() =>
                          setSelectedDateTime((prev) => ({
                            ...prev,
                            date: item.date,
                            day: item.day,
                            month: item.month,
                          }))
                        }
                      >
                        <span style={{ fontWeight: "500", fontSize: "14px" }}>
                          {item.day}
                        </span>
                        <span
                          style={{
                            fontWeight: "500",
                            fontSize: "20px",
                            color: `${selectedDateTime.date === item.date ? "#1976d2" : "#111"}`,
                          }}
                        >
                          {item.date}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "auto",
                    gap: "25px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Select start time of service
                  </span>
                  <div className={styles.timeSlots}>
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`${styles.timeSlot} ${
                          selectedTime === time ? styles.selected : ""
                        }`}
                        onClick={() => {
                          setSelectedTime(time);
                          setSelectedDateTime((prev) => ({
                            ...prev,
                            time: time,
                          }));
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className={styles.proceedButton}
                  disabled={!selectedTime}
                  onClick={() => {
                    handleSave();
                    console.log("Selected Date & Time:", selectedDateTime);
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </>
    ) : (
      <div
        style={{
          height: "auto",
          paddingLeft: "20px",
          paddingTop: "20px",
          paddingBottom: "10px",
          borderBottom: "2px solid #ddd",
          width: "100%",
          display: "flex",
          gap: "20px",
        }}
      >
        <img
          src="clocki.jpeg"
          alt="user"
          style={{ height: "40px", width: "40px", objectFit: "cover" }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "6vh",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#0f0f0f",
              fontFamily: "sans-serif",
            }}
          >
            Slot
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "400",
              color: "#545454",
              fontFamily: "sans-serif",
            }}
          >
            {selectedDateTime.day},{selectedDateTime.month},{" "}
            {selectedDateTime.date} ,{selectedDateTime.time}
          </div>
        </div>
        <button
          onClick={() => {
            setStep2(false);
            handleClickOpen();
          }}
          className={styles.btn}
        >
          Edit
        </button>
      </div>
    );
  };

  // {rukkkk ja  bhai ye payment ke liye h }

  const fillPaymentMethods = () => {
    return !step3 ? (
      <>
        <div
          style={{
            height: "auto",
            paddingTop: "20px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingBottom: "10px",
            borderBottom: "2px solid #ddd",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "auto",
              paddingTop: "20px",
              width: "100%",
              display: "flex",
              gap: "20px",
            }}
          >
            <img
              src="cash.jpeg"
              alt="user"
              style={{ height: "40px", width: "40px", objectFit: "cover" }}
            />
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "6vh",
                gap: "10px",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#0f0f0f",
                  fontFamily: "sans-serif",
                }}
              >
                Payment Method
              </div>
            </div>
          </div>

          <button onClick={handlePayment}  className="login-btn">
            Proceed to pay
          </button>
        </div>
      </>
    ) : (
      <div
        style={{
          height: "auto",
          paddingLeft: "20px",
          paddingTop: "20px",
          paddingBottom: "10px",
          borderBottom: "2px solid #ddd",
          width: "100%",
          display: "flex",
          gap: "20px",
        }}
      >
        <img
          src="clocki.jpeg"
          alt="user"
          style={{ height: "40px", width: "40px", objectFit: "cover" }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "6vh",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#0f0f0f",
              fontFamily: "sans-serif",
            }}
          >
            Slot
          </div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "400",
              color: "#545454",
              fontFamily: "sans-serif",
            }}
          >
            {selectedDateTime.day},{selectedDateTime.month},{" "}
            {selectedDateTime.date} ,{selectedDateTime.time}
          </div>
        </div>
        <button
          onClick={() => {
            setStep2(false);
            handleClickOpen();
          }}
          className={styles.btn}
        >
          Edit
        </button>
      </div>
    );
  };

  return (
    <div>
      <div
        style={{
          height: "8vh",
          paddingLeft: "20px",
          borderBottom: "2px solid #ddd",
          width: "100%",
          display: "flex",
          gap: "20px",
        }}
      >
        <img
          src="loc.png"
          alt="user"
          style={{ height: "40px", width: "40px", objectFit: "cover" }}
        />
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "6vh",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#0f0f0f",
              fontFamily: "sans-serif",
            }}
          >
            Send booking details to
          </div>
          <div
            style={{
              fontSize: "15px",
              fontWeight: "400",
              color: "#545454",
              fontFamily: "sans-serif",
            }}
          >
            +91 {phoneNumber}
          </div>
        </div>
      </div>

      {fillAddressstep()}

      {/* Slots select date and time  */}

      {step1 && fillSlotstep()}

      {step2 && fillPaymentMethods()}
    </div>
  );
}
