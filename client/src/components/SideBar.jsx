import React, { useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import moment from 'moment';

const SideBar = ({ isMenuOpen, setIsMenuOpen }) => {

  const { user, setUser, chats, setSelectedChats, navigate } = useAppContext()

  const [search, setSearch] = useState('')


  return (
    <div className={`flex flex-col h-screen min-w-72 p-5 border-r border-[#80609F]/30 bg-white transition-all duration-500 max-md:absolute left-0 z-50 ${!isMenuOpen && 'max-md:-translate-x-full'}`}>
      {/* Logo */}
      <img src={assets.logo_full_dark} alt="" className='w-full max-w-48' />

      {/* New chat Button */}
      <button className='flex justify-center items-center w-full py-2 mt-10 text-white bg-gradient-to-r from-[#A456f7] to-[#3D81F6] text-sm rounded-md cursor-pointer '>
        <span className='mr-2 text-2xl'>+</span> New Chat
      </button>

      {/* Search Conversations */}
      <div className='flex items-center gap-2 p-3 mt-4 border border-gray-400 rounded-md'>
        <img src={assets.searchIcon} alt="" className='w-4' />
        <input onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Search Conversations' className='text-xs placeholder:text-gray-400 outline-none' />
      </div>

      {/* Recents Chats */}
      {chats.length > 0 && <p className='mt-4 text-sm'>Recent Chats</p>}
      <div className='flex-1 overflow-y-scroll mt-3 text-sm space-y-3 '>
        {
          chats.filter((chat) => chat.messages[0] ? chat.messages[0]?.content.toLowerCase().includes(search.toLowerCase()) : chat.name.toLowerCase().includes(search.toLowerCase())).map((chat) => (
            <div onClick={()=> {navigate('/'); setSelectedChats(chat); setIsMenuOpen(false)}}
             key={chat._id} className='p-2 px-4 border border-gray-300 rounded-md cursor-pointer flex justify-between group'>
              <div>
                <p className='truncate w-full '>
                  {chat.messages.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}
                </p>
                <p className='text-xs text-gray-500'>{moment(chat.updatedAt).fromNow()}</p>
              </div>
              <img src={assets.binIcon} alt="" className='w-4.5 py-2 hidden group-hover:block cursor-pointer' />
            </div>
          ))
        }
      </div>

      {/* community images */}
      <div onClick={(() => { navigate('/community'); setIsMenuOpen(false) })} className='flex items-center gap-2 mt-4 p-2 border border-gray-300 rounded-md  cursor-pointer hover:scale-103 transition-all'>
        <img src={assets.galleryIcon} alt="" className='w-8 h-8' />
        <div className='flex flex-col text-sm'>
          <p>Community Images</p>
        </div>
      </div>

      {/* Credit Purchase Option */}
      <div onClick={(() => { navigate('/credits'); setIsMenuOpen(false) })} className='flex items-center gap-2 mt-4 p-2 border border-gray-300 rounded-md  cursor-pointer hover:scale-103 transition-all'>
        <img src={assets.diamond_icon} alt="" className='w-5.5' />
        <div className='flex flex-col text-sm'>
          <p>Credits : {user?.credits}</p>
          <p className='text-xs text-gray-400'>Purchase credits to use quickgpt</p>
        </div>
      </div>

      {/* User Account */}
      <div className='flex items-center gap-3 mt-4 p-2 border border-gray-300 rounded-md cursor-pointer group hover:scale-103 transition-all'>
        <img src={assets.user_icon} alt="" className='w-7 rounded-full' />
        <p className='flex-1 text-sm truncate'>{user ? user.name : 'Login to your account'}</p>
        {user && <img src={assets.logoutIcon} className='h-5 cursor-pointer hidden group-hover:block' />}
      </div>
      
      <img onClick={() => setIsMenuOpen(false)} src={assets.closeIcon} className='absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden' alt="" />

    </div>
  )
}

export default SideBar
