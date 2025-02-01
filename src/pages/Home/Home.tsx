import React from "react"
import {
  MainContainer,
  TopContainer,
  Title,
  TestsButton,
  TestsButtonAnchor,
  ContentContainer,
  LessonItemContainer,
  LessonItemContentContainer,
  TimeDate,
  Info,
  InfoItem,
  FilesButton
} from './styles'

interface LessonData {
  timeDate: string;
  className: string;
  room: string;
  status: string;
}
 
interface LessonItemProps {
  lessons: LessonData[];
}

function LessonItem ({ lessons }: LessonItemProps) {
  return (
    <>
      {lessons.map((lesson) => (
        <>
        <LessonItemContainer>
          <LessonItemContentContainer>
            <div>
              <TimeDate>{lesson.timeDate}</TimeDate>
              <Info>
                <InfoItem>{lesson.className}</InfoItem>
                <InfoItem>{lesson.room}</InfoItem>
                <InfoItem>{lesson.status}</InfoItem>
              </Info>
            </div>
            <FilesButton>Arquivos</FilesButton>
          </LessonItemContentContainer>
        </LessonItemContainer>
        </>
      ))}
    </>
  )
}

const Home: React.FC = () => {

  const mockLessons: LessonData[] = [
    { timeDate: "07:00 - Segunda", className: "Turma: Turma B - 1º Ano", room: "Sala: 102", status: "Status: Cancelada"},
    { timeDate: "07:00 - Segunda", className: "Turma: Turma B - 1º Ano", room: "Sala: 102", status: "Status: Ativa"},
    { timeDate: "07:00 - Segunda", className: "Turma: Turma B - 1º Ano", room: "Sala: 102", status: "Status: Ativa"},
    { timeDate: "07:00 - Segunda", className: "Turma: Turma B - 1º Ano", room: "Sala: 102", status: "Status: Ativa"},
  ]

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
          <LessonItem lessons={mockLessons}/>
        </ContentContainer>
      </MainContainer>
    </>
  )
}

export default Home
