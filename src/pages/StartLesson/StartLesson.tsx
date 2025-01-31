import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { IoClose } from 'react-icons/io5';
import { FaPlus, FaRegTrashAlt, FaRegEdit  } from "react-icons/fa";
import AddFileModal from '../../components/AddFileModal/AddFileModal';
import { db } from '../../services/firebase';
import { collection, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';
import {
  Container,
  Title,
  Button,
  GeneratedCode,
  ContentPrimary,
  FilePanel,
  PanelHeaderContainer,
  FilesList,
  AddButton,
  File,
  Link,
  ButtonsContainer,
  ContentSecondary,
  FormContainer,
  InputContainer,
  SelectInput,
  Error,
  SubmitButton
} from './styles';

interface Translations {
  subjects: { [key: string]: string }
}

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

interface FormValues {
  lessonId: string
}

const validations = Yup.object({
  lessonId: Yup.string().required('Selecione uma Aula')
})

const translations: Translations = {
  subjects: {
    portuguese: 'Português',
    math: 'Matemática',
    physics: 'Física',
    chemistry: 'Química',
    biology: 'Biologia',
    history: 'História',
    geography: 'Geografia',
    philosophy: 'Filosofia',
    sociology: 'Sociologia',
    art: 'Arte',
    physical_education: 'Educação Física',
    english: 'Inglês',
  }
};

const getCurrentDate = () => {
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()
  return `${day}/${String(month).padStart(2, '0')}/${year}`
}

const StartLesson: React.FC = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false)
  const [isAddFileModalOpen, setIsAddFileModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null >(null)
  const [lessons, setLessons] = useState<Lesson[] | null>()
  const [code, setCode] = useState('')
  const date = getCurrentDate();

  useEffect(() => {
    const fetchLessons = async () => {
      const lessonsCollection = collection(db, 'lessons')

      try {
        const lessonsSnapshot = await getDocs(lessonsCollection)

        const lessonsData: Lesson[] = await Promise.all(
          lessonsSnapshot.docs.map( async (document) => {
            const data = document.data();

            const teacherDocRef = doc(db, 'teachers', data.teacherId);
            const teacherSnapshot = await getDoc(teacherDocRef);
            const teacherData = teacherSnapshot.data();

            const classDocRef = doc(db, 'class', data.classId);
            const classSnapshot = await getDoc(classDocRef);
            const classData = classSnapshot.data();
            
            return {
              id: document.id,
              timeDate: data.timeDate,
              teacherId: data.teacherId,
              teacher: teacherData,
              subject: data.subject,
              classId: data.classId,
              class: classData,
              status:  data.status,
              files: data.files,
              code: data.code
            }
          })
        )
        setLessons(lessonsData)
      } catch (e) {
        console.error("Erro ao buscar aulas:", e)
      }
    }
    fetchLessons()
  }, [])

  const generateCode = async () => {
    if (!selectedLesson) {
      window.alert('Selecione uma aula primeiro')
      return false
    }

    const newCode = (Math.floor(100000 + Math.random() * 900000).toString());

    const lessonsCollection = collection(db, 'lessons')
    const lessonDoc = doc(lessonsCollection, selectedLesson.id)

    try {
      await updateDoc(lessonDoc, { code: newCode })
      console.log('Aula atualizadacom sucesso!')
      setCode(newCode)

    } catch (e) {
      console.error('Erro ao atualizar aula:', e)
    }
  }
  
  const handleLessonSelect = (values: FormValues) => {
    if (lessons) {
      const lesson = lessons.find((lesson) => lesson.id == values.lessonId)
      setSelectedLesson(lesson)

    } else {
      setSelectedLesson(null);
    }
  }

  const handleStart = (values: FormValues) => {
    console.log(values)
  }

  return (
    <Container>
      <Title>Aula do dia { date }</Title>

      <ContentPrimary>
        <FormContainer>
          <Formik
            initialValues={{ lessonId: ''}}
            enableReinitialize={true}
					  validationSchema={validations}
            onSubmit={(values) => handleStart(values)}
          >
            {({ values, handleChange, touched, errors }) => (
              <Form style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <InputContainer>
                  <SelectInput
                    as="select"
                    name="lessonId"
                    id="lessonId"
                    onChange={(e) => {
                      handleChange(e)
                      handleLessonSelect({ lessonId: e.target.value })
                    }}
                    value={values.lessonId}
                  >
                    <option value="">Selecione uma Aula</option>
                    {lessons && lessons.length > 0 ? (
                      lessons.map((lesson) => (
                        <option key={lesson.id} value={lesson.id}>
                          {translations.subjects[lesson.subject]} - {lesson.timeDate.toDate().toLocaleDateString('pt-BR')} ({lesson.class.name})
                        </option>
                      ))
                    ) : (
                      <option value="">Carregando aulas...</option>
                    )}
                  </SelectInput>
                  {touched.lessonId && errors.lessonId && <Error>{errors.lessonId}</Error>}
                </InputContainer>
                <SubmitButton type="submit">Iniciar</SubmitButton>
              </Form>
            )}
          </Formik>
        </FormContainer>
        <Button>Alunos</Button>
        <Button onClick={() => setIsPanelVisible(true)}>Arquivos</Button>
      </ContentPrimary>

      <AddFileModal 
        isVisible={isAddFileModalOpen}
        lesson={selectedLesson}
        onClose={() => setIsAddFileModalOpen(false)}
      />

      <FilePanel isVisible={isPanelVisible}>
        <PanelHeaderContainer>
          <h2>Arquivos da Aula</h2>
          <IoClose onClick={() => setIsPanelVisible(false)} size={30} style={{cursor: 'pointer'}}/>
        </PanelHeaderContainer>
        <FilesList>
          {selectedLesson && selectedLesson?.files.length > 0 ? (
            selectedLesson?.files.map((file) => (
              <File>
                <Link href={file.url}>{file.name} - {file.type}</Link>
                
                <ButtonsContainer>
                  <FaRegEdit onClick={() => setIsPanelVisible(false)} size={24} style={{cursor: 'pointer'}} />
                  <FaRegTrashAlt onClick={() => setIsPanelVisible(false)} size={24} style={{cursor: 'pointer'}} />
                </ButtonsContainer>
              </File>
            ))
          ): (
            <p>Não há arquivo para exibir.</p>
          )}
        </FilesList>
        {selectedLesson && (
          <AddButton onClick={() => setIsAddFileModalOpen(true)}><FaPlus size={18} />Adicionar</AddButton>
        )}
      </FilePanel>

      <ContentSecondary>
        <Button onClick={() => generateCode()} primary>Gerar Código</Button>
        <GeneratedCode code={code}>
          Código da aula gerado com sucesso
          <br />
          <strong>{code}</strong>
        </GeneratedCode>
      </ContentSecondary>
    </Container>
  );
};

