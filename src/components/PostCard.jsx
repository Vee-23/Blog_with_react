import React from 'react'
import service from '../Appwrite/ServiceConfig'
import {Link} from 'react-router-dom'
import parse from 'html-react-parser'

function PostCard({
    post
}) {
        

  return (
   <Link 
   to={`/post/${post.$id}`}
   >
    <div className='w-full bg-gradient-to-bl from-pink-500/60 via-cyan-400/60 to-white/50 rounded-xl p-4 flex flex-row gap-4'>
        <div className='w-1/4 justify-center mb-4'>
            <img src={service.getFilePreview(post.featured_Image)} alt={post.title} 
                className='rounded-xl object-cover'/>

        </div>

        <div className='w-3/4 flex flex-col gap-4'>
        <h2
        className='text-xl font-bold my-2 w-full h-[20%] text-center'>
            {post.title}
        </h2>
            <div className=" overflow-y-auto w-full h-[60%]">
            {parse(post.previewText)}
            </div>
        </div>
    </div>

   </Link>
  )
}

export default PostCard
