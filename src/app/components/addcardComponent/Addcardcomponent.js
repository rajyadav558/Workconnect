import { ServerURL } from "@/app/fetchservices/FetchnodeServices";
import styles from './Addcard.module.css'

export default function Addcardcomponent({data}){
    return(
        <div>
            {data.map((item,index)=>{
                return <div key={index}
  style={{
    height: "400px",
    width: "100%",
    marginTop: "80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <div
  className={styles.imageBox}
  style={{
    height: "400px",
    width: "84%",
    backgroundColor: "pink",
  }}
>
  <img
    src={`${ServerURL}/images/${item.image}`}
    className={styles.categoryImage}
    style={{
      height: "100%",
      width: "100%",
      objectFit: "cover",
    }}
  />
</div>
</div>
                
                
                
                
            })}
        </div>
    )
}