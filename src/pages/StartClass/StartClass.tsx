import React, { useState } from 'react';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { IoClose } from 'react-icons/io5';
import { FaPlus, FaRegTrashAlt, FaRegEdit  } from "react-icons/fa";
import AddFileModal from '../../components/AddFileModal/AddFileModal';
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

const validations = Yup.object({
  team: Yup.string()
    .required('Selecione uma turma')
})

const StartClass: React.FC = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false)
  const [isAddFileModalOpen, setIsAddFileModalOpen] = useState(false);
  const [code, setCode] = useState('')
  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()
  const formattedDate = `${day}/${String(month).padStart(2, '0')}/${year}`

  const MockTeams = [
    { name: "Turma A - 1º Ano", room: "Sala 101", qntStudents: 25, shift: "Manhã", status: "ativa" },
    { name: "Turma B - 1º Ano", room: "Sala 202", qntStudents: 20, shift: "Tarde", status: "ativa" },
    { name: "Turma C - 2º Ano", room: "Sala 303", qntStudents: 18, shift: "Noite", status: "inativa" },
    { name: "Turma D - 2º Ano", room: "Sala 404", qntStudents: 30, shift: "Manhã", status: "ativa" },
    { name: "Turma A - 3º Ano", room: "Sala 505", qntStudents: 22, shift: "Tarde", status: "inativa" },
  ];

  const MockFiles = [
    { name: "Segunda guerra mundial", type:"YouTube", url: "https://www.youtube.com/watch?v=Vq9oIj2ecU8&pp=ygUWc2VndW5kYSBndWVycmEgbXVuZGlhbA%3D%3D" },
    { name: "Resumo Segunda guerra mundial", type:"PDF", url: "https://irp-cdn.multiscreensite.com/b422576b/files/uploaded/Resumo%20da%20Segunda%20Guerra%20Mundial.pdf" }
  ]

  const generateCode = () => {
    const min = 100000
    const max = 999999
    setCode(String(Math.floor(Math.random() * (max - min + 1)) + min))
  }
  
  const handleStart = (values) => {
    console.log(values)
  }

  const showFiles = () => {
    setIsPanelVisible(true)
  };
    
  const hideFiles = () => {
    setIsPanelVisible(false)
  };

  return (
    <Container>
      <AddFileModal 
        isVisible={isAddFileModalOpen}
        onClose={() => setIsAddFileModalOpen(false)}
      />
      <Title>Aula do dia { formattedDate }</Title>
      <ContentPrimary>
        <FormContainer>
          <Formik
            initialValues={{ team: "" }}
            enableReinitialize={true}
					  validationSchema={validations}
            onSubmit={(values) => handleStart(values)}
          >
            {({ values, handleChange, touched, errors }) => (
              <Form style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <InputContainer>
                  <SelectInput
                    as="select"
                    name="team"
                    id="team"
                    onChange={handleChange}
                    value={values.team}
                  >
                    <option value="">Selecione uma Turma</option>
                    {MockTeams.map((team, index) => (
                      <option key={index} value={team.name}>
                        {team.name} - {team.room} ({team.shift})
                      </option>
                    ))}
                  </SelectInput>
                  {touched.team && errors.team && <Error>{errors.team}</Error>}
                </InputContainer>
                <SubmitButton type="submit">Iniciar</SubmitButton>
              </Form>
            )}
          </Formik>
        </FormContainer>

        <Button>Alunos</Button>
        <Button onClick={showFiles}>Arquivos</Button>

      </ContentPrimary>

      <FilePanel isVisible={isPanelVisible}>
        <PanelHeaderContainer>
          <h2>Arquivos da Aula</h2>
          <IoClose onClick={hideFiles} size={30} style={{cursor: 'pointer'}}/>
        </PanelHeaderContainer>
        
        <FilesList>
          {MockFiles.map((file) => (
            <File>
              <Link href={file.url}>{file.name} - {file.type}</Link>
              
              <ButtonsContainer>
                <FaRegEdit onClick={hideFiles} size={24} style={{cursor: 'pointer'}} />
                <FaRegTrashAlt onClick={hideFiles} size={24} style={{cursor: 'pointer'}} />
              </ButtonsContainer>
            </File>
          ))}
        </FilesList>
        <AddButton onClick={() => setIsAddFileModalOpen(true)}><FaPlus size={18} />Adicionar</AddButton>
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

export default StartClass;
