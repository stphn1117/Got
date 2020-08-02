const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000, () => console.log('listening at 3000'));

app.post('/api', (req, response) => {
    console.log(req.body);
    console.log("recibido");
    response.send("server post");
});

app.get('/api', (resquest, response) => {
    console.log(request.body);
    response.send("SERVER GET");
})

