import styled from "styled-components";
import { Colors } from "../../constants/Colors";

const colors = Colors.dark;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-color: ${colors.background};
  color: #fff;
  padding: 20px 0;
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
  background-color: ${(props) => (props.primary ? colors.buttonBackground : "#3c3c3c")};
  color: ${(props) => (props.primary ? "#fff" : "#bdbdbd")};
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  margin: 10px 5px;
  cursor: pointer;
  font-size: 16px;
  width:200px;
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
  width: 700px;
`;

export const ContentSecondary = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;


export const GeneratedCode = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 18px;

  strong {
    font-size: 32px;
    display: block;
    margin-top: 10px;
    color: #fff;
  }
`;
