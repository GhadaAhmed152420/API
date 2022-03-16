const express = require('express');
const { verify } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) =>{
       if(err){
           res.sendStatus(403);
       }else{
        res.json({
            message: 'Post created....',
            authData
        });
       }
    });
});

app.post('/api/login', (req, res) => {
    //Mock user
    const user = {
        id: 1,
        username: 'brad',
        email: 'brad@gmail.com'
    }

   jwt.sign({user}, 'secretkey',{ expiresIn: '30s'}, (err, token) => {
       res.json({
           token
       });
   });
});

//formate of token
//Authorization: Bearer <access_token>

function verifyToken(req, res , next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefiened
    if(typeof bearerHeader !== 'undefined'){
        //split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set the Token
        req.token = bearerToken;
        //Next Middleware
        next();
    }else{
        //Forbidden
        res.sendStatus(403);
    }

}

app.listen(5000, () => console.log('server started on port 5000'));