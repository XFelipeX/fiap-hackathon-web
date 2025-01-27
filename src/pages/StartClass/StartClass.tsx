import React from 'react';
import {
  Container,
  Button,
  GeneratedCode,
  ContentPrimary,
  ContentSecondary,
} from './styles';

const StartClass: React.FC = () => {
  return (
    <Container>
      <ContentPrimary>
        <Button>Selecionar Turma</Button>
        <Button>Alunos</Button>
        <Button>Arquivos</Button>
      </ContentPrimary>
      <ContentSecondary>
        <Button primary>Gerar Código</Button>
        <GeneratedCode>
          Código da aula gerado com sucesso
          <br />
          <strong>024593</strong>
        </GeneratedCode>
      </ContentSecondary>
    </Container>
  );
};

export default StartClass;
