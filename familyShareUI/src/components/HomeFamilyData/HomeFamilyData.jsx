/* eslint-disable react/prop-types */

import { Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "./homeFamilyData.css"

const HomeFamilyData = ({data}) => {

  console.log("Data passed to HomeFamilyData component is: ", data);
  return (
    // <Card sx={{marginBottom: 2}}>  
    <div className='card'>    
      <Link to={`/family_group/${data.Id}`}>      
        <div style={{display: "flex", flexDirection:"row", alignItems: "center", gap:"10px"}}>
          <Avatar />
            <Typography>
              {data.familyName}
            </Typography>
        </div>      
      </Link>
    </div>
    // </Card>
  )
}

export default HomeFamilyData