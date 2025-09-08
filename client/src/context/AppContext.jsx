import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyChats, dummyUserData } from '../assets/assets'

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const navigate = useNavigate()
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [selectedChats, setSelectedChats] = useState(null);

  const fetchUser = async () => {
    setUser(dummyUserData)
  }

  const fetchUserChats = () => {
    setChats(dummyChats)
    setSelectedChats(dummyChats[0])
  }

  useEffect(() => {
    fetchUser();
  }, [])

  useEffect(() => {
    if (user) {
      fetchUserChats()
    } else {
      setChats([])
      setSelectedChats(null)
    }
  }, [user])

 

  const value = {
    navigate, user, setUser, fetchUser, chats, setChats, selectedChats, setSelectedChats
  }
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)