const MockLessons = [
  {
    id: "1A2B3C4D5E",
    timeDate: "2025-02-02T14:30:00Z",
    teacherId: "XYZ1234567",
    subject: "history",
    classId: "ABC9876543",
    status: "concluída",
    files: [
      { name: "História do Império Romano", type: "YouTube", url: "https://www.youtube.com/watch?v=abcd1234" },
      { name: "Resumo Império Romano", type: "PDF", url: "https://exemplo.com/resumo-imperio-romano.pdf" }
    ],
    code: "123456"
  },
  {
    id: "6F7G8H9I0J",
    timeDate: "2025-02-03T09:00:00Z",
    teacherId: "LMN8901234",
    subject: "geography",
    classId: "DEF4567890",
    status: "agendada",
    files: [
      { name: "Estudo do Clima e Biomas", type: "YouTube", url: "https://www.youtube.com/watch?v=efgh5678" },
      { name: "Mapa do Brasil - Recursos Naturais", type: "PDF", url: "https://exemplo.com/mapa-brasil.pdf" }
    ],
    code: "654321"
  },
  {
    id: "K1L2M3N4O5",
    timeDate: "2025-02-04T11:15:00Z",
    teacherId: "UVW5678901",
    subject: "biology",
    classId: "GHI1234567",
    status: "cancelada",
    files: [
      { name: "Células e suas Funções", type: "YouTube", url: "https://www.youtube.com/watch?v=ijkl9012" },
      { name: "Resumo Células", type: "PDF", url: "https://exemplo.com/resumo-celulas.pdf" }
    ],
    code: "789012"
  },
  {
    id: "P6Q7R8S9T0",
    timeDate: "2025-02-05T15:45:00Z",
    teacherId: "ABC2345678",
    subject: "philosophy",
    classId: "JKL6789012",
    status: "agendada",
    files: [
      { name: "Estudo sobre Machado de Assis", type: "YouTube", url: "https://www.youtube.com/watch?v=mnop3456" },
      { name: "Resumo Dom Casmurro", type: "PDF", url: "https://exemplo.com/resumo-dom-casmurro.pdf" }
    ],
    code: "345678"
  },
  {
    id: "U1V2W3X4Y5",
    timeDate: "2025-02-06T13:20:00Z",
    teacherId: "XYZ3456789",
    subject: "physics",
    classId: "MNO7890123",
    status: "concluída",
    files: [
      { name: "Leis de Newton - Introdução", type: "YouTube", url: "https://www.youtube.com/watch?v=qrst6789" },
      { name: "Resumo Leis de Newton", type: "PDF", url: "https://exemplo.com/resumo-leis-de-newton.pdf" }
    ],
    code: "901234"
  },
  {
    id: "Z6A7B8C9D0",
    timeDate: "2025-02-07T17:00:00Z",
    teacherId: "LMN4567890",
    subject: "chemistry",
    classId: "PQR8901234",
    status: "agendada",
    files: [
      { name: "Estudo sobre a Tabela Periódica", type: "YouTube", url: "https://www.youtube.com/watch?v=uvwx9012" },
      { name: "Resumo da Tabela Periódica", type: "PDF", url: "https://exemplo.com/resumo-tabela-periodica.pdf" }
    ],
    code: "567890"
  }
];

export default StartLesson;