# Beeanco-json-to-pdf-
PLEASE NOTE that I would like to develop this a bit more. Especially a visual part of PDFkit
Created by: Marcin Bednarz

About: Simple microservice that is listen on Port:3000 for post requests with json files and uses PDFKit to render back invoice notes in PDF data. 
I used: 
NODE.js 
PDFkit - to render PDF 
Express - to create a server

How to start?
npm run start in GITBash run the microservice on Port:3000.
When console.log show App is listening at localhost:3000 server will be ready to receive post requests. By providing GET request on localhost:3000 microservice you can check if server is working.
Test: 
GITBASH: 
npm test curl -X POST -H "Content-Type: application/json" -d @./test/fixtures/sample-request.json http://localhost:3000 --output test/results/sample-request.pdf
I also used POSTMAN to create post requests

DIFFICULTIES AND IDEAS:
The most difficult part of this project was for me to work with PDFkit design. So visual code of this part could be updated in the future by me.
I will work with cleaning a code a bit, because looks a bit messy. Json transformation to string should be more readable.
IF Statement for "null" value in address2 to hide it.
