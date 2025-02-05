import styled from "styled-components"; 

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.buttonBackground};
  color: ${({ theme }) => theme.colors.buttonText};
  padding: 10px 20px;
  margin-top:auto;
  margin-bottom: 20px;
  align-self: center;
  cursor: pointer;
  width: 80%;
  outline: none;
  border: none;
  text-transform: uppercase;
  border-radius: 5px;
  &:hover {
    transform: scale(1.1);
  }
  transition: transform 0.3s ease;
`;