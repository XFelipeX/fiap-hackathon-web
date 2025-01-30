import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const colors = Colors.dark;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-color: ${colors.background};
  color: #fff;
  padding: 20px 0;
`;

export const Title = styled.h2`
  margin: 30px 150px;
  font-weight: normal;
`;

export const MenuItem = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;
  color: #bdbdbd;

  &:hover {
    color: #fff;
  }
`;

export const Button = styled.button<{ primary?: boolean }>`
  background-color: ${(props) => (props.primary ? colors.buttonBackground : "#3c3c3c")};
  color: ${(props) => (props.primary ? "#fff" : "#bdbdbd")};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 10px 5px;
  cursor: pointer;
  font-size: 16px;
  width:150px;
  &:hover {
    opacity: 0.9;
  }
`;

export const ContentPrimary = styled.div`
  display: flex;
  align-self: center;
  margin 0 auto;
  justify-content: space-between;
  align-items: center;
`;

export const FilePanel = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 500px;
  background-color: ${colors.secondBackground};
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
  color: ${colors.text};
  text-decoration: none;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ContentSecondary = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GeneratedCode = styled.div<{ code?: string }>`
  display: ${(props) => (props.code ? 'block' : 'none')};
  text-align: center;
  margin-top: 20px;
  font-size: 18px;

  strong {
    font-size: 32px;
    display: block;
    margin-top: 10px;
    color: #fff;
    letter-spacing: 5px;
  }
`;

export const FormContainer = styled.div`
  margin-right: 50px;
`;

export const InputContainer = styled.div`
  margin-right: -10px;
`;

export const SelectInput = styled.select`
  background-color: ${colors.secondBackground};
  outline: none;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  color: ${colors.text};
  font-size: 12pt;
  padding: 10px 10px;
  width: 350px;
`;

export const Error = styled.div`
  color: ${colors.deleteButtonBackground};
  margin-bottom: -25px;
`;

export const SubmitButton = styled.button`
  display: block;
  border: none;
  border-radius: 5px;
  background-color: ${colors.buttonBackground};
  color: ${colors.buttonText};
  font-size: 16px;
  width: 150px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.buttonBackgroundHover}
  }
`;