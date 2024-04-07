import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './Appwrite/auth'
import {login, logOut} from './store/authSlice'
import {Header, Footer} from './components'
import './index.css'

function App() {

  const [loading, setloading] = useState(true);
  const dispatch = useDispatch()
  useEffect(() => {
      authService.getCurrentUser()
      .then((userData) => {
          if(userData){
              dispatch(login({userData}))
          }
          else{
              dispatch(logOut())
          }
      })
      .finally(()=> setloading(false))
  }, [])

  return !loading ? (
    <div className='text-white min-h-screen flex flex-wrap content-between p-2 bg-slate-800'>
      <div className='w-full block'>
        <Header />
        <main>
          {/* outlet */}
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
