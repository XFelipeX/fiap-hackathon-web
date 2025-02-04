import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { PostResultTable, IClass } from './types'
import {
  MainContent,
  FormContainer,
  InputsContainer,
  InputContainer,
  Label,
  TitleInput,
  TextInput,
  SelectInput,
  GradeInput,
  Error,
  BottomLineForm,
  SubmitContainer,
  SubmitButton,
  TableContainer,
  Table,
  TableRow,
  TableData
} from './styles'

const validations = Yup.object({ 
  title: Yup.string()
    .required('Por favor, informe o titulo da tarefa!'),
  type: Yup.string()
    .required('Por favor, selecione o tipo de tarefa'),
  TaskValue: Yup.number()
    .required('Por favor, informe o valor da tarefa'),
  date: Yup.date()
    .required('Por favor, selecione a data de entrega'),
  classId: Yup.string()
    .required('Por favor, selecione uma turma'),
  grade: Yup.string()
    .required('Defina a nota da tarefa')
})

const Result: React.FC = () => {
  const [classes, setClasses] = useState<IClass[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      const classesCollection = collection(db, 'class')
      const classesSnapshot = await getDocs(classesCollection)
  
      const classesData: IClass[] = classesSnapshot.docs.map((doc) => {
        const data = doc.data();

        if (doc.id !== 'counter') {  
          return {
            id: doc.id,
            code: data.code || '',
            name: data.name || '',
            qntStudents: data.qntStudents || '',
            room: data.room || '',
            shift: data.shift || '',
            status: data.status || '',
            students: data.students || [],
            teachers: data.teachers || [],
          };
        }
        return undefined
      }).filter((classData): classData is IClass => classData !== undefined)
  
      setClasses(classesData)
    };
  
    fetchClasses()
  }, []);

  const MockPostResultTable: PostResultTable[] = [
    { studentId: "001", studentName: "Felipe Dias", studentGrade: 0 },
    { studentId: "002", studentName: "Thiago Fialho", studentGrade: 0 },
    { studentId: "003", studentName: "Sérgio Neto", studentGrade: 0 },
  ]

  function handleSave(values: any) {
    throw new Error('Function not implemented.')
  }

  return (
    <>
      <MainContent>
        <FormContainer>
          <Formik
            initialValues={{ title: '', type: '', TaskValue: undefined, date: '', classId: '', grade: undefined }}
            enableReinitialize
            validationSchema={validations}
            onSubmit={(values) => handleSave(values)}
          >
            {({ values, handleChange, touched, errors }) => (
              <Form>
                <InputsContainer>
                  <InputContainer>
                    <Label htmlFor="title">Titulo</Label>
                    <TitleInput type="text" name="title" id="title" onChange={handleChange} value={values.title} />
                    {touched.title && errors.title && <Error>{errors.title}</Error>}
                  </InputContainer>

                  <BottomLineForm>
                    <InputContainer>
                      <Label htmlFor="type">Tipo da tarefa</Label>
                      <SelectInput
                        as="select"
                        name="type"
                        id="type"
                        onChange={handleChange}
                        value={values.type}
                      >
                        <option value="">Selecione</option>
                        <option value="prova">Prova</option>
                        <option value="trabalho">Trabalho</option>
                      </SelectInput>
                    </InputContainer>

                    <InputContainer>
                      <Label htmlFor="TaskValue">Valor</Label>
                      <TextInput type="text" name="TaskValue" id="TaskValue" onChange={handleChange} value={values.TaskValue} />
                      {touched.TaskValue && errors.TaskValue && <Error>{errors.TaskValue}</Error>}
                    </InputContainer>

                    <InputContainer>
                      <Label htmlFor="date">Data</Label>
                      <TextInput type="date" name="date" id="date" onChange={handleChange} value={values.date} />
                      {touched.date && errors.date && <Error>{errors.date}</Error>}
                    </InputContainer>

                    <InputContainer>
                      <Label htmlFor="classId">Turma</Label>
                      <SelectInput
                        as="select"
                        name="classId"
                        id="classId"
                        onChange={handleChange}
                        value={values.classId}
                      >
                        <option value="">Selecione</option>
                        {classes.map((classItem) => (
                          <option key={classItem.id} value={classItem.id}>{classItem.name}</option>
                        ))}
                      </SelectInput>
                    </InputContainer>
                  </BottomLineForm>
                </InputsContainer>
                <TableContainer>
                  <Table>
                    {MockPostResultTable.map((resultData) => (
                      <TableRow>
                        <TableData>{resultData.studentName}</TableData>
                        <GradeInput type="text" name="grade" id="grade" onChange={handleChange} value={values.grade} />
                      </TableRow>
                    ))}
                  </Table>
                </TableContainer>
                {touched.grade && errors.grade && <Error>{errors.grade}</Error>}
                <SubmitContainer>
                  <SubmitButton type="submit">Salvar</SubmitButton>
                </SubmitContainer>
              </Form>
            )}
          </Formik>
        </FormContainer>
      </MainContent>
    </>
  )
}

export default Result