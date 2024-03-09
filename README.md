# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Set up a PostgreSQL database. Ensure that you have PostgreSQL installed on your machine and have access to a PostgreSQL server.
3. Create a .env file in the root directory of the project. You can use the provided .env.example file as a template. Replace the placeholder values in the .env file with your actual PostgreSQL database settings, such as DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, and DB_NAME.
4. Run `npm run migration` command
5. Run `npm start` command

API Documentation:
GET /leaderboard:

Description: Retrieves the leaderboard data, which includes user records sorted by score in descending order.
Method: GET
Endpoint: /leaderboard
Controller method: getLeaderboard
Request body: None
Response:
Status code: 200 (OK)
Body: JSON object with the following structure:
{
  "data": [
    {
      "id": number,
      "score": string,
      "name": string,
      "ranking": number
    },
    ...
  ]
}
Description: An array of user records with additional ranking property assigned based on the order in the array.

POST /create/userRecord:

Description: Creates a new user record with the provided name and score.
Method: POST
Endpoint: /create/userRecord
Controller method: createUserRecord
Request body:
{
  "name": string,
  "score": string
}
Response:
Status code: 200 (OK)
Body: JSON object with the following structure:
{
  "message": "User record created successfully",
  "userRecord": {
    "id": number,
    "score": string,
    "name": string
  }
}
Description: The message indicating a successful creation and the newly created user record.