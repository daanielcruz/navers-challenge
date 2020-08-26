import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import NaverCard from '../../components/NaverCard';
import PageHeader from '../../components/PageHeader';

import { Container, TopBar, Content, CardsItem } from './styles';
import Loading from '../../components/Loading';

const Home = () => {
  const [navers, setNavers] = useState<Array<Object>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNavers() {
      const res = await api.get('navers');
      setNavers(res.data);
      setLoading(false);
    }
    getNavers();
  }, []);

  return (
    <Container>
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
              <NaverCard naver={naver} setNavers={setNavers} />
            </CardsItem>
          ))
        )}
      </Content>
    </Container>
  );
};

export default Home;
