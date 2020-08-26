import React, { useCallback } from 'react';

import { useAuth } from '../../hooks/AuthContext';

import logoImg from '../../assets/logo.svg';

import { Container } from './styles';

const PageHeader: React.FC = () => {
  const { signOut } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <img src={logoImg} alt="Navers Logo" />
      <span onClick={handleSignOut}>Sair</span>
    </Container>
  );
};

export default PageHeader;
