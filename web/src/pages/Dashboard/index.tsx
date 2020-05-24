import React, { useState } from 'react';

import { FiPower, FiClock } from 'react-icons/fi';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppontiment,
  Section,
  Appointment,
  Calendar,
} from './styles';
import logoImg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDay, setSelectedDay] = useState(new Date());

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="go barber" />
          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={() => signOut()}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horário agendado</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppontiment>
            <strong>Atendimento à seguir</strong>
            <div>
              <img
                src="https://avatars3.githubusercontent.com/u/22400145?s=400&u=026a5ec0a9462b75bc512fb3399bdf3303313a75&v=4"
                alt="Alek Tobias"
              />
              <strong>Alek Tobias</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppontiment>
          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/22400145?s=400&u=026a5ec0a9462b75bc512fb3399bdf3303313a75&v=4"
                  alt="Alek Tobias"
                />
                <strong>Alek Tobias</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/22400145?s=400&u=026a5ec0a9462b75bc512fb3399bdf3303313a75&v=4"
                  alt="Alek Tobias"
                />
                <strong>Alek Tobias</strong>
              </div>
            </Appointment>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>
              <div>
                <img
                  src="https://avatars3.githubusercontent.com/u/22400145?s=400&u=026a5ec0a9462b75bc512fb3399bdf3303313a75&v=4"
                  alt="Alek Tobias"
                />
                <strong>Alek Tobias</strong>
              </div>
            </Appointment>
          </Section>
          <Section>
            <strong>Tarde</strong>
          </Section>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};
export default Dashboard;
