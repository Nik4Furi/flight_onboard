import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutPage = () => {
    const navigate = useNavigate();


    useEffect(()=>{
        if(localStorage?.getItem('token'))
                localStorage?.removeItem('token')
        navigate('/')
    },[])

  return (
    <>
      <h1>Please wait, You are logout ✈️ ...</h1>
    </>
  )
}

export default LogoutPage
