import React, { useEffect, useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { FaPlus, FaRegTrashAlt  } from "react-icons/fa";
import { db, storage } from '../../services/firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from "firebase/storage"

import {
  FilePanelContainer,
  PanelHeaderContainer,
  FilesList,
  AddButton,
  File,
  Link,
  ButtonsContainer,
} from './styles'

interface File {
  name: string
  type: string
  url: string
}

interface Lesson {
  id: string
  timeDate: any
  teacherId: string
  teacher: any
  subject: string
  classId: string
  class: any
  status:  'agendada' | 'concluída' | 'cancelada'
  files: File[]
  code: string
}

interface FilePanelProps {
  isVisible: boolean
  lesson: Lesson
  onAdd: () => void
  onClose: () => void
}

const handleDeleteFile = async (fileToDelete: File, currentLesson: Lesson | null) => {
  console.log(fileToDelete)
  if (!currentLesson) return

  if (!confirm(`Tem certeza que deseja excluir o arquivo ${fileToDelete.name} ?`)) {
    return
  }

  const lessonsCollection = collection(db, 'lessons')
  const lessonDoc = doc(lessonsCollection, currentLesson.id)

  const updatedFiles = currentLesson.files.filter(
    file => file.url !== fileToDelete.url
  )

  try {
    await updateDoc(lessonDoc, { files: updatedFiles })
    console.log('Arquivo removido do Firestore com sucesso')

    if (fileToDelete.type !== "YouTube" && fileToDelete.type !== "Web") {
      const fileRef = ref(storage, fileToDelete.url)
      await deleteObject(fileRef)
      console.log("Arquivo removido do Firebase Storage com sucesso")
    }

  } catch (e) {
    console.error('Erro ao excluir arquivo: ', e)
  }
}

const FilePanel :React.FC<FilePanelProps> = ({ isVisible, lesson, onAdd, onClose }) => {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null >(null)
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    setCurrentLesson(lesson)
  }, [lesson])

  useEffect(() => {
    setCurrentLesson(lesson);
  }, [lesson]);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
    } else {
      setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }
  }, [isVisible]);

  if (!shouldRender) return null
  
  return (
    <FilePanelContainer isVisible={isVisible}>
      <PanelHeaderContainer>
        <h2>Arquivos da Aula</h2>
        <IoClose onClick={() => onClose()} size={30} style={{cursor: 'pointer'}}/>
      </PanelHeaderContainer>
      <FilesList>
        {currentLesson && currentLesson?.files.length > 0 ? (
          currentLesson?.files.map((file) => (
            <File>
              <Link href={file.url} target="_blank">{file.name} - {file.type}
            </Link>
              
              <ButtonsContainer>
                <FaRegTrashAlt onClick={() => handleDeleteFile(file, currentLesson)} size={24} style={{cursor: 'pointer'}} />
              </ButtonsContainer>
            </File>
          ))
        ): (
          <p>Não há arquivo para exibir.</p>
        )}
      </FilesList>
      {currentLesson && (
        <AddButton onClick={() => onAdd()}><FaPlus size={18} />Adicionar</AddButton>
      )}
    </FilePanelContainer>
  )
}

export default FilePanel