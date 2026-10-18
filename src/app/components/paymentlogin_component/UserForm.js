"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button, Grid } from "@mui/material";
import { postDATA } from "@/app/fetchservices/FetchnodeServices";
import { useSelector,useDispatch } from "react-redux";
import Swal from "sweetalert2";
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

export default function UserForm({handleClose,fetchAddress}) {
  const user = useSelector((state) => state.users);
  console.log("Mobile no FROM REDUX:", user);
  const mobno = Object.keys(user)[0];

  const dispatch = useDispatch();

  const initialAddress = {
    mobileno: mobno,
    house: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    typeaddress: "home",
    fulladdress: "",
    latitude: null,
    longitude: null,
  };
  const [address, setAddress] = useState(initialAddress);
  const [error, setError] = useState({});

  const validateField = (name, value) => {
    const text = String(value ?? "").trim();

    switch (name) {
      case "house":
        return text ? "" : "House / Flat No is required";

      case "area":
        return text ? "" : "Area / Street is required";

      case "city":
        return text ? "" : "City is required";

      case "state":
        return text ? "" : "State is required";

      case "pincode":
        if (!text) return "Pincode is required";

        if (!/^[1-9][0-9]{5}$/.test(text)) {
          return "Enter a valid 6-digit pincode";
        }

        return "";

      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setAddress((prev) => {
      const updatedAddress = { ...prev, [name]: value };

      updatedAddress.fulladdress = [
        updatedAddress.house,
        updatedAddress.area,
        updatedAddress.landmark,
        updatedAddress.city,
        updatedAddress.state,
        updatedAddress.pincode,
      ]
        .map((part) => String(part ?? "").trim())
        .filter(Boolean)
        .join(", ");
      return updatedAddress;
    });

    setError((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Your browser does not support geolocation.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          console.log("LATITUDE:", latitude);
          console.log("LONGITUDE:", longitude);

          // Reverse geocoding: coordinates -> address
          const url = new URL("https://nominatim.openstreetmap.org/reverse");

          url.search = new URLSearchParams({
            format: "jsonv2",
            lat: String(latitude),
            lon: String(longitude),
            addressdetails: "1",
            "accept-language": "en",
          }).toString();

          const response = await fetch(url.toString());

          if (!response.ok) {
            throw new Error("Unable to fetch address from coordinates");
          }

          const data = await response.json();
          const location = data.address ?? {};

          console.log("REVERSE GEOCODING RESULT:", data);

          const house = location.house_number ?? "";
          const area =
            location.neighbourhood ??
            location.residential ??
            location.quarter ??
            location.suburb ??
            location.road ??
            location.hamlet ??
            location.village ??
            "";

          const landmark = "";
          const city =
            location.city ??
            location.town ??
            location.village ??
            location.municipality ??
            "";

          const state = location.state ?? "";
          const pincode = location.postcode ?? "";

          // Update existing address state
          setAddress((prev) => {
            const updatedAddress = {
              ...prev,
              latitude,
              longitude,
              house,
              area,
              landmark,
              city,
              state,
              pincode,
            };

            updatedAddress.fulladdress = [
              updatedAddress.house,
              updatedAddress.area,
              updatedAddress.landmark,
              updatedAddress.city,
              updatedAddress.state,
              updatedAddress.pincode,
            ]
              .map((part) => String(part ?? "").trim())
              .filter(Boolean)
              .join(", ");

            return updatedAddress;
          });

          // Clear errors for fields that are now populated
          setError((prev) => ({
            ...prev,
            house: validateField("house", house),
            area: validateField("area", area),
            city: validateField("city", city),
            state: validateField("state", state),
            pincode: validateField("pincode", pincode),
          }));
        } catch (error) {
          console.error("LOCATION ERROR:", error);
          alert(
            "Location mil gayi, lekin address fetch nahi ho paya. Please try again.",
          );
        }
      },
      (error) => {
        console.error("GEOLOCATION ERROR:", error);
        alert(
          "Location access nahi mil paya. Browser settings mein location permission allow karo.",
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  const handleSubmit = async () => {
    const newError = {};
    Object.entries(address).forEach(([Name, value]) => {
      const errorMessage = validateField(Name, value);
      if (errorMessage) {
        newError[Name] = errorMessage;
      }
    });

    setError(newError);

    if (Object.keys(newError).length > 0) {
      return;
    }

    const body = {
      mobileno: mobno,
      houseno: address.house,
      area: address.area,
      landmark: address.landmark,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      typeaddress: address.typeaddress,
      fulladdress: address.fulladdress,
      latitude: address.latitude,
      longitude: address.longitude,
    };
    const response = await postDATA("users/add_new_address", body);

    console.log("Response from server:", response);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Address has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

   await fetchAddress();

    handleClose();

  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1000px",
        height: "600px",

        display: "flex",
      }}
    >
      {/* MAP */}
      <div
        style={{
          width: "60%",
          height: "100%",
        }}
      >
        <MapComponent
          latitude={address.latitude}
          longitude={address.longitude}
          onLocationSelect={({ latitude, longitude }) => {
            setAddress((prev) => ({
              ...prev,
              latitude,
              longitude,
            }));
          }}
        />
        <div>
          <p>Latitude: {address.latitude ?? "Select map location"}</p>
          <p>Longitude: {address.longitude ?? "Select map location"}</p>
        </div>
      </div>

      {/* FORM */}
      <div
        style={{
          width: "50%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={0.6} style={{ padding: "10px" }}>
          <Grid size={12}>
            <TextField
              fullWidth
              variant="outlined"
              helperText={error.house || " "}
              error={Boolean(error.house)}
              onChange={handleInputChange}
              name="house"
              value={address.house}
              label="House / Flat No"
            ></TextField>
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              variant="outlined"
              helperText={error.area || " "}
              error={Boolean(error.area)}
              onChange={handleInputChange}
              name="area"
              value={address.area}
              label="Area / Street"
            ></TextField>
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              variant="outlined"
              helperText={error.landmark || " "}
              error={Boolean(error.landmark)}
              onChange={handleInputChange}
              name="landmark"
              value={address.landmark}
              label="Landmark"
            ></TextField>
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              variant="outlined"
              helperText={error.city || " "}
              error={Boolean(error.city)}
              onChange={handleInputChange}
              name="city"
              value={address.city}
              label="City"
            ></TextField>
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              variant="outlined"
              helperText={error.state || " "}
              error={Boolean(error.state)}
              onChange={handleInputChange}
              name="state"
              value={address.state}
              label="State"
            ></TextField>
          </Grid>
          <Grid size={12}>
            <TextField
              fullWidth
              variant="outlined"
              helperText={error.pincode || " "}
              error={Boolean(error.pincode)}
              onChange={handleInputChange}
              name="pincode"
              value={address.pincode}
              label="Pincode"
            ></TextField>
          </Grid>
          <Grid size={12}>Save as</Grid>
          <Grid size={4}>
            <Button
              variant={address.typeaddress == "home" ? "contained" : "outlined"}
              onClick={() =>
                setAddress((address) => ({ ...address, typeaddress: "home" }))
              }
              style={{
                backgroundColor: `${address.typeaddress == "home" ? "#212121" : ""}`,
              }}
              fullWidth
            >
              Home
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              variant={address.typeaddress == "work" ? "contained" : "outlined"}
              onClick={() =>
                setAddress((address) => ({ ...address, typeaddress: "work" }))
              }
              style={{
                backgroundColor: `${address.typeaddress == "work" ? "#212121" : ""}`,
              }}
              fullWidth
            >
              Work
            </Button>
          </Grid>
          <Grid size={4}>
            <Button
              variant={
                address.typeaddress == "other" ? "contained" : "outlined"
              }
              onClick={() =>
                setAddress((address) => ({
                  ...address,
                  typeaddress: "other",
                }))
              }
              style={{
                backgroundColor: `${address.typeaddress == "other" ? "#212121" : ""}`,
              }}
              fullWidth
            >
              Other
            </Button>
          </Grid>
          <Grid size={12}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#e3f2fd",
                padding: "10px",
                color: "#1976d2",
                fontWeight: "550",
              }}
              onClick={handleCurrentLocation}
              fullWidth
            >
              Use Current Location
            </Button>
          </Grid>
          <Grid size={12}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#212121",
                padding: "10px",
                fontWeight: "550",
              }}
              fullWidth
              onClick={handleSubmit}
            >
              Update Location
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
