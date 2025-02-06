import React, { useEffect, useRef, useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

import {
  HeaderContainer,
  UserName,
  OptionsButtonContainer,
  OptionsButton,
  ToggleMenu,
  ToggleMenuList,
  ToggleMenuItem
} from './styles'

const Header: React.FC = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { toggleTheme, colors } = useTheme()
  const [openMenuIndex, setOpenMenuIndex] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null)

  const toggleMenu = () => {
    setOpenMenuIndex((prevState) => !prevState)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(false)
      }
    };

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, []);

  return (
    <>
      <HeaderContainer>
        <UserName>{user?.email}</UserName>
        <OptionsButtonContainer>
          <OptionsButton><FaUserCircle onClick={() => toggleMenu()} size={35} color={colors.text} style={{cursor: 'pointer'}} /></OptionsButton>
          {openMenuIndex && (
            <ToggleMenu ref={menuRef}>
              <nav>
                <ToggleMenuList>
                  <ToggleMenuItem>Meu perfil</ToggleMenuItem>
                  <ToggleMenuItem onClick={toggleTheme}>Modo</ToggleMenuItem>
                  <ToggleMenuItem>
                    <UserName onClick={() => {
                      logout()
                      navigate('/login')
                      }}>Sair</UserName>
                  </ToggleMenuItem>
                </ToggleMenuList>
              </nav>
            </ToggleMenu>
          )}
        </OptionsButtonContainer>
      </HeaderContainer>
    </>
  )
}

export default Header