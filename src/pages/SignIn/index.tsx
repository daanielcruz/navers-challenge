import React, { useCallback, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/AuthContext';

import logoImg from '../../assets/logo.svg';

import { Container, StyledForm } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { addToast } = useToasts();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      setLoading(true);
      try {
        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (e) {
        console.log(e.lineNumber);
        addToast('Ocorreu um erro ao fazer login, cheque as credenciais!', {
          appearance: 'warning',
          autoDismiss: true,
        });
      }
      setLoading(false);
    },
    [addToast, signIn],
  );

  return (
    <Container>
      <StyledForm onSubmit={handleSubmit}>
        <img src={logoImg} alt="Navers Logo" />
        <Input
          type="email"
          id="email"
          name="email"
          label="E-mail"
          placeholder="E-mail"
          required
        />
        <Input
          type="password"
          id="password"
          name="password"
          label="Senha"
          placeholder="Senha"
          required
        />
        <Button type="submit" content={loading ? 'Carregando...' : 'Entrar'} />
      </StyledForm>
    </Container>
  );
};

export default SignIn;
