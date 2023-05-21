technologies used:

- materialize
- react-router-dom
- bcrypt
- jwt
- cloudinary
- tailwind

WAY TO FIX CORS ERROR when connecting FE to BE:
FIX THE ERROR FETCHING DB TO THE CLIENT-SIDE PORT

1. add "proxy": "http://localhost:{SERVER-PORT}" to client package.json
2. restart the server & client

CLOUDINARY (upload images/files to db):

under github account
settings --> upload --> "enable unsigned uploading" --> add upload preset
used 'dotenv' for react to store API vars

TODO:
replace local storage 'setItem' with context variables soon
be able to sign in with email OR username

push to heroku:

- git add .
- git commit -m "MESSAGE"
- git push heroku main
- heroku logs --tail to see errors

deployed App: https://new-social-media.herokuapp.com/
