import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background, AnimatedContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .email('Digite um e-mail válido')
          .required('E-mail Obrigatório'),
      });
      await schema.validate(data, { abortEarly: false });

      // Recuperação de senha

      formRef.current?.setErrors({});
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        formRef.current?.setErrors(getValidationErrors(err));
      }
      addToast({
        type: 'error',
        title: 'Erro na recuperação de senha',
        description:
          'Ocorreu um erro ao tentar realizar a recuperação de senha, tente novamente.',
      });
    }
  }, []);

  return (
    <Container>
      <Content>
        <AnimatedContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Recupera senha</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />

            <Button type="submit">Recuperar</Button>
          </Form>
          <Link to="/signin">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimatedContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default ForgotPassword;
