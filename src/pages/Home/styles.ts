import styled from 'styled-components'
import { Colors } from "../../constants/Colors";

const colors = Colors.dark;

export const MainContainer = styled.div`
  background-color: ${colors.background};
  min-height: 100vh;
  padding: 95px 20% 50px 20%;
`;

export const TopContainer = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

export const Title = styled.p`
  color: ${colors.text};
  font-size: 16pt;
`;

export const TestsButton = styled.button`
  background-color: ${colors.secondBackground};
  color: ${colors.text};
  font-size: 16pt;
  border: none;
  border-radius: 5px;
  padding: 10px 40px;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

export const TestsButtonAnchor = styled.a`
  color: ${colors.text};
  font-size: 16pt;
  text-decoration: none;
`;

export const ContentContainer = styled.div`
  background-color: ${colors.secondBackground};
  padding: 40px 40px 5px 40px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

export const ClassItemContainer = styled.div`
  border: 1px solid ${colors.text};
  border-radius: 5px;
  margin-bottom: 40px;
`;

export const ClassItemContentContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TimeDate = styled.p`
  font-weight: bold;
  color: ${colors.text};
  margin-bottom: 18px;
`;

export const Info = styled.div`
  display: flex;
  gap: 35px;
`;

export const InfoItem = styled.p`
  color: ${colors.text};
`;

export const FilesButton = styled.button`
  background-color: ${colors.buttonBackground};
  height: fit-content;
  border: none;
  border-radius: 5px;
  padding: 10px 40px;
  color: ${colors.buttonText};
  cursor: pointer;
`;
