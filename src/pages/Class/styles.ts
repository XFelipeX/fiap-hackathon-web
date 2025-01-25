import styled from 'styled-components'

export const MainContent = styled.div`
  background-color: #1D2123;
  min-height: 100vh;
  padding: 95px 20% 250px 20%;

  @media (max-width: 1360px) {
    padding: 95px 15% 250px 15%;
  }
`;

export const Add = styled.button`
  background-color: #ED145B;
  height: fit-content;
  border: none;
  border-radius: 5px;
  font-size: 15pt;
  padding: 10px 30px;
  color: white;
  cursor: pointer;
  margin-bottom: 40px;
`;

export const ContentContainer = styled.div`
  background-color: #333C40;
  border-radius: 10px;
  min-width: 450px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  overflow: visible;
`;

export const Table = styled.table`
  color: white;
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid white;
  &:nth-child(even) {
    background-color: #404E55;
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

export const OptionsButtonContainer = styled.div`
  position: relative;
`;

export const OptionsButton = styled.button`
  background-color: #0C8CE9;
  height: fit-content;
  border: none;
  border-radius: 5px;
  font-size: 15pt;
  padding: 10px 30px;
  color: white;
  cursor: pointer;
`;

export const ToggleMenu = styled.div`
  z-index: 100;
  position: absolute;
  top: 80%;
  left: 25%;
  background-color: #333C40;
  border-radius: 5px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.4);
`;

export const ToggleMenuList = styled.ul`
  list-style-type: none;
  padding: 10px 50px 10px 20px;
`;

export const ToggleMenuItem = styled.li`
  padding: 5px;
  margin: 3px;
  text-align: left;
  cursor: pointer;
`;