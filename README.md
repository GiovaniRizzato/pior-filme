# Raspberry Award Tracking System

Bem-vindo ao repositório do projeto Raspberry Award Tracking System! Este projeto consiste em solução em Angular desenvolvida para visualização de estaticas dos *Raspberry Award*, confome a especificação presenta na [Documentação](documentacao/Especificação.pdf).

## Tecnologias Utilizadas :hammer_and_wrench:

![Typescript](https://img.shields.io/badge/typescript-%2300273f.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/angular-%23c3002f.svg?style=for-the-badge&logo=angular&logoColor=white)
![Testing Library](https://img.shields.io/badge/testing%20library-%23e3333a.svg?style=for-the-badge&logo=testinglibrary&logoColor=white)
![Mocks Server](https://img.shields.io/badge/mocks%20server-%235492a6.svg?style=for-the-badge)

## Contruindo a base da solução :open_file_folder:

Para configurar o ambiente de desenvolvimento, siga os passos abaixo:

1. Clone este repositório para o seu computador:

   ```bash
   git clone https://github.com/GiovaniRizzato/pior-filme-frontend
   ```
2. Baixe as dependencias da solução:

   ```bash
   npm install
   ```

## Utilizando a solução em ambiente de produção :rocket:

Para configurar o ambiente de desenvolvimento, siga os passos abaixo:

1. Siga os passos em [Contruindo a base da solução](#contruindo-a-base-da-solução-open_file_folder)
2. Rode a aplicação:

   ```bash
   npm run start
   ```
3. Acesse a pagina em http://localhost:4200/,

## Utilizando a solução em ambiente de desenvolviemtno :dart:

Para configurar o ambiente de desenvolvimento, siga os passos abaixo:

1. Siga os passos em [Contruindo a base da solução](#contruindo-a-base-da-solução-open_file_folder)
2. Rode o servidor mockado:

   ```bash
   npm run mocks
   ``` 
   obs.: Todas as respontas do "servidor" serão estaticas e não mudam idependente das entradas, para mais informações de como funciona visite https://www.mocks-server.org/ 
3. Com o "servidor" funcionando, em outro prompt execulte a solução em configuração de desenvolvimento: 
    ```bash
    npm run start:dev
    ```
4. Acesse a pagina em http://localhost:4200/,
