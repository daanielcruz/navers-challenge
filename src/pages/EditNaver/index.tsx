import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import ReactModal from 'react-modal';
import { FormHandles } from '@unform/core';
import moment from 'moment';
import 'moment/locale/pt-br';

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

interface UpdateNaverFormData {
  name: string;
  url: string;
  admission_date: string;
  birthdate: string;
  job_role: string;
  project: string;
}

const EditNaver = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [naverId, setNaverId] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToast } = useToasts();

  const { id } = useParams();
  const formRef = useRef<FormHandles>(null);

  useEffect(() => {
    async function getNaverInfo() {
      try {
        const res = await api.get(`navers/${id}`);
        setNaverId(res.data.id);
        res.data.birthdate = moment(res.data.birthdate).format('YYYY-MM-DD');
        res.data.admission_date = moment(res.data.admission_date).format(
          'YYYY-MM-DD',
        );
        setLoading(false);
        const node = formRef.current;
        node?.setData(res.data);
      } catch (e) {
        addToast(
          'Ocorreu um erro ao tentar localizar o naver, tente novamente!',
          {
            appearance: 'warning',
            autoDismiss: true,
          },
        );
      }
    }
    getNaverInfo();
  }, []);

  const handleSubmit = useCallback(
    async (data: UpdateNaverFormData) => {
      const birthdate = new Date(data.birthdate);
      const admission_date = new Date(data.admission_date);
      data.birthdate = birthdate.toLocaleDateString('pt-BR');
      data.admission_date = admission_date.toLocaleDateString('pt-BR');

      try {
        setLoading(true);
        await api.post('navers', data);
        setModalIsOpen(true);
        setLoading(false);
      } catch (e) {
        addToast('Ocorreu um erro tentar atualizar o naver, tente novamente!', {
          appearance: 'warning',
          autoDismiss: true,
        });
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
          <H1>Naver atualizado</H1>
          <span>Naver atualizado com sucesso!</span>
          <Space />
        </ModalContent>
      </ReactModal>
      <PageHeader />

      <Content>
        <StyledForm onSubmit={handleSubmit} ref={formRef}>
          <GoBackBox>
            <Link to="/Home">
              <img src={goBackIcon} alt="Voltar" />
              Editar Naver
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

export default EditNaver;
