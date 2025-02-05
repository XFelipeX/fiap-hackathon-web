import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  padding: 80px 20% 50px 20%;
`;

export const Logo = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: 4px;
`;

export const FormContainer = styled.div`
  width: 30%;
  margin: 250px auto 0px auto;

  @media (max-width: 1366px) {
    width: 45%;
    margin: 120px auto 0px auto;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.colors.text}
`;

export const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14pt;
  padding: 5px;
  background-color: transparent;
`;

export const Error = styled.div`
  color: ${({ theme }) => theme.colors.deleteButtonBackground}
`;

export const Link = styled.a`
  color: ${({ theme }) => theme.colors.text};
`;

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  color: ${({ theme }) => theme.colors.buttonText};
  width: 100%;
  font-size: 14pt;
  padding: 15px 0px;
  margin-top: 55px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.buttonBackgroundHover}
  }

  @media (max-width: 1366px) {
    display: block;
    width: 60%;
    padding: 10px 0px;
    margin: 60px auto 0px auto;
  }
`;