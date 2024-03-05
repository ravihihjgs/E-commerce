import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer '>
      <h4 className='text-center size-1px mt-3'>All Right Reserve &copy; Artifulstitches</h4>
      <p className='text-center '>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/Policy">Privacy Policy</Link>


      </p>
    </div>
  )
}

export default Footer
