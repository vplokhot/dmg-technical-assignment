# dmg-technical-assignment
## Instructions:

######  DB First
      docker-compose up -d db
######  Backend Second
     docker-compose up -d --build backend
######  UI Last
      docker-compose up -d --build ui

######  Notes
-CRUD Operations are avaialable for all logged in users under the assumption that they are admins
