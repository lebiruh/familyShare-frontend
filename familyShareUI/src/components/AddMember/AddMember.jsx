import { useState } from 'react';
import './addMember.css'
import { ImCross } from "react-icons/im";
import { IoMdSearch } from "react-icons/io";
import {fetchUsers} from "../../helpers/search";
import {addFamilyMember} from "../../helpers/family"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const AddMember = ({setIsAddMemberOpen, familyGroupId}) => {

  const [searchUser, setSearchUser] = useState('')
  const [input, setInput] = useState(false); 
  const [isDisabled, setIsDisabled] = useState(false);
  const [memberToBeAdded, setMemberToBeAdded] = useState(null);

  const queryClient = useQueryClient();


  const {data: results = [], isLoading} = useQuery({queryKey:['searchResults', searchUser], 
    queryFn: () => fetchUsers(searchUser), 
    enabled: !!searchUser,
    staleTime: 1000 * 60 * 5
  })

  const addFamilyMemberMutation = useMutation({
      mutationFn: ({familyGroupId, memberToBeAdded}) => addFamilyMember(familyGroupId, memberToBeAdded),
      onSuccess: (response) => {
        if (response.response.status === 409){
          alert("User already exists!")
        } else {
          alert("User successfully added!")
          queryClient.invalidateQueries({queryKey: ["familyMembers", familyGroupId]})
        }
      },
      onError: (error) => {
        // if (error.re)
        console.log("Error is: ", error);
        // alert(error);
        queryClient.invalidateQueries({queryKey: ["familyMembers", familyGroupId]})
      }
    })




  const handleOnChange = (e) => {

    e.stopPropagation();

    setSearchUser(e.target.value);

    !e.target.value ? setInput(false) : setInput(true);
  }

  const handleUserListClick = (user) => {
    setSearchUser(`${user.firstName}`);
    setIsDisabled(true);
    setMemberToBeAdded(user.id);
  }

  const handleAddMemberClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addFamilyMemberMutation.mutate({familyGroupId, memberToBeAdded});
    setInput(false);
    setIsAddMemberOpen(false);
    setSearchUser('');
  }

  const handleAddMemberCloseButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddMemberOpen(false);
    document.body.style.overflow = 'auto';
  }

  const stopPropagation = (event) => {
    event.stopPropagation();
  }

  

  return (
    <div className='add_member_container' onClick={stopPropagation}>
      <form className="add_member_toolbar" onSubmit={handleAddMemberClick}>
        <div className="menu_bar">
          <span>Add member</span>
          <ImCross className='menu_bar_cross_icon' onClick={handleAddMemberCloseButtonClick}/>
        </div>
        <hr />
        <div className="search_input">
          <IoMdSearch color='#3B3D3E' width={40}/>
          <input type="text" placeholder="Search by name or email" value={searchUser} onChange={handleOnChange}/>
        </div>
        <hr />
        <div className='search_user_results'>
          {
            isLoading ? <p>Loading...</p> : (
              results.length === 0 && input === true ? <p>No users found</p> : <ul>{results.map((user) => <li key={user.id} className='users_list' onClick={() => handleUserListClick(user)}><span>{user.firstName} </span><span>{user.lastName}</span></li>)}</ul> 
            )
          }
        </div>
        <div className='addMember_button_container'>
          <button type='submit' disabled={!isDisabled} className={isDisabled && searchUser ? 'addMember_button_active' : 'addMember_button_disabled'}>Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddMember