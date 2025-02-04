import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../services/firebase'
import { IClass, Student } from './types'
import { useFirestore } from '../../hooks/useFirestore';
import {
  MainContent,
  FormContainer,
  InputsContainer,
  TitleInputContainer,
  BimesterInputContainer,
  InputContainer,
  Label,
  TopLineForm,
  TitleInput,
  BimesterInput,
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
  TableData,
  FeedBack
} from './styles'

const validations = Yup.object({ 
  title: Yup.string()
    .required('Por favor, informe o titulo da tarefa!'),
  bimester: Yup.number()
    .required('PorFavor, inoforme o bimestre')
    .min(1, 'O bimestre deve ser entre 1 e 4')
    .max(4, 'O bimestre deve ser entre 1 e 4'),
  type: Yup.string()
    .required('Por favor, selecione o tipo de tarefa'),
  TaskValue: Yup.number()
    .required('Por favor, informe o valor da tarefa'),
  date: Yup.date()
    .required('Por favor, selecione a data de entrega'),
  classId: Yup.string()
    .required('Por favor, selecione uma turma'),
  grades: Yup.array()
    .of(Yup.string().required('Defina a nota da tarefa'))
})

const Result: React.FC = () => {
  const { createTask } = useFirestore()
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<IClass[]>([]);
  const [selectedClass, setSelectedClass] = useState<IClass | null | undefined>(null);
  const [filteredStudents, SetFilteredStudents] = useState<{ student: string, id: string}[]>([])

  const [initialValues, setInitialValues] = useState({
    title: '',
    bimester: undefined,
    type: '',
    TaskValue: undefined,
    date: '',
    classId: '',
    grades: [] as string[],
    studentIds: [] as string[]
  });

  useEffect(() => {
    setInitialValues((pervData) => ({
      ...pervData,
      grades: [],
      studentsIds: []
    }));
  }, [selectedClass]);

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

    const fetchStudents = async () => {
      const studentsCollection = collection(db, 'students');
      const studentsSnapshot = await getDocs(studentsCollection);
      const studentsData: Student[] = studentsSnapshot.docs.map((doc) => {
        const data = doc.data();
        if (doc.id !== 'counter') {
          return {
            id: doc.id,
            name: data.name || '',
          };
        }
        return undefined
      }).filter((student): student is Student => student !== undefined);
      setStudents(studentsData);
    };
  
    fetchClasses();
    fetchStudents();
  }, []);


  const handleClassSelect = (values) => {
    if (classes) {
      const classItem = classes.find((item) => item.id == values.classId)
      setSelectedClass(classItem)

    } else {
      setSelectedClass(null);
    }
  }

  useEffect(() => {
    if (!selectedClass) {
      SetFilteredStudents([]);
      return;
    }

    const filteredStudents = students
    .filter((student) => selectedClass.students.includes(student.id))
    .map((student) => ({ student: student.name, id: student.id }));

    SetFilteredStudents(filteredStudents);
  }, [selectedClass, students])

  const handleSave = (values) => {
    createTask('tasks', values)
  }

  return (
    <>
      <MainContent>
        <FormContainer>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validations}
            onSubmit={(values) => handleSave(values)}
          >
            {({ values, handleChange, touched, errors, setFieldValue }) => (
              <Form>
                <InputsContainer>
                  <TopLineForm>
                    <TitleInputContainer>
                      <Label htmlFor="title">Titulo</Label>
                      <TitleInput type="text" name="title" id="title" onChange={handleChange} value={values.title} />
                      {touched.title && errors.title && <Error>{errors.title}</Error>}
                    </TitleInputContainer>

                    <BimesterInputContainer>
                      <Label htmlFor="bimester">Bimestre</Label>
                      <BimesterInput type="number" name="bimester" id="bimester" onChange={handleChange} value={values.bimester} />
                      {touched.bimester && errors.bimester && <Error>{errors.bimester}</Error>}
                    </BimesterInputContainer>
                  </TopLineForm>

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
                        onChange={(e) => {
                          handleChange(e)
                          handleClassSelect({ classId: e.target.value })
                        }}
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
                {selectedClass ? (
                  <>
                    <TableContainer>
                      <Table>
                        {filteredStudents.map((data, index) => (
                          <TableRow key={data.id}>
                            <TableData>{data.student}</TableData>
                            <GradeInput
                              type="text"
                              name={`grades[${index}]`}
                              onChange={(e) => {
                                handleChange(e);
                                const updatedIds = [...values.studentIds];
                                updatedIds[index] = data.id;
                                setFieldValue("studentIds", updatedIds);
                              }}
                              value={values.grades?.[index] || ''}
                            />
                          </TableRow>
                        ))}
                      </Table>
                    </TableContainer>
                    {touched.grades && errors.grades && <Error>{errors.grades}</Error>}
                  <SubmitContainer>
                    <SubmitButton type="submit">Salvar</SubmitButton>
                  </SubmitContainer>
                </>
                ) : (<FeedBack>selecione uma turma</FeedBack>)}
              </Form>
            )}
          </Formik>
        </FormContainer>
      </MainContent>
    </>
  )
}

export default Result