import React, { useCallback } from 'react';
import { useToasts } from 'react-toast-notifications';

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
  setModalContent: React.Dispatch<React.SetStateAction<Array<any>>>;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNavers: React.Dispatch<React.SetStateAction<Array<Object>>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const NaverCard: React.FC<NaverCardProps> = ({
  naver,
  setModalContent,
  setModalIsOpen,
  setNavers,
  setLoading,
}) => {
  const { addToast } = useToasts();

  const handleCloseModal = useCallback(() => {
    setModalIsOpen(false);
  }, [setModalIsOpen]);

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
      setLoading(true);
      const res = await api.get('navers');
      setNavers(res.data);
      setLoading(false);
    } catch (e) {
      addToast('Ocorreu um erro tentar excluir naver, tente novamente!', {
        appearance: 'warning',
        autoDismiss: true,
      });
    }
  }, [naver.id, addToast, modalDeleteSuccess, setLoading, setNavers]);

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

  return (
    <Container>
      <img src={naver.url} alt="Foto do Naver" />
      <strong>{naver.name}</strong>
      <span>{naver.job_role}</span>

      <IconsContainer>
        <img src={deleteIcon} alt="Excluir" onClick={modalConfirmToDelete} />
        <img src={editIcon} alt="Editar" onClick={() => console.log('del')} />
      </IconsContainer>
    </Container>
  );
};

export default NaverCard;
