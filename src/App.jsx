import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './Appwrite/auth'
import {login, logOut} from './store/authSlice'
import {Header, Footer} from './components'
import './index.css'
import {Outlet} from 'react-router-dom'

function App() {

  const [loading, setloading] = useState(true);
  const dispatch = useDispatch()
  const SetUp = async() => {
      authService.getCurrentUser().then((userData) => {
          if(userData){
              dispatch(login({userData}))

          }
          else{
              dispatch(logOut())
          }
      })
      
  }
  useEffect(() => {
       SetUp()
       setloading(false)
  }, [])

  return !loading ? (
    <div className='text-white min-h-screen flex flex-wrap content-between p-2 bg-gradient-to-r from-cyan-950 to-purple-950'>
      <div className='w-full h-[98vh] block text-center'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
