import styled from 'styled-components'
import { Colors } from "../../constants/Colors";

const colors = Colors.dark;

export const MainContent = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
  padding: 95px 20% 250px 20%;

  @media (max-width: 1360px) {
    padding: 95px 15% 250px 15%;
  }
`;

export const SelectClass = styled.button`
  background-color: ${colors.secondBackground};
  height: fit-content;
  border: none;
  border-radius: 5px;
  font-size: 15pt;
  padding: 10px 30px;
  cursor: pointer;
  margin: 0 0 40px 0;
`;

export const SelectClassContent = styled.p`
  color: white;
`;

export const ContentContainer = styled.div`
  background-color: ${colors.secondBackground};
  border-radius: 10px;
  min-width: 450px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  overflow: visible;
`;

export const Add = styled.button`
  background-color: ${colors.buttonBackground};
  height: fit-content;
  border: none;
  border-radius: 5px;
  font-size: 15pt;
  padding: 10px 30px;
  color: white;
  cursor: pointer;
  margin-bottom: 40px;
  float: inline-end;
`;

export const Table = styled.table`
  color: white;
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid white;
  &:nth-child(even) {
    background-color: ${colors.thirdBackground};
  }
  &:last-child {
    border: none;
  }
  &:last-child td:first-child {
    border-bottom-left-radius: 10px;
  }
  &:last-child td:last-child {
    border-bottom-right-radius: 10px;
  }
`;

export const TableHeader = styled.th`
  color: white;
  padding: 30px;
  font-weight: normal;

  @media (max-width: 1360px) {
    padding: 20px;
  }
`;

export const TableData = styled.td`
  color: white;
  padding: 30px;
  text-align: center;
  font-weight: normal;

  @media (max-width: 1360px) {
    padding: 20px 10px;
  }
`;

export const OptionsButtonContainer = styled.div`
  position: relative;
`;

export const OptionsButton = styled.button`
  background-color: ${colors.editButtonBackground};
  height: fit-content;
  border: none;
  border-radius: 5px;
  font-size: 15pt;
  padding: 10px 30px;
  color: white;
  cursor: pointer;
`;