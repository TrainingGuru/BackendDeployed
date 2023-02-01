# BackendDeployed

This Repo was created for the deployment of the backend in Release 1. All future backend development will be done in
the development branch and branch off from it as the main one is the deployed branch. 

# Backend Rules
PascalCase - Filenames

UPPERCASE for Constants

lowerCamelCase for variables, properties and function names

Files
.env file - sensitive data (API keys etc)

src file - Contains the project code
- index.js: Sever Starting point
- Config: Code for connection to database etc
- Routes: Endpoints code - different files for each endpoint e.g Trainers.js = /Trainers endpoint
- Models: Database data schema for sending data to Database
-