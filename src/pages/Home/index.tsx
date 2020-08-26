import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactModal from 'react-modal';

import api from '../../services/api';

import NaverCard from '../../components/NaverCard';
import PageHeader from '../../components/PageHeader';

import { Container, TopBar, Content, CardsItem } from './styles';
import Loading from '../../components/Loading';

const Home = () => {
  const [navers, setNavers] = useState<Array<Object>>([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<Array<any>>([]);

  useEffect(() => {
    async function getNavers() {
      const res = await api.get('navers');
      setNavers(res.data);
      setLoading(false);
    }
    getNavers();
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
        {modalContent}
      </ReactModal>
      <PageHeader />
      <TopBar>
        <strong>Navers</strong>
        <Link to="/register">Adicionar Naver</Link>
      </TopBar>

      <Content>
        {loading ? (
          <Loading />
        ) : (
          navers.map((naver: any) => (
            <CardsItem key={naver.id}>
              <NaverCard
                naver={naver}
                setModalContent={setModalContent}
                setModalIsOpen={setModalIsOpen}
                setNavers={setNavers}
                setLoading={setLoading}
              />
            </CardsItem>
          ))
        )}
      </Content>
    </Container>
  );
};

export default Home;
