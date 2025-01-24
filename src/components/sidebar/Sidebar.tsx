import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHome, FaUser, FaBars, FaClock, FaChild } from 'react-icons/fa';
import { FaNoteSticky, FaPerson } from 'react-icons/fa6';

interface NavItem {
  id: number;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { id: 1, label: 'Aulas hoje', icon: <FaHome />, path: '/' },
  { id: 2, label: 'Planos de ensino', icon: <FaUser />, path: '/plan' },
  { id: 3, label: 'Turmas', icon: <FaChild />, path: '/class' },
  { id: 3, label: 'Cronogramas', icon: <FaClock />, path: '/timeline' },
  { id: 3, label: 'Gestão de pessoas', icon: <FaPerson />, path: '/persons' },
  { id: 3, label: 'Boletim', icon: <FaNoteSticky />, path: '/result' },
];

const SidebarContainer = styled.div<{ isExpanded: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: #333c40;
  color: #ecf0f1;
  width: ${(props) => (props.isExpanded ? '250px' : '70px')};
  height: 100vh;
  border-bottom-right-radius: 10px;
  overflow-x: hidden;
  transition: width 0.3s ease;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
`;

const MenuToggle = styled.button`
  background: none;
  border: none;
  color: #ecf0f1;
  font-size: 20px;
  cursor: pointer;
`;

const NavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #34495e;
  }

  a {
    text-decoration: none;
    color: #ecf0f1;
    display: flex;
    align-items: center;
  }
`;

const NavLabel = styled.span<{ isExpanded: boolean }>`
  margin-left: 10px;
  white-space: nowrap;
  display: ${(props) => (props.isExpanded ? 'inline' : 'none')};
`;

const Sidebar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SidebarContainer isExpanded={isExpanded}>
      <SidebarHeader>
        <MenuToggle onClick={toggleSidebar}>
          <FaBars />
        </MenuToggle>
        {isExpanded && <h1>Logo</h1>}
      </SidebarHeader>
      <NavList>
        {navItems.map((item) => (
          <NavItem key={item.id}>
            <a href={item.path}>
              {item.icon}
              <NavLabel isExpanded={isExpanded}>{item.label}</NavLabel>
            </a>
          </NavItem>
        ))}
      </NavList>
    </SidebarContainer>
  );
};

export default Sidebar;
