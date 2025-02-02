import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { db } from '../../services/firebase';
import { collection, getDocs } from "firebase/firestore";
import {
  MainContainer,
  FormContainer,
  InputContainer,
  TextInput,
  SelectInput,
  Label,
  Error,
  SubmitContainer,
  SubmitButton
} from './styled'

interface Teachers {
  id: string
  code: string
  name: string
  birthDay: string
  tel: string
  email: string
  subjects: string[]
}

interface Students {
  id: string
  code: string
  name: string
  birthDay: string
  tel: string
  email: string
}

interface FormValues {
  name: string
}

const validations = Yup.object({
  name: Yup.string()
    .required('Campo obrigatório'),
})

const PeopleForm: React.FC = () => {
  const { person, id } = useParams<{ person: string, id: string }>()
  const [teachers, setTeachers] = useState<Teachers[]>([]);
  const [students, setStudents] = useState<Students[]>([]);

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

  const handleSave = (values: FormValues) => {
    if (id) {
      console.log(values)
    } else {
      console.log(values)
    }
  };

  return (
    <MainContainer>
      <FormContainer>
        <Formik
          initialValues={{ name: '', email: '', birthDay: '', tel: '', subjects: []}}
          enableReinitialize
          validationSchema={validations}
          onSubmit={(values) => handleSave(values)}
        >
          {({ values, handleChange, touched, errors }) => (
            <Form>

              <InputContainer>
                <Label htmlFor="name">Nome</Label>
                <TextInput type="text" name="name" id="name" onChange={handleChange} value={values.name} />
                {touched.name && errors.name && <Error>{errors.name}</Error>}
              </InputContainer>

              <InputContainer>
                <Label htmlFor="email">Email</Label>
                <TextInput type="email" name="email" id="email" onChange={handleChange} value={values.email} />
                {touched.email && errors.email && <Error>{errors.email}</Error>}
              </InputContainer>

              <InputContainer>
                <Label htmlFor="birthDay">Data de nascimento</Label>
                <TextInput type="date" name="birthDay" id="birthDay" onChange={handleChange} value={values.birthDay} />
                {touched.birthDay && errors.birthDay && <Error>{errors.birthDay}</Error>}
              </InputContainer>

              <InputContainer>
                <Label htmlFor="tel">Telefone</Label>
                <TextInput type="text" name="tel" id="tel" onChange={handleChange} value={values.tel} />
                {touched.tel && errors.tel && <Error>{errors.tel}</Error>}
              </InputContainer>

              {person === 'teacher' && (
                <InputContainer>
                  <Label htmlFor="subjects">Matérias</Label>
                  <SelectInput name="subjects" id="subjects" onChange={handleChange} value={values.subjects}>
                    <option value="">Selecione</option>
                  </SelectInput>
                  {touched.subjects && errors.subjects && <Error>{errors.subjects}</Error>}
                </InputContainer>
              )}

              <SubmitContainer>
                <SubmitButton type="submit">Adicionar</SubmitButton>
              </SubmitContainer>

            </Form>
          )}
        </Formik>
      </FormContainer>
  </MainContainer>
  )
}

export default PeopleForm