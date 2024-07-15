# polling-app-backend

- Senha criptografada (hashing)

- eslint
- typeScript
- prisma
- express
- zod
- bycript
- express-async-handler
- vitest

#tdd
- Unit Tests - In memory tests to dont use bd

# Requisitos Funcionais
## Gestão de Enquetes

- [] Deve ser possível criar uma nova enquete com um título, descrição e opções de voto.
- [] Deve ser possível listar todas as enquetes disponíveis.
- [] Deve ser possível obter os detalhes de uma enquete específica pelo seu ID.
- [] Deve ser possível atualizar uma enquete existente (título, descrição, opções de voto).
- [] Deve ser possível excluir uma enquete.

## Autenticação e Autorização

- [x] Deve ser possível registrar um novo usuário com nome, e-mail e senha.
- [x] Deve ser possível realizar login de um usuário com e-mail e senha.
- [] Deve ser possível proteger endpoints sensíveis, permitindo acesso apenas a usuários autenticados.
## Votação

- [] Deve ser possível para um usuário votar em uma enquete.
- [] Deve ser possível ver o número total de votos em cada opção de uma enquete em tempo real.

## Atualizações em Tempo Real

- [] Deve ser possível para os usuários verem as atualizações dos resultados das enquetes em tempo real sem precisar atualizar a página.
# Regras de Negócio
## Restrição de Votação

- [] Um usuário deve ser capaz de votar apenas uma vez em cada enquete.
- [] Somente enquetes ativas devem aceitar votos.
## Validação de Dados

- [] Todos os campos obrigatórios devem ser validados durante a criação e atualização de enquetes.
- [] O e-mail do usuário deve ser único e validado no registro.

## Lógica de Resultados

Os resultados das enquetes devem ser atualizados automaticamente e refletir em tempo real as novas votações recebidas.
