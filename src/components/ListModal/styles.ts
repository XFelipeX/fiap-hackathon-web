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

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 20px;
`;

export const List = styled.ul`
  list-style: none;
`;

export const ListItem = styled.li`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 5px;
`;