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

export const StudentName = styled.h1`
  color: ${colors.text};
  tex-align: left;
  font-weight: normal;
  margin-bottom: 40px;
`;

export const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  row-gap: 50px;
  column-gap: 20%;
  justify-content: center;
 `;

export const TableResultContainer = styled.div`
  width: 300px
`;

export const ContentContainer = styled.div`
  background-color: ${colors.secondBackground};
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const BimesterTitle = styled.h3`
  color: ${colors.text};
  font-weight: normal;
  margin-bottom: 5px;
  font-size: 18pt;
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
  padding: 20px;
  font-weight: normal;
`;

export const TableData = styled.td`
  color: white;
  padding: 20px;
  text-align: center;
  font-weight: normal;
`;

export const HorizontalLine = styled.hr`
  margin: 50px 0px;
  transform: translateX(15px)
`;

export const StudentInfoContainer = styled.div`
  transform: translateX(15px)
`;

export const StudentInfo = styled.div`
  color: ${colors.text};
  line-height: 56px;
  font-size: 20pt;
`;