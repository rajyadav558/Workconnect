import { ServerURL } from "@/app/fetchservices/FetchnodeServices";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import {useRouter} from 'next/navigation';

export default function CategoryComponent({Category}) {

  const Router=useRouter()



  const check=(id)=>{
    
    Router.push(`/subcategory/${id}`)
  }


  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        flexWrap: "wrap",
      }}
    >
      <div style={{display:"flex",flexWrap:"wrap",fontSize:38,width:"90%"}}>Home services at your doorstep</div>
      <Grid container spacing={7} sx={{margin:1,padding:4,border:"0.4px solid #e3e3e3",borderRadius:5}}>
      {Category.map((item, index) => {
       return <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={()=>check(item.categoryid)}
        >
          {/* Icon Box */}
          <Box
            sx={{
              width: 90,
              height: 90,
              border: "1px solid #d9d9d9",
              borderRadius: "16px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <img
              src={`${ServerURL}/images/${item.categoryicon}`}
              alt={item.categoryname}
              style={{
                width: 45,
                height: 45,
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Name */}
          <Typography
            sx={{
              mt: 1.5,
              fontSize: "14px",
              fontWeight: 400,
              color: "#111",
            }}
          >
            {item.categoryname}
          </Typography>
        </Box>
      })}
      </Grid>
    </Box>
  );
}