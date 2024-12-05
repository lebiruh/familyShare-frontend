import {Box, CircularProgress} from '@mui/material'
import {
  useQuery,
} from '@tanstack/react-query'
// import styled from '@emotion/styled'
import HomeFamilyData from '../HomeFamilyData/HomeFamilyData'
import { getUserByEmail } from '../../helpers/user'
import { getFamilies } from '../../helpers/family'
import "./homeFamily.css"
import { useState } from 'react'
import AddGroup from '../AddGroup/AddGroup'


const HomeFamily = ({userEmail}) => {

  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false)

//   const UserBox = styled(Box) ({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '10px',
//   marginBottom: '20px',
// })

  const { data: user } = useQuery({ queryKey: ["user", userEmail], queryFn: () => getUserByEmail(userEmail) })

  console.log("userData for family frontend is: ", user);

  const userId = user?.data[0]?.id;

  console.log("The user ID is: ", userId);

  const familiesQuery = useQuery({ queryKey: ["families", userId], queryFn: () => getFamilies(userId), enabled: !!userId })

  console.log("data is: ", familiesQuery);


  const handleAddGroupClick = () => {
  setIsAddGroupOpen(true)
  document.body.style.overflow = 'hidden'
  } 

  return (
    <Box flex={3}>
      {
        familiesQuery.isLoading ? 
        <CircularProgress /> :
        familiesQuery.error ? 
        <h1>Error</h1> : 
        familiesQuery?.data?.data === '' ? 
        <div className='homePage_welcome_container'>
          <h3 className='homePage_welcome'>Welcome to familyShare!</h3> 
          <p className='homePage_start_sharing'><span onClick={handleAddGroupClick}>Create</span> private family groups, Upload photos and Share memories with ease.</p>
        </div> :
        familiesQuery?.data?.data.map((data, idx) => (
        <HomeFamilyData data = {data} key={idx}/>
      ))
      }
      {
        isAddGroupOpen && <AddGroup setIsAddGroupOpen={setIsAddGroupOpen} userId={userId}/>
      } 
    </Box>
  )
}

export default HomeFamily;