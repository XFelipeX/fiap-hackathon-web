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

export const TableResultContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 50px;
`;

export const ContentContainer = styled.div`
  background-color: ${colors.secondBackground};
  border-radius: 10px;
  width: 40%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const BimesterTitle = styled.h3`
  color: white;
  margin-top: 10px;
  text-align: center;
  font-size: 18px;
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
    border-radius: 10px;
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
    padding: 20px;
  }
`;