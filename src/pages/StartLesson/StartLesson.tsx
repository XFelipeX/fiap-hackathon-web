import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import AddFileModal from '../../components/AddFileModal/AddFileModal';
import FilePanel from '../../components/FilePanel/FilePanel';
import { db } from '../../services/firebase';
import { collection, getDoc, doc, updateDoc, onSnapshot  } from 'firebase/firestore';
import {
  Container,
  Title,
  Button,
  GeneratedCode,
  ContentPrimary,
  GoodLesson,
  GoodLessonText,
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
  const [showGoodLesson, setShowGoodLesson] = useState(false);
  const [code, setCode] = useState('')
  const date = getCurrentDate();

  const fetchLessons = async () => {
    const lessonsCollection = collection(db, 'lessons');
    
    onSnapshot(lessonsCollection, async (snapshot) => {
      const lessonsData: Lesson[] = await Promise.all(
        snapshot.docs.map(async (document) => {
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
            status: data.status,
            files: data.files,
            code: data.code
          };
        })
      );
      
      setLessons(lessonsData);
      
      if (selectedLesson) {
        const updatedSelectedLesson = lessonsData.find(lesson => lesson.id === selectedLesson.id);
        if (updatedSelectedLesson) {
          setSelectedLesson(updatedSelectedLesson);
        }
      }
    });
  };

  useEffect(() => {
    fetchLessons();
  }, []);

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

  const handleStart = async (values: FormValues) => {
    if (!selectedLesson) return

    const lessonsCollection = collection(db, 'lessons')
    const lessonDoc = doc(lessonsCollection, selectedLesson.id)

    try {
      await updateDoc(lessonDoc, { status: 'concluída' })
      console.log('Aula iniciada')

      setShowGoodLesson(true);
      setTimeout(() => setShowGoodLesson(false), 3000);

    } catch (e) {
      console.error('Erro ao iniciar aula: ', e)
    }

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

      <GoodLesson isVisible={showGoodLesson}>
        <GoodLessonText>Tenha uma boa aula!</GoodLessonText>
      </GoodLesson>

      <AddFileModal 
        isVisible={isAddFileModalOpen}
        lesson={selectedLesson}
        onClose={() => {
          setIsAddFileModalOpen(false);
          fetchLessons();
        }}
      />

      <FilePanel
        isVisible={isPanelVisible}
        lesson={ selectedLesson }
        onAdd={() => setIsAddFileModalOpen(true)}
        onClose={() => setIsPanelVisible(false)}
      />

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

export default StartLesson;