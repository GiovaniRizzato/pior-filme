# Raspberry Award Tracking System

Bem-vindo ao repositório do projeto Raspberry Award Tracking System! Este projeto consiste em solução em Angular desenvolvida para visualização de estaticas dos *Raspberry Award*, confome a especificação presenta na [Documentação](documentacao/Especificação.pdf).

## Tecnologias Utilizadas :hammer_and_wrench:

[![Typescript](https://img.shields.io/badge/typescript-%2300273f.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Angular](https://img.shields.io/badge/angular-%23c3002f.svg?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![Testing Library](https://img.shields.io/badge/testing%20library-%23e3333a.svg?style=for-the-badge&logo=testinglibrary&logoColor=white&)](https://testing-library.com/)
[![Mocks Server](https://img.shields.io/badge/mocks%20server-%235492a6.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjkwcHgiIGhlaWdodD0iOTBweCIgdmlld0JveD0iMCAwIDMxLjYzNyAzMS42MzciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMxLjYzNyAzMS42Mzc7IiB4bWw6c3BhY2U9InByZXNlcnZlIiBjbGFzcz0iIj48Zz48Zz4KCTxnPgoJCTxjaXJjbGUgY3g9IjcuNjc2IiBjeT0iNy4wNjciIHI9IjAuODI3IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIiBmaWxsPSIjRkZGRkZGIi8+CgkJPHBhdGggZD0iTTIxLjg0MSw0LjI0NGMtNC0xLjAxMi03LjE5OC0wLjc1OC0xMS40MzEsMS43NzFjLTAuMDk3LTAuOTI0LTIuNTMtMy42OTctNS40OTctMS43NSAgICBDMS43NTEsMy44NzQsMS43NTEsNy4xMzQsMS43NTEsNy4xMzRTMC4wMjMsMTAuMTczLDAsMTEuMzE4Yy0wLjAxNiwwLjc2NiwwLjQ0NiwwLjk3MywwLjg4OCwxLjEwNSAgICBjMi4yODUtMS4zMDEsNC4zNTktMC45OTIsNi4wNDQtMC43NGMwLjg3OCwwLjEzMSwxLjYzOSwwLjI0MiwyLjIwOCwwLjA4MmMwLjE5Ny0wLjA1NywwLjQwNCwwLjA2LDAuNDYsMC4yNTggICAgYzAuMDU2LDAuMTk3LTAuMDYsMC40MDQtMC4yNTcsMC40NjFjLTAuNzI0LDAuMjAzLTEuNTU3LDAuMDgtMi41MjEtMC4wNjRjLTEuNTA4LTAuMjI1LTMuMzUtMC40ODYtNS4zMjgsMC41MzUgICAgYzEuODc4LDMuMjcyLDcuMDgyLDQuMzgyLDEwLjg2MiwxLjc2OWMwLjgyNSwwLjA1MiwxLjkwNywwLjE3NSwzLjA3NCwwLjI3MWMwLjIxNSwwLjAxNywwLjAwNCwwLjY5Ny0wLjIwNSwxLjM3NSAgICBjLTAuMDczLDAuMjM2LTIuODYzLDAuODItMi45MTgsMS4wMjdjLTAuMTAxLDAuMzg5LDIuNTM3LDAuMDcyLDIuNzI1LDAuMzQxYzAuMTg3LDAuMjcxLTAuMzQsMS41MDktMC4wOTcsMi4wOTQgICAgYzAuMTYyLDAuMzg5LDEuNDgtMC4wMTEsMS44NDktMC45MjZjMC4xODYtMC40NTYtMC41OTMtMS4zNTktMC40Mi0xLjcyMmMwLjUyLTEuMDgzLDAuOTc0LTIuMDczLDEuMDU1LTIuMDcxICAgIGMwLjU0MSwwLjAxNywxLjA4LDAuMDE4LDEuNjA0LTAuMDA3YzEuMDkyLTAuMDUsMi4xNDYtMC4xNTIsMy4xMjItMC4yMzdjMC4xMjQtMC4wMTEsMC4zMzIsMC40MjUsMC41NTIsMC45MzMgICAgYzAuMSwwLjIzMi0xLjgyOCwwLjU4NC0xLjcyOSwwLjgxMmMwLjIwMywwLjQ2NiwxLjg5NywwLjE1MiwyLjUyOSwwLjczNGMwLjYzMywwLjU4NCwwLjY1MywyLjE1NiwxLjExOSwyLjMzNiAgICBjMC4yNTcsMC4wOTksMS4zMzQtMC42NzQsMS4xMTktMS42NTRjLTAuMzE0LTEuNDMtMi4wMzYtMy4yNzQtMS45NDYtMy4yNzhjMS4xOTUtMC4wNTUsMi4xODgsMC4wMDIsMi44NywwLjM1NSAgICBjMi41MywxLjMwOSwwLjY4MiwxMS4wNDctNS42NDMsMTEuNTM1Yy0zLjQ0NSwwLjI2NS00LjU5Ni0yLjQ5MS00LjE2OC00LjAyOGMwLjQyMy0xLjUxOSwyLjMxOS0yLjM0NSwzLjYzNC0yLjE0OCAgICBjMS4zMTIsMC4xOTIsMS41NTYsMS40MSwwLjk3MywyLjIzNWMtMC4wNzcsMC4xMDktMC4xNjYsMC4yMS0wLjI2MSwwLjMwNGMtMC4yMjYtMC4yMjktMC41MzgtMC4zNzEtMC44ODQtMC4zNzEgICAgYy0wLjY4NywwLTEuMjQyLDAuNTU3LTEuMjQyLDEuMjQyYzAsMC42ODcsMC41NTYsMS4yNDEsMS4yNDIsMS4yNDFjMC42MiwwLDEuMTMtMC40NTUsMS4yMjMtMS4wNTIgICAgYzAuMzM0LTAuMDgzLDAuNjY0LTAuMjQ1LDAuOTQ0LTAuNTM2YzEuMTE4LTEuMTY4LDAuODc1LTMuMjYtMS4yNDQtMy45NzhjLTIuMzcxLTAuODAyLTUuNjk0LDAuNjg4LTUuNzkyLDMuMjE4ICAgIGMtMC4wOTcsMi41MjksMi4yMjQsNS40OTYsNi4yMjEsNS4yNjhjNS45MzUtMC4zNDIsMTAuMjA0LTYuNTA0LDkuOTY1LTEyLjE5MkMzMS40MjEsMTEuMDI2LDI4Ljg0Nyw2LjAxNSwyMS44NDEsNC4yNDR6ICAgICBNNi45MjIsOS43MTNjLTEuMzMsMC0yLjQwOC0xLjA3OC0yLjQwOC0yLjQwOGMwLTEuMzMsMS4wNzgtMi40MDgsMi40MDgtMi40MDhjMS4zMjksMCwyLjQwNywxLjA3OCwyLjQwNywyLjQwOCAgICBDOS4zMyw4LjYzNSw4LjI1Miw5LjcxMyw2LjkyMiw5LjcxM3oiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiIGNsYXNzPSJhY3RpdmUtcGF0aCIgZGF0YS1vbGRfY29sb3I9IiMwMDAwMDAiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPjwvZz4gPC9zdmc+Cg==)](https://www.mocks-server.org/)

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
   obs.: Todas as respontas do "servidor" serão estaticas e não mudam idependente das entradas, para mais informações de como funciona visite: https://www.mocks-server.org/ 
3. Com o "servidor" funcionando, em outro prompt execulte a solução em configuração de desenvolvimento: 
    ```bash
    npm run start:dev
    ```
4. Acesse a pagina em http://localhost:4200/,
