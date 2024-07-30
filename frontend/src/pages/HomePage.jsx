import React from 'react'


import { ColorModeSwitcher } from '../ColorModeSwitcher'; //swithc the colors mode

const HomePage = () => {
  return (
    <>
      <h1>Home</h1>
      <ColorModeSwitcher justifySelf="flex-end" />
    </>
  )
}

export default HomePage
