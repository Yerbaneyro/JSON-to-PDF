const express = require('express');
const app = express();
const port = 3000

app.use(express.json())


//CHECKING IF SERVER IS RUNING BY GET REQUEST AND BY NODE CMD//
app.get('/', (req, res) => {
    res.send('Server is live');
})

app.listen(port, () => {
    console.log(`App is listening at localhost:${port}`);
})

//GETING DATA FROM JSON FILE//
app.post('/', (req, res) => {
    const invoiceData = req.body
    console.log(invoiceData)


    res.send(`Got a Post request Thank you`);
})

