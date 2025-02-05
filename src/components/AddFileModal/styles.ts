import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`;

export const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.thirdBackground};
  border-radius: 10px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
`;

export const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  jusfity-content: center;
  background-color:rgba(0, 0, 0, 0.3);
  z-index: 100000;
`;

export const Loading = styled.div`
  clip-path: circle(45% at 50% 50%);
  background: radial-gradient( rgba(0, 0, 0, 0.1), rgba(237, 20, 91, 1));
  margin: 0px auto;
  padding: 60px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h2`
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const OptionsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

export const OptionButton = styled.button`
  flex: 1;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  background: ${({ theme, active }) => active ? theme.colors.buttonBackground : theme.colors.secondBackground};
  &:hover {
    background: ${({ color }) => color};
  }
`;

export const FileLabel = styled.label`
display: block;
background: #1f2937;
color: white;
padding: 12px;
border-radius: 8px;
border: 1px solid ${({ theme }) => theme.colors.text};
text-align: center;
cursor: pointer;
margin-bottom: 16px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  outline: none;
  background: ${({ theme }) => theme.colors.secondBackground};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.text};
  margin-bottom: 25px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const ButtonSubmit = styled.button`
  padding: 10px;
  border-radius: 8px;
  color: white;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.buttonBackground};
  &:hover {
    background: ${({ theme }) => theme.colors.buttonBackgroundHover};
  }
`;

export const Button = styled.button`
  padding: 10px;
  border-radius: 8px;
  color: white;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.secondBackground};
  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }
`;