

# polling-app-backend

## Getting Started

To run the server locally, follow these steps:

1. Clone the project repository:

2. Navigate to the project folder:

3. Install the required dependencies:

```
npm install
```
4. Up the docker compose:
```
docker compose up -d
```
5. Start Migrations
```
npx prisma migrate dev
```
6. Start the development server:

```
npm run start:dev
```

The server will start, and you can access the API endpoints using tools like [Insomnia](https://insomnia.rest/) to test the calls.

run testes
```
npm run test
```

