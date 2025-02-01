import React, { useState } from 'react';
import styled from 'styled-components';
import {
  FaHome,
  FaUser,
  FaBars,
  FaClock,
  FaChild,
  FaSchool,
} from 'react-icons/fa';
import { FaNoteSticky, FaPerson } from 'react-icons/fa6';
import { Button } from './styles';
import { useNavigate } from 'react-router-dom';
interface NavItem {
  id: number;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const navItems: NavItem[] = [
  { id: 1, label: 'Aulas hoje', icon: <FaHome size={18} />, path: '/' },
  {
    id: 2,
    label: 'Planos de ensino',
    icon: <FaUser size={18} />,
    path: '/plan',
  },
  { id: 3, label: 'Turmas', icon: <FaChild size={18} />, path: '/class' },
  {
    id: 3,
    label: 'Cronogramas',
    icon: <FaClock size={18} />,
    path: '/timeline',
  },
  {
    id: 3,
    label: 'Gestão de pessoas',
    icon: <FaPerson size={18} />,
    path: '/people',
  },
  {
    id: 3,
    label: 'Boletim',
    icon: <FaNoteSticky size={18} />,
    path: '/result',
  },
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
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  overflow-x: hidden;
  transition: width 0.3s ease;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: space-between;
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
  const [isExpanded, setIsExpanded] = useState(
    localStorage.getItem('isExpanded') === 'true',
  );
  const navigate = useNavigate();

  const toggleSidebar = () => {
    localStorage.setItem('isExpanded', JSON.stringify(!isExpanded));
    setIsExpanded(!isExpanded);
  };

  return (
    <SidebarContainer isExpanded={isExpanded}>
      <SidebarHeader>
        <MenuToggle onClick={toggleSidebar}>
          <FaBars />
        </MenuToggle>
        {/* {isExpanded && <h1>Logo</h1>} */}
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
      <Button onClick={() => navigate('/startlesson')}>
        {isExpanded ? 'Iniciar Aula' : <FaSchool size={18} />}
      </Button>
    </SidebarContainer>
  );
};

export default Sidebar;
