import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import {
  HeaderContainer,
  UserName
} from './styles'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  return (
    <>
      <HeaderContainer>
        <UserName>{user?.email}</UserName>
        <UserName onClick={() => {
          logout()
          navigate('/login')
          }}>Sair</UserName>
        <FaUserCircle onClick={() => alert('oi')} size={35} color={'white'} style={{cursor: 'pointer'}} />
      </HeaderContainer>
    </>
  )
}

export default Header