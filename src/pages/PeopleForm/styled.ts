import styled from 'styled-components'
import { Colors } from "../../constants/Colors";

const colors = Colors.dark;

export const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${colors.background};
`;

export const FormContainer = styled.div`
  margin: 50px 0px;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
`;

export const InputContainer = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: ${colors.text}
`;

export const TextInput = styled.input`
  background-color: ${colors.secondBackground};
  outline: none;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  color: ${colors.text};
  font-size: 12pt;
  padding: 8px 10px;
  width: 100%;
`;

export const CheckBoxContainer = styled.div`
  background-color: ${colors.secondBackground};
  border-radius: 4px;
`;

export const CheckBoxInputContainer = styled.div`
  display: flex;
`;

export const CheckBoxInput = styled.input`
  width: 0px;
  height: 35px;
`;

export const CheckBoxInputLabel = styled.label`
  width: 100%;
  color: ${colors.text};
  border-radius: 5px;
  cursor: pointer;
  padding: 5px 10px;
  margin: 5px;
  background-color: ${colors.thirdBackground};

  ${CheckBoxInput}:checked + & {
    background-color: ${colors.buttonBackground};
    border: none;
  }
`;

export const Error = styled.div`
  color: ${colors.deleteButtonBackground}
`;

export const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

export const SubmitButton = styled.button`
  background-color: ${colors.buttonBackground};
  color: ${colors.buttonText};
  padding: 10px 50px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16pt;
  &:hover {
    background-color: ${colors.buttonBackgroundHover}
  }
`;