"use client"
import store from "./store/slices";
import { Provider } from "react-redux";

export default function Providers({children}){

    return(
        <Provider store={store}>
          {children}
        </Provider>
    )

}