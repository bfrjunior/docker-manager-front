# Docker Manager UI

Este é um front-end em Angular para a API Docker Manager, que permite gerenciar containers e imagens Docker através de uma interface web amigável.

## Funcionalidades

- Dashboard com visão geral de containers e imagens
- Gerenciamento de containers (listar, iniciar, parar, excluir, criar)
- Gerenciamento de imagens (listar, filtrar, criar containers a partir de imagens)

## Pré-requisitos

- Node.js e npm instalados
- Angular CLI instalado
- API Docker Manager rodando em http://localhost:8080

## Instalação

1. Clone este repositório
2. Navegue até a pasta do projeto: `cd docker-manager-ui`
3. Instale as dependências: `npm install`
4. Inicie o servidor de desenvolvimento: `npm start`
5. Acesse a aplicação em: `http://localhost:4200`

## Estrutura do Projeto

- `src/app/components/dashboard`: Componente de dashboard principal
- `src/app/components/containers`: Componente para gerenciamento de containers
- `src/app/components/images`: Componente para gerenciamento de imagens
- `src/app/services/docker.service.ts`: Serviço para comunicação com a API

## API Backend

Este front-end consome a API Docker Manager disponível em: https://github.com/bfrjunior/docker-manager-api

## Configuração de Proxy

O arquivo `proxy.conf.json` está configurado para redirecionar as chamadas de API para o backend em execução no localhost:8080, evitando problemas de CORS.