import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: #1D2123;
  min-height: 100vh;
  padding: 65px 20% 50px 20%;

  @media (max-width: 1360px) {
    padding: 95px 10% 50px 10%;
  }
`;

export const Title = styled.h1`
  color: white;
  font-size: 16pt;
  margin-bottom: 15px;
`;

export const TableContainer = styled.div`
  display: flex;
  gap: 50px;
  padding: 0px 20px;
  margin-bottom: 60px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #333c40;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ED145B;
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #c11e46;
  }
`;


export const Table = styled.table`
  background-color: #333C40;
  margin-bottom: 20px;
  color: white;
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid white;
  text-align: center;
  &:last-child {
    border: none;
  }
`;

export const TableHeader = styled.th`
  border-bottom: 1px solid white;
  padding: 8px;
  text-align: center;
`;

export const TableData = styled.td`
  border-left: 1px solid white;
  padding: 0px 45px;
  text-align: center;
`;

export const TableDataFirst = styled.td`
  padding: 10px 15px;
  text-align: center;
`;