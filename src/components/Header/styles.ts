import styled from 'styled-components'
import { Colors } from '../../constants/Colors'

const colors = Colors.dark

export const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: ${colors.headerBackground};
  z-index: 0;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  padding: 30px 20px;
`;

export const UserName = styled.p`
  color: ${colors.buttonText};
  cursor: pointer;
`;