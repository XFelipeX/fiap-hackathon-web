import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { db } from '../../services/firebase';
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { FormValues, Teachers, Students } from './types'
import { useFirestore } from '../../hooks/useFirestore';
import {
  MainContainer,
  FormContainer,
  InputContainer,
  CheckBoxContainerHeader,
  CheckBoxLabel,
  SortButton,
  CheckBoxContainer,
  CheckBoxInputContainer,
  CheckBoxInput,
  CheckBoxInputLabel,
  Label,
  TextInput,
  Error,
  SelectInput,
  SubmitContainer,
  SubmitButton,
} from './styles'

const validations = Yup.object({
  name: Yup.string()
    .required('Campo obrigatório'),
  room: Yup.number()
    .required('Campo obrigatório')
    .typeError('Deve ser um número'),
  qntStudents: Yup.number()
    .required('Campo obrigatório')
    .typeError('Deve ser um número'),
  shift: Yup.string()
    .required('Campo obrigatório'),
  status: Yup.string()
    .required('Campo obrigatório'),
  students: Yup.array()
    .required('Campo obrigatório')
    .min(1, 'Selecione pelo menos um aluno'),
  teachers: Yup.array()
    .required('Campo obrigatório')
    .min(1, 'Selecione pelo menos um professor'),
})

