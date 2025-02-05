import styled from 'styled-components'

export const MainContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  padding: 95px 10% 50px 15%;

  @media (max-width: 1360px) {
    padding: 95px 5% 50px 10%;
  }
`;

export const Add = styled.button`
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  height: fit-content;
  border: none;
  border-radius: 5px;
  font-size: 15pt;
  padding: 10px 30px;
  color: ${({ theme }) => theme.colors.buttonText};
  cursor: pointer;
  margin-bottom: 40px;
`;

export const ContentContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondBackground};
  border-radius: 10px;
  min-width: 450px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  overflow: auto;
`;

export const FeedBack = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  margin: 35px;
`;

export const Table = styled.table`
  color: ${({ theme }) => theme.colors.text};
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.thirdBackground};
  }
  &:last-child {
    border: none;
    border-radius: 10px;
  }
`;

export const TableHeader = styled.th`
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  font-weight: normal;

  @media (max-width: 1360px) {
    padding: 20px;
  }
`;

export const TableData = styled.td`
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
  text-align: center;
  font-weight: normal;

  @media (max-width: 1360px) {
    padding: 20px;
  }
`;

export const EditButton = styled.button`
  background-color: ${({ theme }) => theme.colors.editButtonBackground};
  height: fit-content;
  border: none;
  border-radius: 5px;
  font-size: 15pt;
  padding: 10px 30px;
  color: ${({ theme }) => theme.colors.buttonText};
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  background-color: ${({ theme }) => theme.colors.deleteButtonBackground};
  height: fit-content;
  border: none;
  border-radius: 5px;
  font-size: 15pt;
  padding: 10px 30px;
  color: ${({ theme }) => theme.colors.buttonText};
  cursor: pointer;
`;