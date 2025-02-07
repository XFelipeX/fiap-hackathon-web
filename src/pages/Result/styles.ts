import styled from 'styled-components'

export const MainContent = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  padding: 95px 20% 250px 20%;

  @media (max-width: 1360px) {
    padding: 95px 15% 250px 15%;
  }
`;

export const UpperContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`;

export const FormContainer = styled.div`
  width: 45%;
`;

export const InputContainer = styled.div`
  display: flex;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: 15pt;
  line-height: 50px;
  padding: 0px 10px;
  border-right: 1px solid ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.secondBackground};
  border-radius: 5px 0px 0px 5px;
`;

export const SelectInput = styled.select`
  width: 100%;
  height: 50px;
  padding: 10px;
  border: none;
  border-radius: 0px 5px 5px 0px;
  outline: none;
  background-color: ${({ theme }) => theme.colors.secondBackground};
  color: ${({ theme }) => theme.colors.text};
  font-size: 12pt;
  cursor: pointer;
`;

export const Add = styled.button`
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  border: none;
  height: 50px;
  border-radius: 5px;
  font-size: 15pt;
  padding: 10px 30px;
  color: white;
  cursor: pointer;
`;

export const ContentContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.secondBackground};
  border-radius: 10px;
  min-width: 450px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  overflow: visible;
`;

export const FeedBack = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  padding: 20px;
`;

export const Table = styled.table`
  color: white;
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid white;
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.thirdBackground};
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
  padding: 25px;
  font-weight: normal;

  @media (max-width: 1360px) {
    padding: 20px;
  }
`;

export const TableData = styled.td`
  color: white;
  padding: 25px;
  text-align: center;
  font-weight: normal;

  @media (max-width: 1360px) {
    padding: 20px 5px;
  }
`;

export const OptionsButtonContainer = styled.div`
  position: relative;
`;

export const OptionsButton = styled.button`
  background-color: ${({ theme }) => theme.colors.editButtonBackground};
  height: fit-content;
  border: none;
  border-radius: 5px;
  font-size: 15pt;
  padding: 10px 30px;
  color: white;
  cursor: pointer;
`;