const ClassForm: React.FC = () => {
  const { createDocumentWithCode, updateDocument } = useFirestore()
  const { id } = useParams<{ id: string }>()
  const [teachers, setTeachers] = useState<Teachers[]>([]);
  const [students, setStudents] = useState<Students[]>([]);
  const [initialValues, setInitialValues] = useState<FormValues>({
    name: '',
    room: '',
    qntStudents: '',
    shift: '',
    status: '',
    students: [],
    teachers: [],
  })

  useEffect(() => {
    const fetchClass = async () => {
      if (id) {
        const classesCollection = collection(db, 'class')
        const classDoc = doc(classesCollection, id)
        const classSnapshot = await getDoc(classDoc)

        if (classSnapshot.exists()) {
          setInitialValues(classSnapshot.data() as FormValues)
        }
      }
    }

    fetchClass()
  }, [id])

  const fetchTeacher = async () => {
      const teachersCollection = collection(db, 'teachers')
      const teachersSnapshot = await getDocs(teachersCollection)
  
      const teachersData: Teachers[] = teachersSnapshot.docs.map((doc) => {
      const data = doc.data();
  
      if (doc.id !== 'counter') {  
        return {
          id: doc.id,
          code: data.code || '',
          name: data.name || '',
          birthDay: data.birthDay || '',
          tel: data.tel || '',
          email: data.email || '',
          subjects: data.subjects || []
        };
      }
      return undefined
    }).filter((teachersData): teachersData is Teachers => teachersData !== undefined)
  
    setTeachers(teachersData)
  };
  
  const fetchStudents = async () => {
    const studentsCollection = collection(db, 'students')
    const studentsSnapshot = await getDocs(studentsCollection)
  
    const studentsData: Students[] = studentsSnapshot.docs.map((doc) => {
    const data = doc.data();
  
    if (doc.id !== 'counter') {  
      return {
        id: doc.id,
        code: data.code || '',
        name: data.name || '',
        birthDay: data.birthDay || '',
        tel: data.tel || '',
        email: data.email || ''
      };
    }
    return undefined
  }).filter((studentsData): studentsData is Students => studentsData !== undefined)
  
  setStudents(studentsData)
  };
  
  useEffect(() => {
    fetchStudents()
    fetchTeacher()
  }, []);

  const sortByName = () => {
    const sorted = [...students].sort((a, b) => a.name.localeCompare(b.name));
    setStudents(sorted);
  };
  
  const sortByAge = () => {
    const sorted = [...students].sort((a, b) => {
      const birthYearA = a.birthDay.toDate ? a.birthDay.toDate().getFullYear() : new Date(a.birthDay).getFullYear();
      const birthYearB = b.birthDay.toDate ? b.birthDay.toDate().getFullYear() : new Date(b.birthDay).getFullYear();
      
      return birthYearA - birthYearB;
    });
  
    setStudents(sorted);
  };

  const handleSave = (values: FormValues) => {
    if (id) {
      updateDocument('class', values, id)
    } else {
      createDocumentWithCode('class', values, 'T')
    }
  };

  return (
    <MainContainer>
      <FormContainer>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={validations}
          onSubmit={(values) => handleSave(values)}
        >
          {({ values, handleChange, touched, errors, setFieldValue }) => (
            <Form>
              <InputContainer>
                <Label htmlFor="name">Nome</Label>
                <TextInput type="text" name="name" id="name" onChange={handleChange} value={values.name} />
                {touched.name && errors.name && <Error>{errors.name}</Error>}
              </InputContainer>

              <InputContainer>
                <Label htmlFor="room">Sala</Label>
                <TextInput type="number" name="room" id="room" onChange={handleChange} value={values.room} />
                {touched.room && errors.room && <Error>{errors.room}</Error>}
              </InputContainer>

              <InputContainer>
                <Label htmlFor="qntStudents">Número de Alunos</Label>
                <TextInput type="number" name="qntStudents" id="qntStudents" onChange={handleChange} value={values.qntStudents} />
                {touched.qntStudents && errors.qntStudents && <Error>{errors.qntStudents}</Error>}
              </InputContainer>

              <InputContainer>
                <Label htmlFor="shift">Turno</Label>
                <SelectInput name="shift" id="shift" onChange={handleChange} value={values.shift}>
                  <option value="">Selecione</option>
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                </SelectInput>
                {touched.shift && errors.shift && <Error>{errors.shift}</Error>}
              </InputContainer>

              <InputContainer>
                <Label htmlFor="status">Status</Label>
                <SelectInput name="status" id="status" onChange={handleChange} value={values.status}>
                  <option value="">Selecione</option>
                  <option value="Ativa">Ativa</option>
                  <option value="Fechada">Fechada</option>
                </SelectInput>
                {touched.status && errors.status && <Error>{errors.status}</Error>}
              </InputContainer>

              <InputContainer>
                <CheckBoxContainerHeader>
                  <CheckBoxLabel>Alunos</CheckBoxLabel>
                  <div>
                    <SortButton type="button" onClick={sortByName}>Ordenar por Nome</SortButton>
                    <SortButton type="button" onClick={sortByAge}>Ordenar por Idade</SortButton>
                  </div>
                </CheckBoxContainerHeader>
                <CheckBoxContainer>
                  {students.map((student) => (
                    <CheckBoxInputContainer>
                      <CheckBoxInput
                        type="checkbox"
                        name="students"
                        id={student.id}
                        value={student.id}
                        checked={values.students.includes(student.id)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const selectedStudents = e.target.checked
                            ? [...values.students, student.id]
                            : values.students.filter((item) => item !== student.id)
                          setFieldValue("students", selectedStudents)
                        }}
                      />
                      <CheckBoxInputLabel htmlFor={student.id}>
                        <p>{student.name}</p>
                        <p style={{fontSize: '12pt'}}>Idade: {new Date().getFullYear() - student.birthDay.toDate().getFullYear()}</p>
                      </CheckBoxInputLabel>
                    </CheckBoxInputContainer>
                  ))}
                </CheckBoxContainer>
                {touched.students && errors.students && <Error>{errors.students}</Error>}
              </InputContainer>

              <InputContainer>
                <CheckBoxContainerHeader>
                  <CheckBoxLabel>Professores</CheckBoxLabel>
                </CheckBoxContainerHeader>
                <CheckBoxContainer>
                  {teachers.map((teacher) => (
                    <CheckBoxInputContainer>
                      <CheckBoxInput
                        type="checkbox"
                        name={teacher.id}
                        id={teacher.id}
                        value={teacher.id}
                        checked={values.teachers.includes(teacher.id)}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const selectedTeachers = e.target.checked
                            ? [...values.teachers, teacher.id]
                            : values.teachers.filter((item) => item !== teacher.id)
                          setFieldValue("teachers", selectedTeachers)
                        }}
                      />
                      <CheckBoxInputLabel htmlFor={teacher.id}>
                        <p>{teacher.name}</p>
                      </CheckBoxInputLabel>
                    </CheckBoxInputContainer>
                  ))}
                </CheckBoxContainer>
                {touched.teachers && errors.teachers && <Error>{errors.teachers}</Error>}
              </InputContainer>

              <SubmitContainer>
                <SubmitButton type="submit">Salvar</SubmitButton>
              </SubmitContainer>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </MainContainer>
  );
};

export default ClassForm;