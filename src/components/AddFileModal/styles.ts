import styled from 'styled-components';
import { Colors } from '../../constants/Colors';

const colors = Colors.dark

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
  background: ${colors.thirdBackground};
  border-radius: 10px;
  padding: 24px;
  width: 100%;
  max-width: 500px;
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
  border: 1px solid ${colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${colors.text};
  cursor: pointer;
  background: ${({ active }) => (active ? `${colors.buttonBackground}` : `${colors.secondBackground}`)};
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
border: 1px solid ${colors.text};
text-align: center;
cursor: pointer;
margin-bottom: 16px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border-radius: 5px;
  outline: none;
  background: ${colors.secondBackground};
  color: ${colors.text};
  border: 1px solid ${colors.text};
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
  background: ${colors.buttonBackground};
  &:hover {
    background: ${colors.buttonBackgroundHover};
  }
`;

export const Button = styled.button`
  padding: 10px;
  border-radius: 8px;
  color: white;
  border: none;
  cursor: pointer;
  background: ${colors.secondBackground};
  &:hover {
    background: ${colors.background};
  }
`;