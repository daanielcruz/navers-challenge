import React, { useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';
import moment from 'moment';
import 'moment/locale/pt-br';

import deleteIcon from '../../assets/delete.svg';
import editIcon from '../../assets/edit.svg';
import closeIcon from '../../assets/close.svg';

import Button from '../Button';

import api from '../../services/api';

import {
  Container,
  IconsContainer,
  ModalContent,
  H1,
  Space,
  ButtonsBox,
  ModalContentNaverInfo,
  NaverPhoto,
  NaverInfo,
} from './styles';

interface NaverProps {
  id: string;
  name: string;
  admission_date: string;
  job_role: string;
  user_id: string;
  project: string;
  birthdate: string;
  url: string;
}

interface NaverCardProps {
  naver: NaverProps;
  setModalContent?: React.Dispatch<React.SetStateAction<Array<any>>>;
  setModalIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setNavers: React.Dispatch<React.SetStateAction<Array<Object>>>;
}

const NaverCard: React.FC<NaverCardProps> = ({
  naver,
  /* setModalContent,
  setModalIsOpen, */
  setNavers,
}) => {
  const [modalContent, setModalContent] = useState<Array<any>>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  const { addToast } = useToasts();

  ReactModal.setAppElement('#root');

  const handleCloseModal = useCallback(async () => {
    setModalIsOpen(false);
    const res = await api.get('navers');
    setNavers(res.data);
  }, [setNavers]);

  const handleCloseSecondModal = useCallback(async () => {
    setSecondModalIsOpen(false);
  }, []);

  const modalDeleteSuccess = useCallback(() => {
    setModalContent([
      <ModalContent key={naver.id}>
        <img src={closeIcon} alt="Fechar" onClick={handleCloseModal} />
        <H1>Naver excluído</H1>
        <span>Naver excluído com sucesso!</span>
        <Space />
      </ModalContent>,
    ]);
  }, [handleCloseModal, naver.id, setModalContent]);

  const deleteNaverFromApi = useCallback(async () => {
    try {
      await api.delete(`navers/${naver.id}`);
      modalDeleteSuccess();
    } catch (e) {
      addToast('Ocorreu um erro tentar excluir naver, tente novamente!', {
        appearance: 'warning',
        autoDismiss: true,
      });
    }
  }, [naver.id, addToast, modalDeleteSuccess]);

  const modalConfirmToDelete = useCallback(() => {
    setModalContent([
      <ModalContent key={naver.id}>
        <H1>Excluir Naver</H1>
        <span>Tem certeza que deseja excluir este Naver?</span>
        <ButtonsBox>
          <Button
            content="Cancelar"
            theme={'secundary'}
            onClick={handleCloseModal}
          />

          <Button content="Excluir" onClick={deleteNaverFromApi} />
        </ButtonsBox>
      </ModalContent>,
    ]);
    setModalIsOpen(true);
  }, [
    naver.id,
    deleteNaverFromApi,
    handleCloseModal,
    setModalContent,
    setModalIsOpen,
  ]);

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

  const customStylesSecond = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      borderRadius: 0,
      padding: 0,
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
  };

  const catchMonthsAndYears = useCallback((isoDate: string) => {
    const diff = moment.duration(moment().diff(isoDate));
    const years = diff.years();
    const months = diff.months();

    if (months && years) {
      return `${years} ano(s) e ${months} mese(s)`;
    } else if (!years) {
      return `${months} mese(s)`;
    } else {
      return `${years} ano(s)`;
    }
  }, []);

  return (
    <Container>
      <ReactModal isOpen={secondModalIsOpen} style={customStylesSecond}>
        <ModalContentNaverInfo key={naver.id}>
          <img src={closeIcon} alt="Fechar" onClick={handleCloseSecondModal} />
          <NaverPhoto>
            <img src={naver.url} alt={naver.name} />
          </NaverPhoto>

          <NaverInfo>
            <H1>{naver.name}</H1>
            <span>{naver.job_role}</span>
            <strong>Idade</strong>
            <span>{moment().diff(naver.birthdate, 'years')} anos</span>
            <strong>Tempo de empresa</strong>
            <span>{catchMonthsAndYears(naver.admission_date)}</span>
            <strong>Projetos que participou</strong>
            <span>{naver.project}</span>

            <IconsContainer>
              <img
                src={deleteIcon}
                alt="Excluir"
                onClick={modalConfirmToDelete}
              />
              <Link to={`/update/${naver.id}`}>
                <img src={editIcon} alt="Editar" />
              </Link>
            </IconsContainer>
          </NaverInfo>
        </ModalContentNaverInfo>
      </ReactModal>

      <ReactModal isOpen={modalIsOpen} style={customStyles}>
        {modalContent}
      </ReactModal>

      <img
        src={naver.url}
        alt={naver.name}
        onClick={() => setSecondModalIsOpen(true)}
      />
      <strong onClick={() => {}}>{naver.name}</strong>
      <span onClick={() => {}}>{naver.job_role}</span>

      <IconsContainer>
        <img src={deleteIcon} alt="Excluir" onClick={modalConfirmToDelete} />
        <Link to={`/update/${naver.id}`}>
          <img src={editIcon} alt="Editar" />
        </Link>
      </IconsContainer>
    </Container>
  );
};

export default NaverCard;
