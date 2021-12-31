const express = require('express');
const app = express();
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server is runing');
})

app.post('/', (req, res) => {
    console.log (req.body);
    res.send('Got a Post request Thx');
})

app.listen(port, () => {
    console.log(`App is listening at localhost:${port}`);
})