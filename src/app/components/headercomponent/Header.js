"use client"

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Searchbar from './Searchbar';
import Usercart from './Usercart';

export default function Header(){
  return(
    <div>
        <AppBar position='static'  style={{backgroundColor:"#ffff"}}  sx={{
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1200,
  }}>
               <Toolbar>
                <div style={{display:"flex",width:"100%",justifyContent:"space-around",alignItems:"center",fontFamily:"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Oxygen-Sans, Ubuntu, Cantarell, Helvetica, Arial, sans-serif"}} >
                  <div style={{display:"flex",alignItems:"center",width:"280px",justifyContent:"space-between"}}>
                    <div>
                        <img src='/wclogo1.png' style={{width:"180px",objectFit:"cover"}}/>
                    </div>
                    <div>
                      <p style={{fontSize:"14px",lineHeight:"20px",color:"rgb(84, 84, 84)",fontWeight:"400",textDecoration:"none"}}>Native</p>
                    </div>
                    </div>
                   
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"800px"}}>
                      <div>
                      <Searchbar/>
                    </div>
                   
                      <Usercart/>
                    </div>
                   
                </div>
               </Toolbar>
            </AppBar>
    </div>
  )
}