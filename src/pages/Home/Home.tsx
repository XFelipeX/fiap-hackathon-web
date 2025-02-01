import React, { useEffect, useState } from "react"
import { db } from '../../services/firebase';
import { collection, getDoc, doc, onSnapshot  } from 'firebase/firestore';
import FilePanel from "../../components/FilePanel/FilePanel";
import AddFileModal from "../../components/AddFileModal/AddFileModal";
import { bouncy } from 'ldrs'
bouncy.register()
import {
  MainContainer,
  TopContainer,
  Title,
  TestsButton,
  TestsButtonAnchor,
  ContentContainer,
  FeedBack,
  LessonItemContainer,
  LessonItemContentContainer,
  TimeDate,
  Info,
  InfoItem,
  FilesButton
} from './styles'
 
interface LessonItemProps {
  lessons: Lesson[] | null | undefined;
  fetchLessons: () => Lesson[] | null | undefined
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

const formatDate = (timestamp: {seconds: number; nanoseconds: number}) => {
  const date = new Date(timestamp.seconds * 1000);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date);

  const formattedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

  return `${hours}:${minutes} - ${formattedWeekday}`;
}

const LessonItem = ({ lessons, fetchLessons }: LessonItemProps) => {
  const [isPanelVisible, setIsPanelVisible] = useState(false)
  const [isAddFileModalOpen, setIsAddFileModalOpen] = useState(false);
  return (
    <>
      {lessons?.map((lesson) => (
        <>
          <LessonItemContainer>
            <LessonItemContentContainer>
              <div>
                <TimeDate>{formatDate(lesson.timeDate)}</TimeDate>
                <Info>
                  <InfoItem>Turma: {lesson.class.name}</InfoItem>
                  <InfoItem>Sala: {lesson.class.room}</InfoItem>
                  <InfoItem>Status: {lesson.status}</InfoItem>
                </Info>
              </div>
              <FilesButton onClick={() => setIsPanelVisible(true)}>Arquivos</FilesButton>
            </LessonItemContentContainer>
          </LessonItemContainer>

          <AddFileModal 
            isVisible={ isAddFileModalOpen }
            lesson={ lesson }
            onClose={() => {
              setIsAddFileModalOpen(false);
              fetchLessons();
            }}
          />

          <FilePanel
            isVisible={ isPanelVisible }
            lesson={ lesson }
            onAdd={() => setIsAddFileModalOpen(true)}
            onClose={() => setIsPanelVisible(false)}
          />
        </>
      ))}
    </>
  )
}

const Home: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[] | null | undefined>()

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

        const today = new Date().toISOString().split('T')[0];
        const todayLessons = lessonsData.filter((lesson) => lesson.timeDate.toDate().toISOString().split('T')[0] === today);

        setLessons(todayLessons);
      });
    };
  
    useEffect(() => {
      fetchLessons();
    }, []);

  return (
    <>
      <MainContainer>
        <TopContainer>
          <Title>Aulas Hoje</Title>
          <TestsButton>
            <TestsButtonAnchor href="/timeline">Provas</TestsButtonAnchor>
          </TestsButton>
        </TopContainer>
        <ContentContainer>
          {lessons ? (
            lessons.length > 0 ? (
              <LessonItem lessons={ lessons } fetchLessons={ fetchLessons }/>
            ) : (
              <FeedBack>Nenhuma aula para hoje</FeedBack>
            )
          ) : (
            <>
              <l-bouncy
                size="45"
                speed="1.75" 
                color="white" 
              ></l-bouncy>
              <div style={{marginBottom: '35px'}}></div>
            </>
          )}
        </ContentContainer>
      </MainContainer>
    </>
  )
}

export default Home
