import Swal from "sweetalert2";
import styles from "./PhoneLogin.module.css";
import { postDATA } from "../../fetchservices/FetchnodeServices";
import { addUser } from "../../store/slices/userSlicer";

const showOtpAlert = ( phoneNumber, generatedOtp, setPhoneNumber, setLoginStatus, dispatch) => {
  let timerInterval;
  
 
  

  const checkmobileno = async () => {
    
    const response = await postDATA("users/check_user_mobileno",{phoneNumber:phoneNumber});
     return response;
  }

  Swal.fire({
    html: `
      <div class="${styles.otpLogin}">

        <img
          src="/otp.png"
          class="${styles.otpIcon}"
          alt="phone"
        />

        <h2>Enter verification code</h2>

        <p class="${styles.otpSubtitle}">
          A 6-digit verification code has been sent to +91${phoneNumber}
        </p>

        <div class="${styles.otpBoxes}">

          <input id="otp1" class="${styles.otpBox}" type="text" maxlength="1" inputmode="numeric" />
          <input id="otp2" class="${styles.otpBox}" type="text" maxlength="1" inputmode="numeric" />
          <input id="otp3" class="${styles.otpBox}" type="text" maxlength="1" inputmode="numeric" />
          <input id="otp4" class="${styles.otpBox}" type="text" maxlength="1" inputmode="numeric" />
          <input id="otp5" class="${styles.otpBox}" type="text" maxlength="1" inputmode="numeric" />
          <input id="otp6" class="${styles.otpBox}" type="text" maxlength="1" inputmode="numeric" />

        </div>

        <div class="${styles.timer}">
          <span>◷</span>
          <span id="otpTimer">00:59</span>
        </div>

        <button
          id="otpLoginBtn"
          class="${styles.otpLoginBtn}"
          disabled
        >
          Login
        </button>

      </div>
    `,

    showConfirmButton: false,
    showCloseButton: false,

    width: "650px",
    padding: "0",

    customClass: {
      popup: styles.otpPopup,
    },

    didOpen: () => {

      const inputs = [
        document.getElementById("otp1"),
        document.getElementById("otp2"),
        document.getElementById("otp3"),
        document.getElementById("otp4"),
        document.getElementById("otp5"),
        document.getElementById("otp6"),
      ];

      const loginBtn = document.getElementById("otpLoginBtn");
      const timerElement = document.getElementById("otpTimer");

      inputs[0].focus();

      inputs.forEach((input, index) => {

        input.addEventListener("input", () => {

          input.value = input.value.replace(/\D/g, "");

          if (input.value && index < 5) {
            inputs[index + 1].focus();
          }

          checkOtp();
        });

        input.addEventListener("keydown", (e) => {

          if (
            e.key === "Backspace" &&
            input.value === "" &&
            index > 0
          ) {
            inputs[index - 1].focus();
          }

        });

      });

      function checkOtp() {

        const otp = inputs
          .map((input) => input.value)
          .join("");

        if (otp.length === 6) {
          loginBtn.disabled = false;
          loginBtn.classList.add(styles.otpActive);
        } else {
          loginBtn.disabled = true;
          loginBtn.classList.remove(styles.otpActive);
        }
      }

      // TIMER
      let timeLeft = 59;

      timerInterval = setInterval(() => {

        timeLeft--;

        timerElement.innerText =
          `00:${String(timeLeft).padStart(2, "0")}`;

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
        }

      }, 1000);


      // LOGIN / OTP VERIFY
      loginBtn.addEventListener("click", async () => {

    const enteredOtp = inputs
        .map((input) => input.value)
        .join("");

    console.log("Generated OTP:", generatedOtp);
    console.log("Entered OTP:", enteredOtp);

    if (enteredOtp === generatedOtp) {

        alert("OTP Verified Successfully!");

        const response = await checkmobileno();

        if (response.status) {

            // EXISTING USER

            dispatch(
                addUser([
                    phoneNumber,
                    response.data
                ])
            );

            alert("User already exists.");

        } else {

            // NEW USER

            const createResponse = await postDATA(
                "users/create_user",
                {
                    mobileno: phoneNumber
                }
            );

            if (createResponse.status) {

                dispatch(
                    addUser([
                        phoneNumber,
                        {
                            mobileno: phoneNumber
                        }
                    ])
                );

                alert("User created successfully.");

            } else {

                alert("Failed to create the user.");
                return;
            }
        }

        setPhoneNumber(phoneNumber);
        setLoginStatus(true);

        clearInterval(timerInterval);
        Swal.close();

    } else {

        alert("Invalid OTP!");

    }

});

    },

    willClose: () => {
      clearInterval(timerInterval);
    },

  });
};


const OpenPhoneLogin = (setPhoneNumber, setLoginStatus,dispatch) => {

  Swal.fire({

    html: `
      <div class="${styles.phoneLogin}">

        <img
          src="/phone.png"
          class="${styles.phoneIcon}"
          alt="phone"
        />

        <h2>Enter your phone number</h2>

        <p class="${styles.phoneSubtitle}">
          We’ll send you a text with a verification code.
          Standard tariff may apply.
        </p>

        <div class="${styles.phoneInputWrapper}">

          <div class="${styles.countryCode}">
            <span>+91</span>
            <span class="${styles.arrow}">⌄</span>
          </div>

          <input
            id="phoneNumber"
            type="tel"
            maxlength="10"
            placeholder="Enter your phone number"
          />

        </div>

        <button
          id="continueBtn"
          class="${styles.continueBtn}"
          disabled
        >
          Continue
        </button>

        <p class="${styles.terms}">
          By continuing, you agree to our
          <a href="#">T&C</a> and
          <a href="#">Privacy policy</a>.
        </p>

      </div>
    `,

    showConfirmButton: false,
    showCloseButton: false,

    width: "650px",
    padding: "0",

    customClass: {
      popup: styles.phonePopup,
    },

    didOpen: () => {

  const input = document.getElementById("phoneNumber");
  const continueBtn = document.getElementById("continueBtn");

  input.focus();

  input.addEventListener("input", () => {

    input.value = input.value.replace(/\D/g, "");

    if (input.value.length === 10) {

      continueBtn.disabled = false;
      continueBtn.classList.add(styles.active);

    } else {

      continueBtn.disabled = true;
      continueBtn.classList.remove(styles.active);

    }

  });


  // CONTINUE BUTTON
  continueBtn.addEventListener("click", () => {

    const phoneNumber = input.value;

    // 6 DIGIT OTP GENERATE
    const generatedOtp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    console.log("Generated OTP:", generatedOtp);

    // TEMPORARY TESTING
    alert(generatedOtp);

    // CLOSE PHONE POPUP
    Swal.close();

    // OPEN OTP POPUP
    setTimeout(() => {

     showOtpAlert(
      phoneNumber,
      generatedOtp,
      setPhoneNumber,
      setLoginStatus,
      dispatch
    );

    }, 200);

  });

},

  });

};

export default OpenPhoneLogin;