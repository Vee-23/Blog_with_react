import React, {useEffect, useState} from 'react'
import appwriteService from "../Appwrite/ServiceConfig"
import {Container, PostCard} from "../components"
import { useSelector } from 'react-redux'

function HomePage() {
    const [posts, setPosts] = useState([])

    const status = useSelector((state) => state.status)
    const DummyMessage = status ? "No Posts Found" : "Login to View Posts";

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if(posts){
                setPosts(posts.documents)
            }
        })
    }, [])

    if (posts.length === 0) {
        return (
            <div className="w-full min-h-[70vh] py-8 mt-4 flex items-center justify-center overflow-y-scroll">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-auto">
                            <h1 className="text-2xl font-bold text-center hover:text-gray-500">
                               {DummyMessage}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )    }

  return (
    <div className='w-full min-h-[70vh] py-8 overflow-y-scroll'>
      <Container>
        <div className='flex flex-wrap'>
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-1/4'>
                    <PostCard post={post}/>
                </div>
            ))}
        </div>
      </Container>
    </div>
  )
}

export default HomePage
