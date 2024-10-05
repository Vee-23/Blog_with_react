import React from 'react'
import PageLogo from '../assets/3r3ld6eo.png'

function Logo({width = '100px'}) {
  return (
   <div>
    <img src={PageLogo} width={width} className='rounded-full' alt="Web app logo" />
   </div>
  )
}

export default Logo
