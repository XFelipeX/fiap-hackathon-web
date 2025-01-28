import styled from 'styled-components'
import { Colors } from "../../constants/Colors";

const colors = Colors.dark;

export const MainContainer = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
  padding: 80px 20% 50px 20%;
`;

export const Logo = styled.h1`
  text-align: center;
  color: ${colors.text};
  letter-spacing: 4px;
`;

export const FormContainer = styled.div`
  width: 30%;
  margin: 250px auto 0px auto;

  @media (max-width: 1366px) {
    width: 45%;
    margin: 120px auto 0px auto;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

export const Label = styled.label`
  color: ${colors.text}
`;

export const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid ${colors.text};
  color: ${colors.text};
  font-size: 14pt;
  padding: 5px;
  background-color: transparent;
`;

export const Link = styled.a`
  color: ${colors.text};
`;

export const Button = styled.button`
  background-color: ${colors.buttonBackground};
  color: ${colors.buttonText};
  width: 100%;
  font-size: 14pt;
  padding: 15px 0px;
  margin-top: 55px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.buttonBackgroundHover}
  }

  @media (max-width: 1366px) {
    display: block;
    width: 60%;
    padding: 10px 0px;
    margin: 60px auto 0px auto;
  }
`;