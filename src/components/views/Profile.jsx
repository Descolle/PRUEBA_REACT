import React from 'react'
import './Profile.css'

const Profile = () => {
  return (
    <div className='profile_container'>
      <div className='profile'>
        <img src='https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg' alt='Profile Picture' className='profile_pic'></img>
        <p>correofalso@noexiste.cl</p>
        <button className='profile_btn'>🖋️Edit Profile</button>
          <ul>Info Contact</ul>
          <ul>Address</ul>
          <ul>Orders</ul>
          <ul>Close Session</ul>
      </div>
      <div className='square d-flex justify-content-center align-items-center'>
        <img src='https://www2.udec.cl/~joseparra/2.png' alt='sitio en construcción' className='square_underconstruction'></img>
      </div>
      </div>
  )
}

export default Profile