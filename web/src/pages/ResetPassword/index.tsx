/* eslint-disable no-unused-expressions */
import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useHistory, useLocation } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import { Container, Content, Background, AnimatedContainer } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        const schema = Yup.object().shape({
          password: Yup.string().min(6, 'No minimo 6 dígitos'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'As senhas não são iguais',
          ),
        });
        await schema.validate(data, { abortEarly: false });

        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        const { password, password_confirmation } = data;

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        formRef.current?.setErrors({});

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current?.setErrors(getValidationErrors(err));
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar senha, tente novamente.',
        });
      }
    },
    [addToast, history, location],
  );

  return (
    <Container>
      <Content>
        <AnimatedContainer>
          <img src={logoImg} alt="GoBarber" />
          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Resetar senha</h1>
            <Input
              icon={FiLock}
              type="password"
              placeholder="Nova senha"
              name="password"
            />
            <Input
              icon={FiLock}
              type="password"
              placeholder="Confirmação da senha"
              name="password_confirmation"
            />
            <Button type="submit">Altera senha</Button>
          </Form>
        </AnimatedContainer>
      </Content>
      <Background />
    </Container>
  );
};
export default ResetPassword;
