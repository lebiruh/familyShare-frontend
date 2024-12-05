/* eslint-disable react/prop-types */

import { Avatar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "./homeFamilyData.css"

const HomeFamilyData = ({data}) => {

  return (
    <div className='card'>    
      <Link to={`/family_group/${data.Id}`}>      
        <div style={{display: "flex", flexDirection:"row", alignItems: "center", gap:"10px"}}>
          <Avatar className='home_family_avatar'/>
            <Typography>
              {data.familyName}
            </Typography>
        </div>      
      </Link>
    </div>
  )
}

export default HomeFamilyData