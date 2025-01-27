import styled from 'styled-components'
import { Colors } from "../../constants/Colors";

const colors = Colors.dark;

export const MainContent = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
  padding: 95px 10% 50px 15%;

  @media (max-width: 1360px) {
    padding: 95px 5% 50px 10%;
  }
`;

export const Add = styled.button`
  background-color: ${colors.buttonBackground};
  height: fit-content;
  border: none;
  border-radius: 5px;
  font-size: 15pt;
  padding: 10px 30px;
  color: ${colors.buttonText};
  cursor: pointer;
  margin-bottom: 40px;
`;

export const ContentContainer = styled.div`
  background-color: ${colors.secondBackground};
  border-radius: 10px;
  min-width: 450px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  overflow: auto;
`;

export const Table = styled.table`
  color: ${colors.text};
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${colors.text};
  &:nth-child(even) {
    background-color: ${colors.thirdBackground};
  }
  &:last-child {
    border: none;
    border-radius: 10px;
  }
`;

export const TableHeader = styled.th`
  color: ${colors.text};
  padding: 20px;
  font-weight: normal;

  @media (max-width: 1360px) {
    padding: 20px;
  }
`;

export const TableData = styled.td`
  color: ${colors.text};
  padding: 20px;
  text-align: center;
  font-weight: normal;

  @media (max-width: 1360px) {
    padding: 20px;
  }
`;

export const EditButton = styled.button`
  background-color: ${colors.editButtonBackground};
  height: fit-content;
  border: none;
  border-radius: 5px;
  font-size: 15pt;
  padding: 10px 30px;
  color: ${colors.buttonText};
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  background-color: ${colors.deleteButtonBackground};
  height: fit-content;
  border: none;
  border-radius: 5px;
  font-size: 15pt;
  padding: 10px 30px;
  color: ${colors.buttonText};
  cursor: pointer;
`;