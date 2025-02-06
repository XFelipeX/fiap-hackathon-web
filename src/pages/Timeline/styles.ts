import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  padding: 65px 20% 50px 20%;

  @media (max-width: 1360px) {
    padding: 95px 10% 50px 10%;
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.text};
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
    background: ${({ theme }) => theme.colors.secondBackground};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.buttonBackground};
    border-radius: 8px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.buttonBackgroundHover};
  }
`;


export const Table = styled.table`
  background-color: ${({ theme }) => theme.colors.secondBackground};
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.text};
  border-collapse: collapse;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  text-align: center;
  &:last-child {
    border: none;
  }
`;

export const TableHeader = styled.th`
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  padding: 8px;
  text-align: center;
`;

export const TableData = styled.td`
  border-left: 1px solid ${({ theme }) => theme.colors.text};
  padding: 0px 45px;
  text-align: center;
`;

export const TableDataFirst = styled.td`
  padding: 10px 15px;
  text-align: center;
`;