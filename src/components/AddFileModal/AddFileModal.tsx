import React, { useState } from 'react';
import { IoClose, IoGlobeOutline  } from 'react-icons/io5';
import { FaArrowUpFromBracket, FaYoutube  } from "react-icons/fa6";

import {
  Overlay,
  ModalContainer,
  Header,
  Title,
  CloseButton,
  OptionsContainer,
  OptionButton,
  FileLabel,
  Input,
  ButtonContainer,
  ButtonSubmit,
  Button
} from './styles'

interface AddFileModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const AddFileModal: React.FC<AddFileModalProps> = ({ isVisible, onClose }) => {
  const [selectedMethod, setSelectedMethod] = useState<'upload' | 'youtube' | 'site' | ''>('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (selectedMethod == 'upload') {
      console.log('salvar arquivo', file)
    } else if (selectedMethod == 'youtube' || selectedMethod == 'site') {
      console.log('salvar url', url)
    } else {
      window.alert('Selecione um tipo de arquivo')
      return false
    }

    setUrl('');
    setSelectedMethod('');
    onClose();
  };

  if (!isVisible) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>Adicionar Arquivo</Title>
          <CloseButton onClick={onClose} aria-label="Fechar modal">
            <IoClose size={30} color='white' style={{cursor: 'pointer'}}/>
          </CloseButton>
        </Header>

        <OptionsContainer>
          <OptionButton active={selectedMethod === 'upload'} onClick={() => setSelectedMethod('upload')}>
            <FaArrowUpFromBracket size={24} />
            Subir Arquivo
          </OptionButton>
          <OptionButton active={selectedMethod === 'youtube'} onClick={() => setSelectedMethod('youtube')}>
            <FaYoutube size={30} />
            YouTube
          </OptionButton>
          <OptionButton active={selectedMethod === 'site'} onClick={() => setSelectedMethod('site')}>
            <IoGlobeOutline size={30} />
            Site
          </OptionButton>
        </OptionsContainer>

        <form onSubmit={handleSubmit}>
        {selectedMethod === 'upload' && (
          <>
            <FileLabel htmlFor="file-upload">Escolher Arquivo</FileLabel>
            <Input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
            {file && 
              <p style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>{file.name}</p>
            }
          </>
        )}
        {(selectedMethod === 'youtube' || selectedMethod === 'site') && (
          <Input
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        )}

          <ButtonContainer>
            <ButtonSubmit type="submit" >Adicionar</ButtonSubmit>
            <Button type="button" onClick={onClose}>Cancelar</Button>
          </ButtonContainer>
        </form>
      </ModalContainer>
    </Overlay>
  );
};

export default AddFileModal;
