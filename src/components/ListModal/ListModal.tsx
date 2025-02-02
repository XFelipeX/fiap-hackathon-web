import React from 'react'
import { IoClose } from 'react-icons/io5';
import {
  Overlay,
  ModalContainer,
  ModalHeader,
  Title,
  List,
  ListItem
} from './styles'

interface ListModalProps {
  title: string
  data: string[]
  isVisible: boolean
  onClose: () => void
}

const ListModal: React.FC<ListModalProps> = ({ title, data, isVisible, onClose }) => {

  if (!isVisible) return null;

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <Title>{title}</Title>
          <IoClose onClick={() => onClose()} size={30} color='white' style={{cursor: 'pointer'}}/>
        </ModalHeader>
        <List>
        {data?.map((item, index) => (
          <ListItem key={index}>{item}</ListItem>
        ))}
        </List>
      </ModalContainer>
    </Overlay>
  )
}

export default ListModal