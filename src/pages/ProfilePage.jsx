import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUserAction } from '../store/UserSlice'

function ProfilePage() {
    const {myUser} = useSelector(state=>state.userStore)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    function handleLogout(){
        //obrisi tj logut user
        dispatch(logoutUserAction())
        //prebaci me na register
       setTimeout(() => {
        navigate('/register')
       }, 3000);
    }

  return (
    <div className='container mx-auto flex flex-col md:flex-row justify-center items-center mt-12 gap-[50px]'>
        <img className='w-[300px] h-[300px] object-cover rounded-full' src={myUser.image} alt="" />
        <div className='bg-slate-300 w-full p-5 rounded-[20px] flex flex-col gap-3 items-start'>
            <h3>First name: {myUser.firstName}</h3>
            <h3>Last name: {myUser.lastName}</h3>
            <h3>Email: {myUser.email}</h3>
            <h3>Gender: {myUser.gender}</h3>
            <h3>Birthdate: {myUser.birthDate}</h3>
            <button className='px-5 py-2 bg-blue-700 rounded-lg text-white' onClick={handleLogout}>LogOut</button>
        </div>
    </div>
  )
}

export default ProfilePage