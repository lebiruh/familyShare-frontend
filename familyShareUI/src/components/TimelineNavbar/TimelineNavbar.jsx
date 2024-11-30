
import Avatar from '@mui/material/Avatar';
import "./timelineNavbar.css"
import { useEffect, useState } from 'react';
import { useAuth } from '../../helpers/useAuth';
import { AuthProvider } from '../../Context/AuthContext/AuthContext';
import { IoMdSearch } from "react-icons/io";
import SearchResults from '../SearchResults/SearchResults';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../../helpers/search';
import { useNavigate } from 'react-router-dom';

const TimelineNavbar = () => {

  const [userData, setUserData] = useState({});
  const [query, setQuery] = useState('');

  const {authData} = useAuth(AuthProvider);

  // console.log("User data: " + userData?.firstName + " " + userData?.lastName[0]);

  const navigate = useNavigate();

  useEffect(() => {

    setUserData(authData);

  }, [authData]);

  const {data: results = [], isLoading} = useQuery({queryKey:['searchResults', query], 
    queryFn: () => fetchUsers(query), 
    enabled: !!query,
    staleTime: 1000 * 60 * 5
  })

  return (
    <>
      <div className="timeline_navbar_container">
        <div className="logo_input_container">
          <div className='logo' onClick={() => navigate('/')}>
            <span className="family">family</span><span className="share">Share</span>
          </div>
          <div className="input">
            <IoMdSearch color='#3B3D3E' width={40}/>
            <input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)}/>
            <SearchResults query={query} results={results} isLoading={isLoading} setQuery={setQuery}/>
          </div>
        </div>
        <div className="welcome">
          <span><i>Hello</i>, {userData?.firstName}</span> <span><Avatar >{authData?.firstName[0].toUpperCase()}</Avatar></span>
        </div>
      </div>
      <div className="timeline_navbar_container_small_screen">
        <div className="logo_input_container_small_screen">
          <div className='logo' onClick={() => navigate('/')}>
            <span className="family">f</span><span className="share">S</span>
          </div>
          <div className="input_small_screen">
            <IoMdSearch color='#3B3D3E'/>
            <input type="text" placeholder="Search"/> 
          </div>
        </div>
        <div className="welcome_small_screen">
          <span><Avatar >{authData?.firstName[0].toUpperCase()}</Avatar></span>
        </div>
      </div>
    </>
  )
}

export default TimelineNavbar