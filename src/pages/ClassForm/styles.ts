import styled from 'styled-components'
import { Colors } from "../../constants/Colors"

const colors = Colors.dark

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

export const Error = styled.div`
  color: ${colors.deleteButtonBackground}
`;

export const SelectInput = styled.select`
  width: 100%;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 4px;
  background-color: ${colors.secondBackground};
  padding-right: 300px;
  color: ${colors.text};
  font-size: 12pt;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

export const CheckBoxContainerHeader = styled.div`
  margin-top: 50px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end
`;

export const CheckBoxLabel = styled.h1`
  font-size: 16pt;
  color: ${colors.text};
`;

export const SortButton = styled.button`
  border: none;
  outline: none;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 2px;
  font-size: 12pt;
  cursor: pointer;
  color: ${colors.buttonText};
  background-color: ${colors.thirdBackground}
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  color: ${colors.text};
  border-radius: 5px;
  font-size: 14pt;
  cursor: pointer;
  padding: 5px 10px;
  margin: 10px;
  background-color: ${colors.thirdBackground};

  ${CheckBoxInput}:checked + & {
    background-color: ${colors.buttonBackground};
    border: none;
  }

`;

export const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const SubmitButton = styled.button`
  background-color: ${colors.buttonBackground};
  color: ${colors.buttonText};
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16pt;
  &:hover {
    background-color: ${colors.buttonBackgroundHover}
  }
`;