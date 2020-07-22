const express = require('express')
const app = express()
const port = 3001


const redis = require("redis");
const client = redis.createClient();

// converting the client.get function into a promise

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client); 

app.get('/jobs', async (req, res) => {
    const jobs = await getAsync('github');
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
  // we need to set a server header in api that allows req from the url(origin)
    console.log(JSON.parse(jobs).length);
    return res.send(jobs)
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))