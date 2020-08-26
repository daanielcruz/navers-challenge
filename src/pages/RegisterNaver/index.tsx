import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import ReactModal from 'react-modal';
import moment from 'moment';

import api from '../../services/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Loading from '../../components/Loading';

import goBackIcon from '../../assets/goback.svg';
import closeIcon from '../../assets/close.svg';

import {
  Container,
  Content,
  StyledForm,
  InputGroup,
  ButtonBox,
  GoBackBox,
  ModalContent,
  H1,
  Space,
} from './styles';

interface NewNaverFormData {
  name: string;
  url: string;
  admission_date: string;
  birthdate: string;
  job_role: string;
  project: string;
}

const RegisterNaver: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const handleSubmit = useCallback(
    async (data: NewNaverFormData, { reset }) => {
      data.birthdate = moment(data.birthdate).format('DD-MM-YYYY');
      data.admission_date = moment(data.admission_date).format('DD-MM-YYYY');
      try {
        setLoading(true);
        await api.post('navers', data);
        setModalIsOpen(true);
        setLoading(false);
        reset();
      } catch (e) {
        addToast('Ocorreu um erro tentar adicionar o naver, tente novamente!', {
          appearance: 'warning',
          autoDismiss: true,
        });
        setLoading(false);
      }
    },
    [addToast],
  );

  const handleCloseModal = useCallback(() => {
    setModalIsOpen(false);
  }, []);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      borderRadius: 0,
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  };

  return (
    <Container>
      <ReactModal isOpen={modalIsOpen} style={customStyles}>
        <ModalContent>
          <img src={closeIcon} alt="Fechar" onClick={handleCloseModal} />
          <H1>Naver criado</H1>
          <span>Naver criado com sucesso!</span>
          <Space />
        </ModalContent>
      </ReactModal>
      <PageHeader />

      <Content>
        <StyledForm onSubmit={handleSubmit}>
          <GoBackBox>
            <Link to="/home">
              <img src={goBackIcon} alt="Voltar" />
              Adicionar Naver
            </Link>
          </GoBackBox>
          <InputGroup>
            <Input
              type="text"
              id="name"
              name="name"
              label="Nome"
              placeholder="Nome"
              required
            />
            <Input
              type="text"
              id="job_role"
              name="job_role"
              label="Cargo"
              placeholder="Cargo"
              required
            />
          </InputGroup>

          <InputGroup>
            <Input
              type="date"
              id="birthdate"
              name="birthdate"
              label="Idade"
              placeholder="Idade"
              min="0"
              required
            />
            <Input
              type="date"
              id="admission_date"
              name="admission_date"
              label="Tempo de empresa"
              placeholder="Tempo de empresa"
              required
            />
          </InputGroup>

          <InputGroup>
            <Input
              type="text"
              id="project"
              name="project"
              label="Projetos que participou"
              placeholder="Projetos que participou"
              required
            />
            <Input
              type="url"
              id="url"
              name="url"
              label="URL da foto do Naver"
              placeholder="URL da foto do Naver"
              required
            />
          </InputGroup>
          <ButtonBox>
            {!loading ? <Button type="submit" content="Salvar" /> : <Loading />}
          </ButtonBox>
        </StyledForm>
      </Content>
    </Container>
  );
};

export default RegisterNaver;
