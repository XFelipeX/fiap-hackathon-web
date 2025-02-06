import styled from 'styled-components'

export const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.headerBackground};
  z-index: 0;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  padding: 30px 20px;
`;

export const UserName = styled.p`
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

export const OptionsButtonContainer = styled.div`
  position: relative;
`;

export const OptionsButton = styled.button`
  height: fit-content;
  border: none;
  border-radius: 5px;
  font-size: 15pt;
  padding: 10px 30px;
  color: ${({ theme }) => theme.colors.buttonText};
  cursor: pointer;
  background-color: inherit;
`;

export const ToggleMenu = styled.div`
  z-index: 100;
  position: absolute;
  right: 0px;
  background-color: ${({ theme }) => theme.colors.secondBackground};
  border-radius: 5px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.4);
`;

export const ToggleMenuList = styled.ul`
  list-style-type: none;
  padding: 10px 50px 10px 20px;
`;

export const ToggleMenuItem = styled.li`
  padding: 5px;
  margin: 3px;
  text-align: left;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;