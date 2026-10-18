import { Grid } from "@mui/material"
import { RxTwitterLogo } from "react-icons/rx";
import { LiaFacebook } from "react-icons/lia";
import { RxInstagramLogo } from "react-icons/rx";
import { TiSocialLinkedinCircular } from "react-icons/ti";

export default function Footercomponent({footer}){
    return(
        <div style={{display:"flex",width:"85%",heigth:"400px"}}>

         <div style={{display:"flex",flexDirection:"column",width:"100%",height:"400px"}} >
            <div style={{width:"100%"}} > <img src='wclogo1.png' style={{width:"150px",objectFit:"cover"}} /></div>
            <div style={{width:"100%",height:"58%",borderBottom:"1px solid #e3e3e3",alignItems:"center"}} >
                <div style={{width:"95%",height:"auto",display:"flex",justifyContent:"space-between"}} >
                   


                  <div  style={{width:"250px",height:"70%"}} >
                            <div style={{fontSize:"20px",marginLeft:"8px",lineHeight:"28px",color:"0f0f0f",fontWeight:"600",textAlign:"left",marginTop:"10px",marginBottom:"10px"}} >Company</div>
                            <div style={{width:"70%",height:"auto",fontSize:"14px",lineHeight:"14px",color:"#545454",fontWeight:"400",marginLeft:"8px",textAlign:"left"}} >
                              <p>About us</p>
                              <p>Investor Relations </p>
                              <p>Terms & conditions  </p>
                              <p>Privacy policy </p>
                              <p>Anti-discrimination policy  </p>
                              <p>Careers </p>
                            </div>
                    </div>

                    
                    <div  style={{width:"250px",height:"70%"}} >
                            <div style={{fontSize:"20px",marginLeft:"8px",lineHeight:"28px",color:"0f0f0f",fontWeight:"600",textAlign:"left",marginTop:"10px",marginBottom:"10px"}} >For customers</div>
                            <div style={{width:"70%",height:"auto",fontSize:"14px",lineHeight:"14px",color:"#545454",fontWeight:"400",marginLeft:"8px",textAlign:"left"}} >
                              <p>UC reviews</p>
                              <p>Categories near you  </p>
                              <p>Contact us </p>
                             
                            </div>
                    </div>

                    <div  style={{width:"250px",height:"70%"}} >
                            <div style={{fontSize:"20px",marginLeft:"8px",lineHeight:"28px",color:"0f0f0f",fontWeight:"600",textAlign:"left",marginTop:"10px",marginBottom:"10px"}} >For professionals</div>
                            <div style={{width:"70%",height:"auto",fontSize:"14px",lineHeight:"14px",color:"#545454",fontWeight:"400",marginLeft:"8px",textAlign:"left"}} >
                              <p>Register as a professional </p>
                              
                            </div>
                    </div>

                    <div  style={{width:"250px",height:"70%"}} >
                            <div style={{fontSize:"20px",marginLeft:"8px",lineHeight:"28px",color:"0f0f0f",fontWeight:"600",textAlign:"left",marginTop:"10px",marginBottom:"10px"}} >Social links</div>
                            <div style={{width:"80%",height:"auto",display:"flex",justifyContent:"space-between",fontSize:"14px",lineHeight:"14px",color:"#545454",fontWeight:"400",marginLeft:"8px",textAlign:"left"}} >
                            <div style={{width:"40px",height:"40px",display:"flex",backgroundColor:"#fff",borderRadius:"40px",justifyContent:"center",alignItems:"center",border:"2px solid #e3e3e3"}}>
                                       <RxTwitterLogo  style={{color:"#0f0f0f",fontSize:"28px"}} />
                              </div>

                              <div style={{width:"40px",height:"40px",display:"flex",backgroundColor:"#fff",borderRadius:"40px",justifyContent:"center",alignItems:"center",border:"2px solid #e3e3e3"}}>
                                       <LiaFacebook  style={{color:"#0f0f0f",backgroundColor:"#fff",fontSize:"28px"}} />
                              </div>

                              <div style={{width:"40px",height:"40px",display:"flex",backgroundColor:"#fff",borderRadius:"40px",justifyContent:"center",alignItems:"center",border:"2px solid #e3e3e3"}}>
                                       <RxInstagramLogo  style={{color:"#0f0f0f",backgroundColor:"#fff",fontSize:"28px"}} />
                              </div>
                              
                              <div style={{width:"40px",height:"40px",display:"flex",backgroundColor:"#fff",borderRadius:"40px",justifyContent:"center",alignItems:"center",border:"2px solid #e3e3e3"}}>
                                       <TiSocialLinkedinCircular  style={{color:"#0f0f0f",backgroundColor:"#fff",fontSize:"28px"}} />
                              </div>
                            
                            
                            </div>
                    </div>

                  
                </div>
                <div style={{width:"90%",height:"auto",marginTop:"60px",fontSize:"12px",lineHeight:"12px",color:"#545454",fontWeight:"400",marginLeft:"8px",textAlign:"left"}}>
                    <p>* As on December 31, 2024</p>
                    <p>© Copyright 2026 Urban Company Limited (formerly known as UrbanClap Technologies India Limited and UrbanClap Technologies India India Limited) All rights reserved. | CIN: L74140DL2014PLC274413</p>
                  </div>
            </div>
         </div>
        </div>
    )
}