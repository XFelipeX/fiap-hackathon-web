import styled from 'styled-components'
import { Colors } from "../../constants/Colors"

const colors = Colors.dark

export const Loading = styled.div`
  background-color: ${colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;