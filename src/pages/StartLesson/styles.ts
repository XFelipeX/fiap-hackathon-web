import styled, { keyframes } from "styled-components";

interface GoodLessonProps {
  isVisible: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0px);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, 0px);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -10px);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: #fff;
  padding: 50px 0px 20px 0px;
`;

export const Title = styled.h2`
  margin: 30px 150px;
  font-weight: normal;
`;

export const MenuItem = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
  cursor: pointer;
  color: #bdbdbd;

  &:hover {
    color: #fff;
  }
`;

export const Button = styled.button<{ primary?: boolean }>`
  background-color: ${({ theme, primary }) => primary ? theme.colors.buttonBackground : "#3c3c3c"};
  color: ${(props) => (props.primary ? "#fff" : "#bdbdbd")};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 10px 5px;
  cursor: pointer;
  font-size: 16px;
  width:150px;
  &:hover {
    opacity: 0.9;
  }
`;

export const ContentPrimary = styled.div`
  display: flex;
  align-self: center;
  margin 0 auto;
  justify-content: space-between;
  align-items: center;
`;

export const GoodLesson = styled.div<GoodLessonProps>`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0px);
  background: ${({ theme }) => theme.colors.editButtonBackground};
  color: ${({ theme }) => theme.colors.buttonText};
  padding: 15px 20px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 0.5s ease-in-out;
  transition: opacity 0.5s ease-in-out;
`;

export const GoodLessonText = styled.div`
  text-align: center;
  line-height: 50px;
  color: ${({ theme }) => theme.colors.text}
`;


export const ContentSecondary = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const GeneratedCode = styled.div<{ code?: string }>`
  display: ${(props) => (props.code ? 'block' : 'none')};
  text-align: center;
  margin-top: 20px;
  font-size: 18px;

  strong {
    font-size: 32px;
    display: block;
    margin-top: 10px;
    color: #fff;
    letter-spacing: 5px;
  }
`;

export const FormContainer = styled.div`
  margin-right: 50px;
`;

export const InputContainer = styled.div`
  margin-right: -10px;
`;

export const SelectInput = styled.select`
  background-color: ${({ theme }) => theme.colors.secondBackground};
  outline: none;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  color: ${({ theme }) => theme.colors.text};
  font-size: 12pt;
  padding: 10px 10px;
  width: 350px;
`;

export const Error = styled.div`
  color: ${({ theme }) => theme.colors.deleteButtonBackground};
  margin-bottom: -25px;
`;

export const SubmitButton = styled.button`
  display: block;
  border: none;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  color: ${({ theme }) => theme.colors.buttonText};
  font-size: 16px;
  width: 150px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonBackgroundHover}
  }
`;