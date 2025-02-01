import React, { useEffect, useState } from 'react';
import { IoClose, IoGlobeOutline  } from 'react-icons/io5';
import { FaArrowUpFromBracket, FaYoutube  } from "react-icons/fa6";
import { db } from '../../services/firebase';
import { collection, getDoc, doc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { bouncy } from 'ldrs'
bouncy.register()

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
  Button,
  LoadingContainer,
  Loading
} from './styles'

interface Lesson {
  id: string;
  timeDate: any;
  teacherId: string;
  teacher: any;
  subject: string;
  classId: string;
  class: any;
  status:  'agendada' | 'concluída' | 'cancelada';
  files: File[];
  code: string;
}

interface AddFileModalProps {
  isVisible: boolean;
  onClose: () => void;
  lesson: Lesson;
}

const AddFileModal: React.FC<AddFileModalProps> = ({ isVisible, onClose, lesson }) => {
  const [selectedMethod, setSelectedMethod] = useState<'upload' | 'youtube' | 'web' | ''>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const updateFile = async (fileData) => {
    const lessonsCollection = collection(db, 'lessons')
    const lessonDoc = doc(lessonsCollection, lesson.id)

    try {
      const lessonSnapshot = await getDoc(lessonDoc);
      const lessonData = lessonSnapshot.data();

      if (lessonData) {
        const updatedFiles = [...(lessonData.files || []), fileData];
        await updateDoc(lessonDoc, { files: updatedFiles })

      } else {
        console.error('Documento não encontrado!')
      }
    } catch (e) {
      console.error('Erro ao adicionar arquivo', e)
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (selectedMethod == 'upload') {
      if (file) {
        setIsUploading(true)

        const storage = getStorage()
        const fileRef = ref(storage, `files/${file.name}`)
        const uploadTask = uploadBytesResumable(fileRef, file)

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');

          },
          (error) => {
            console.error("Erro no upload:", error);
            window.alert("Erro ao enviar o arquivo. Tente novamente.");
            setIsUploading(false);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              const fileType = getFileType(file.type);

              const newFile = {
                name: file.name,
                type: fileType,
                url: downloadURL,
              };

              await updateFile(newFile);

            } catch (error) {
              console.error("Erro ao obter URL de download:", error);
              window.alert("Erro ao obter a URL do arquivo. Tente novamente.");

            } finally {
              setIsUploading(false);
              setName('');
              setUrl('');
              setSelectedMethod('');
              onClose();
            }
          }
        );
      }
    } else if (selectedMethod === 'youtube' || selectedMethod === 'web') {
      const newFile = {
        name,
        type: selectedMethod === 'youtube' ? 'YouTube' : 'Web',
        url,
      }

      await updateFile(newFile);
      setName('');
      setUrl('');
      setSelectedMethod('');
      onClose();

    } else {
      window.alert('Selecione um tipo de arquivo')
      return false
    }
  };

  const getFileType = (mimeType: string) => {
    switch (mimeType) {
      case "application/pdf": return 'PDF';
      case "text/plain": return 'TXT';
      case "image/png": return 'PNG';
      case "image/jpeg": return 'JPEG';
      case "image/jpg": return 'JPG';
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": return 'Word';
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": return 'Excel';
      default: return 'Desconhecido';
    }
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
          <OptionButton active={selectedMethod === 'web'} onClick={() => setSelectedMethod('web')}>
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
        {(selectedMethod === 'youtube' || selectedMethod === 'web') && (
          <>
            <Input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="text"
              placeholder="URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </>
        )}

          <ButtonContainer>
            <ButtonSubmit type="submit" >Adicionar</ButtonSubmit>
            <Button type="button" onClick={onClose}>Cancelar</Button>
          </ButtonContainer>
        </form>

        {isUploading && (
          <LoadingContainer>
            <Loading>
              <l-bouncy
              size="45"
              speed="1.75" 
              color="white" 
            ></l-bouncy>
            </Loading>
          </LoadingContainer>
        )}
      </ModalContainer>
    </Overlay>
  );
};

export default AddFileModal;
