import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
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
  color: ${({ theme }) => theme.colors.text};
  font-size: 16pt;
`;

export const TestsButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondBackground};
  color: ${({ theme }) => theme.colors.text};
  font-size: 16pt;
  border: none;
  border-radius: 5px;
  padding: 10px 40px;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

export const TestsButtonAnchor = styled.a`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16pt;
  text-decoration: none;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondBackground};
  padding: 40px 40px 5px 40px;
  border-radius: 10px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

export const FeedBack = styled.p`
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: 35px;
`;

export const LessonItemContainer = styled.div`
  flex: 1;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  margin-bottom: 40px;
`;

export const LessonItemContentContainer = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TimeDate = styled.p`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 18px;
`;

export const Info = styled.div`
  display: flex;
  gap: 35px;
`;

export const InfoItem = styled.p`
  color: ${({ theme }) => theme.colors.text};
`;

export const FilesButton = styled.button`
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  height: fit-content;
  border: none;
  border-radius: 5px;
  padding: 10px 40px;
  color: ${({ theme }) => theme.colors.buttonText};
  cursor: pointer;
`;
