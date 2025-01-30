import styled from 'styled-components'
import { Colors } from "../../constants/Colors";

const colors = Colors.dark;

export const MainContent = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
  padding: 95px 20% 250px 20%;
  text-align: -webkit-center;

  @media (max-width: 1360px) {
    padding: 95px 15% 250px 15%;
  }
`;

export const ContentContainer = styled.div`
  background-color: ${colors.secondBackground};
  border-radius: 10px;
  width: 50%;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  overflow: visible;
`;

export const Title = styled.h1`
  color: ${colors.text};
  font-size: 25pt;
  margin-bottom: 15px;
  text-align: left;
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

export const TableData = styled.td`
  color: white;
  padding: 30px;
  text-align: center;
  font-weight: normal;

  @media (max-width: 1360px) {
    padding: 20px;
  }
`;