import React from 'react'
import PageLogo from '../assets/Business_(442).jpg'

function Logo({width = '100px'}) {
  return (
   <div>
    <img src={PageLogo} width={width} className='rounded-full' alt="Web app logo" />
   </div>
  )
}

export default Logo
