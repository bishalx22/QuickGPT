import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import MarkDown from 'react-markdown'
import Prism from 'prismjs'

const Message = ({ message }) => {

  useEffect (()=>{
    Prism.highlightAll();
  },[message.content])

  return (
    <div>
      {message.role === "user" ? (
        <div className='flex items-start justify-end my-4 gap-2'>
          <div className='flex flex-col gap-2 p-2 px-4 bg-slate-50 border border-[#80609F]/30 rounded-md max-w-2xl'>
            <p className='text-sm '>{message.content}</p>
            <span className='text-xs text-gray-400'>{moment(message.timestamp).fromNow()}</span>
          </div>
          <img src={assets.user_icon} alt="" className='w-8 rounded-full' />
        </div>
      )
        :
        (
          <div className='inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20  border-[#80609F]/30 rounded-md my-4'>
            {message.isImage ? (
              <img src={message.content} alt="" className='w-full max-w-md mt-2 rounded-md' />
            ) :
              (
                <div className='text-sm reset-tw'> <MarkDown>{message.content}</MarkDown></div>
              )}
              <span className=''>{moment(message.timestamp).fromNow()}</span>
          </div>
        )
      }
    </div>
  )
}

export default Message
