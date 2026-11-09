# 💊 MedTime — Sistema de Gerenciamento de Rotina Medicamentosa

## 📌 Sobre o projeto

O **MedTime** é um sistema web desenvolvido com o objetivo de auxiliar pessoas no gerenciamento de seus medicamentos e no acompanhamento de suas rotinas de tratamento.

A proposta surgiu da necessidade de tornar o controle de medicamentos mais simples, organizado e acessível, permitindo que os usuários acompanhem os horários das doses, registrem se tomaram ou não seus medicamentos e consultem seu histórico de utilização.

O sistema busca contribuir para a organização da rotina medicamentosa, reduzindo esquecimentos e proporcionando uma visão mais clara dos compromissos relacionados ao tratamento.

O projeto está sendo desenvolvido como parte de uma atividade acadêmica do curso de **Tecnologia em Análise e Desenvolvimento de Sistemas (TADS)**, no Instituto Federal do Piauí (IFPI).

## 🎯 Objetivo geral

Desenvolver uma aplicação web intuitiva e acessível que permita aos usuários cadastrar medicamentos, organizar horários de administração e acompanhar o cumprimento de suas rotinas medicamentosas.

## 🎯 Objetivos específicos

- Permitir o cadastro e o acesso de usuários.
- Disponibilizar um painel principal com informações sobre a rotina medicamentosa.
- Possibilitar o cadastro, a edição e a exclusão de medicamentos.
- Organizar os medicamentos em um calendário.
- Permitir o registro de doses tomadas ou não tomadas.
- Disponibilizar um histórico dos registros realizados.
- Oferecer uma área de perfil para consulta e gerenciamento de informações básicas do usuário.
- Desenvolver uma interface simples, organizada e de fácil utilização.

## ⚙️ Funcionalidades do sistema

O MVP (Produto Mínimo Viável) do MedTime está organizado em telas que representam as principais funcionalidades da aplicação.

### 1. Login

Tela responsável pelo acesso do usuário ao sistema.

**Funcionalidades:**
- Inserção de e-mail e senha.
- Validação básica dos campos.
- Navegação para a tela de cadastro.
- Redirecionamento para o painel principal após a simulação de um acesso bem-sucedido.

### 2. Cadastro de usuário

Permite que novos usuários preencham suas informações para utilizar o sistema.

**Funcionalidades:**
- Cadastro de informações pessoais.
- Preenchimento de e-mail e senha.
- Validação básica dos campos.
- Navegação para a tela de login após o cadastro simulado.

### 3. Dashboard (Início)

É a tela principal do sistema, responsável por apresentar uma visão geral da rotina medicamentosa do usuário.

**Funcionalidades:**
- Visualização dos medicamentos cadastrados.
- Consulta das doses previstas para o dia.
- Identificação dos horários de administração.
- Registro de dose tomada por meio da ação **"Tomei"**.
- Registro de dose não tomada por meio da ação **"Não tomei"**.
- Navegação para as demais áreas do sistema.

### 4. Calendário

Área destinada à organização dos medicamentos e seus respectivos horários.

**Funcionalidades:**
- Visualização da programação de medicamentos.
- Cadastro de novos medicamentos.
- Edição das informações dos medicamentos.
- Exclusão de medicamentos.
- Configuração de horários e frequência de utilização.

### 5. Histórico

Área destinada à consulta dos registros relacionados à rotina medicamentosa.

**Funcionalidades previstas:**
- Visualização das doses registradas.
- Identificação de doses tomadas.
- Identificação de doses não tomadas.
- Consulta dos registros anteriores.

O histórico deverá refletir automaticamente as ações realizadas pelo usuário no dashboard.

### 6. Perfil

Área destinada à visualização e ao gerenciamento das informações básicas do usuário.

**Funcionalidades previstas:**
- Visualização dos dados pessoais.
- Consulta das informações da conta.
- Possibilidade de atualização dos dados cadastrais.

## 🛠️ Tecnologias utilizadas

O projeto utiliza tecnologias fundamentais para o desenvolvimento de aplicações web.

| Tecnologia | Aplicação no projeto |
|---|---|
| HTML5 | Estruturação das páginas |
| CSS3 | Estilização e responsividade das interfaces |
| JavaScript | Implementação das funcionalidades e interações |
| Git | Controle de versão do código |
| GitHub | Hospedagem do repositório e colaboração da equipe |

## 🏗️ Arquitetura e funcionamento

O MedTime está sendo desenvolvido inicialmente como uma aplicação **front-end**, utilizando HTML, CSS e JavaScript.

Nesta primeira versão, as funcionalidades são implementadas no próprio navegador, sem integração com um servidor ou banco de dados remoto.

O funcionamento do MVP contempla:

1. O usuário acessa o sistema pela tela de login.
2. Após a simulação de autenticação, é direcionado ao dashboard.
3. No calendário, pode organizar seus medicamentos e horários.
4. No dashboard, acompanha as doses previstas e registra sua situação.
5. Os registros alimentam as informações apresentadas no histórico.

Essa abordagem permite validar a interface, a navegação e as principais funcionalidades antes de uma possível implementação de back-end.

## 👥 Equipe de desenvolvimento

Projeto desenvolvido em equipe pelos seguintes integrantes:

- **Deusdébio** — Integrante da equipe.
- **Lourimar** — Integrante da equipe.
- **Marcelo** — Integrante da equipe.
- **Marcos** — Integrante da equipe.

## 🚀 Como executar o projeto

Para executar o MedTime localmente, siga as etapas:

**1. Clone o repositório:**

```bash
git clone URL_DO_REPOSITORIO
```

**2. Acesse o diretório do projeto:**

```bash
cd MedTime
```

**3. Abra o projeto:**

Abra a pasta no Visual Studio Code ou em outro editor de sua preferência.

**4. Execute a aplicação:**

Abra o arquivo HTML inicial no navegador ou utilize a extensão Live Server do Visual Studio Code para executar o projeto em um servidor local.

> Substitua `URL_DO_REPOSITORIO` pelo endereço real do repositório no GitHub.

## 📂 Organização do desenvolvimento

O desenvolvimento do MedTime é dividido em etapas, contemplando:

- Planejamento e definição da proposta.
- Levantamento e organização dos requisitos.
- Prototipação e desenvolvimento das interfaces.
- Implementação das funcionalidades.
- Integração das telas desenvolvidas pelos integrantes.
- Testes de navegação e funcionamento.
- Validação do MVP.

## 🔮 Melhorias futuras

Após a conclusão e validação do MVP, o projeto poderá receber novas funcionalidades, como:

- Implementação de back-end.
- Integração com banco de dados.
- Autenticação real de usuários.
- Armazenamento permanente dos medicamentos e registros.
- Notificações e lembretes de horários.
- Relatórios de adesão à rotina medicamentosa.
- Melhorias de acessibilidade.
- Versão adaptada para dispositivos móveis.

## ⚠️ Observação importante

O MedTime é uma ferramenta de organização e acompanhamento de rotinas medicamentosas. Ele não substitui orientações médicas, prescrições ou acompanhamento de profissionais de saúde.

O sistema não recomenda medicamentos nem determina dosagens. As informações cadastradas devem seguir as orientações fornecidas por profissionais habilitados.

## 📄 Status do projeto

**Em desenvolvimento — MVP**

O projeto encontra-se em fase de implementação e integração das telas, com foco na construção de uma versão funcional das principais funcionalidades propostas.

---

Desenvolvido como projeto acadêmico do curso de Tecnologia em Análise e Desenvolvimento de Sistemas — IFPI.

**MedTime — Sua rotina medicamentosa mais organizada.**