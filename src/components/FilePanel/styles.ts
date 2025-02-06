import styled from "styled-components";

export const FilePanelContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 500px;
  background-color: ${({ theme }) => theme.colors.secondBackground};
  color: white;
  transform: translateX(${props => (props.isVisible ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
`;

export const PanelHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
`;

export const FilesList = styled.ul`
  list-style: none;
`;

export const File = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  padding: 5px 10px;
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: 12pt;
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  cursor: pointer;
`;