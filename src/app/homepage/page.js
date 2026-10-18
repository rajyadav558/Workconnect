import Addcardcomponent from "../components/addcardComponent/Addcardcomponent";
import Cardslider from "../components/cardslidercomponent/Cardslider";
import Footercomponent from "../components/footerComponent/Footercomponent";
import Header from "../components/headercomponent/Header";
import Homepageimage from "../components/homepageimagecomponent/Homepageimage";




export default function Homepage(){

    const addcom=[{id:1,image:"add1.jpg"},{id:2,image:"add2.jpg"}]

    const footer=[{heading:"Company",para:"About us Investor Relations Terms & conditions Privacy policy Anti-discrimination policy Careers "},
        {heading:"For customers",para:"UC reviews Catgories near you Contact us "},
        {heading:"For professionals",para:"Register as a professional "},
        {heading:"Social links",icon1:"<RxTwitterLogo/>",icon2:"<LiaFacebook/>",icon3:"<RxInstagramLogo/>",icon4:"<TiSocialLinkedinCircular/>"}
    ]


    return(<div style={{width:"100%",fontFamily:"-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Oxygen-Sans, Ubuntu, Cantarell, Helvetica, Arial, sans-serif"}}>
            <Header/>
        
            <div style={{paddingTop:"100px"}}>
                <div style={{height:"700px",width:"100%",display:"flex",alignItems:"center"}}>
               <Homepageimage/>
            </div>

             <div style={{height:"300px",width:"100%",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
                <div style={{fontSize:"36px",width:"83%",textAlign:"left",lineHeight:"44px",color:"#0f0f0f",fontWeight:"600",}}>Offers & discounts</div>
               <div style={{height:"300px",display:"flex",justifyContent:"center",alignItems:"center",width:"90%"}}>
                <Cardslider/>
               </div>
            </div>
              
              <Addcardcomponent data={addcom} />

             
            </div>
             <div style={{width:"100%",height:"400px",display:"flex",justifyContent:"center",paddingTop:"20px",backgroundColor:"#F5F5F5",marginTop:"80px"}}>
              <Footercomponent footer={footer} />
              </div>
        </div>
    )
}