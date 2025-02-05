import styled from 'styled-components'
import { Colors } from "../../constants/Colors";

const colors = Colors.dark;

export const MainContent = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
  padding: 95px 20% 250px 20%;
  text-align: -webkit-center;

  @media (max-width: 1360px) {
    padding: 95px 10% 250px 15%;
  }
`;

export const TableContainer = styled.div`
  background-color: ${colors.secondBackground};
  border-radius: 10px;
  width: 50%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  overflow: visible;
`;

export const FormContainer = styled.div`
`;

export const InputsContainer = styled.div`
`;

export const InputContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start
`;

export const BottomLineForm = styled.div`
  display: flex;
  margin-bottom: 50px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  color: ${colors.text}
`;

export const TitleInput = styled.input`
  width: 100%;
  height: 50px;
  background-color: ${colors.secondBackground};
  outline: none;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  color: ${colors.text};
  font-size: 12pt;
  padding: 8px 10px;
  margin-bottom: 20px;
`;

export const TextInput = styled.input`
  width: 90%;
  height: 50px;
  background-color: ${colors.secondBackground};
  outline: none;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  color: ${colors.text};
  font-size: 12pt;
  padding: 10px;
`;

export const SelectInput = styled.select`
  width: 90%;
  height: 50px;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 4px;
  background-color: ${colors.secondBackground};
  color: ${colors.text};
  font-size: 12pt;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

export const GradeInput = styled.input`
  padding: 5px;
  font-size: 13pt;
  width: 13%;
  border: none;
  border-radius: 5px;
  text-align: center;
`;

export const Error = styled.div`
  color: ${colors.deleteButtonBackground}
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px;
  &:nth-child(even) {
    background-color: ${colors.thirdBackground};
  }
  &:last-child {
    border: none;
    border-radius: 10px;
  }
  @media (max-width: 1360px) {
    padding: 20px;
  }
`;

export const TableData = styled.td`
  color: white;
  text-align: center;
  font-weight: normal;
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