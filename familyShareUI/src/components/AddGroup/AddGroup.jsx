import { ImCross } from "react-icons/im"
import "./addGroup.css"
import { useState } from "react";
import {createFamily} from '../../helpers/family';
import { useMutation, useQueryClient } from '@tanstack/react-query';


const AddGroup = ({setIsAddGroupOpen, userId}) => {

  const [groupName, setGroupName] = useState("");
  // const [isDisabled, setIsDisabled] = useState(false);
  const [input, setInput] = useState(false); 

  const queryClient = useQueryClient();

  const createFamilyMutation = useMutation({
      mutationFn: () => createFamily(groupName, userId),
      onSuccess: (response) => {
        if (response.response.status === 409){
          alert("User already exists!")
        } else {
          alert("User successfully added!")
          queryClient.invalidateQueries({queryKey: ["families", userId]})
        }
      },
      onError: (error) => {

        queryClient.invalidateQueries({queryKey: ["families", userId]})
      }
    })

  const handleOnChange = (e) => {
    e.stopPropagation();
    setGroupName(e.target.value);
    !e.target.value ? setInput(false) : setInput(true);
  }


  const handleAddGroupCloseButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddGroupOpen(false);
    document.body.style.overflow = 'auto';
  }

  const handleAddGroupClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    createFamilyMutation.mutate({groupName, userId});
    setInput(false);
    setIsAddGroupOpen(false);
    setGroupName('');
  }

  const stopPropagation = (event) => {
    event.stopPropagation();
  }


  return (
    <div className='add_group_container' onClick={stopPropagation}>
      <form className="add_group_form" onSubmit={handleAddGroupClick}>
        <div className="add_group_menu_bar">
          <span>Create group</span>
          <ImCross className='add_group_menu_bar_cross_icon' onClick={handleAddGroupCloseButtonClick}/>
        </div>
        <hr />
        <div className="create_group_input">
          {/* <IoMdSearch color='#3B3D3E' width={40}/> */}
          <label htmlFor="add_group_name">Group name</label>
          <input id="add_group_name" type="text" placeholder="Type your group name here" value={groupName} onChange={handleOnChange}/>
        </div>
        <div className='addMember_button_container'>
          <button type='submit' disabled={!input} className={ groupName ? 'addMember_button_active' : 'addMember_button_disabled'}>Create</button>
        </div>
      </form>
    </div>
  )
}

export default AddGroup