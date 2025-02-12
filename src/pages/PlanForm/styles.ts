import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  padding: 95px 20% 50px 20%;

  @media (max-width: 1360px) {
    padding: 95px 5% 50px 10%;
  }
`;

export const FormContainer = styled.div`
  width: 50%;
  margin: 0px auto;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 5px;
`;

export const TextInput = styled.input`
  background-color: ${({ theme }) => theme.colors.secondBackground};
  outline: none;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colors.text};
  font-size: 12pt;
  padding: 8px 10px;
  width: 100%;
`;

export const Error = styled.div`
  color: ${({ theme }) => theme.colors.deleteButtonBackground}
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: -5px;
  margin-bottom: 10px;
  padding-left: 15px;
`;

export const CheckBoxInput = styled.input`
  width: 0px;
  height: 35px;
`;

export const CheckBoxLabel = styled.label`
  background-color: ${({ theme }) => theme.colors.secondBackground};
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colors.text};
  padding: 10px 10px;
  cursor: pointer;

  ${CheckBoxInput}:checked + & {
    background-color: ${({ theme }) => theme.colors.buttonBackground};
    color: ${({ theme }) => theme.colors.buttonText};
  }
`;

export const NumberInput = styled.input`
  background-color: ${({ theme }) => theme.colors.secondBackground};
  outline: none;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colors.text};
  font-size: 12pt;
  padding: 8px 10px;
  width: 40%;
`;

export const SelectInput = styled.select`
  background-color: ${({ theme }) => theme.colors.secondBackground};
  outline: none;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colors.text};
  font-size: 12pt;
  padding: 8px 10px;
  width: 100%;
`;

export const SubmitButton = styled.button`
  display: block;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: 14pt;
  padding: 10px 30px;
  margin: 50px auto;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonBackgroundHover}
  }
`;