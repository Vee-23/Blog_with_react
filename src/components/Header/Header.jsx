import React from 'react';
import { Container, Logo, LogOutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

function Header() {

  const authStatus = useSelector((state) => state.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 shadow bg-black rounded-full'>
      <Container>
        <nav className='flex'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='50px'></Logo>
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {
              navItems.map((item) => (
                item.active ? <li key={item.name}>
                  <button onClick={() => navigate(item.slug)}
                  className='inline-block px-6 py-2
                  mx-2 hover:bg-blue-100 hover:text-gray-800 rounded-full transition duration-200'>{item.name}</button>
                </li> : null
              ))
            }
            {authStatus && (
              <li>
                <LogOutBtn></LogOutBtn>
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header