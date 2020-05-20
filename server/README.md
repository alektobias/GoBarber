# Recuperação de senha

**Requisitos Funcionais**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruçõs de recuperação de senha;
- O usuário deve poder resetar sua senha;

**Requisitos Não Funcionais**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**Regras de Negócio**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização de perfil

**Requisitos Funcionais**

- O usuário deve poder atualizar seu nome, e-mail e senha;


**Requisitos Não Funcionais**

**Regras de Negócio**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar sua senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**Requisitos Funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O usuário deve receber uma notificação sempre que houver um novo agendamento;
- O usuário deve poder ler as notificações não lidas;

**Requisitos Não Funcionais**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**Regras de Negócio**

- A notificação deve ter um status de lida e não lida para que o prestador possa controlar;


# Agendamento de serviço

**Requisitos Funcionais**

- O usuário deve poder listar todos os prestadores deserviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponívelde um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;

**Requisitos Não Funcionais**

- A listagem de prestadores deve ser armazenada em cache;

**Regras de Negócio**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponiveis de 8h às 18h (primeiro às 8h e últimoas 17h);
- O usuário não deve poder agendar em um horário já ocupado;
- O usuário não deve poder agendar em horários que já passaram;
- O usuário não pode agendar consigo mesmo;
