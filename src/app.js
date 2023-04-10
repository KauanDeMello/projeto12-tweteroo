import express from "express";
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())


const user = []

const tweets = []

app.post("/sign-up", (req, res) =>{
    const {username, avatar} = req.body

  
    if (!username || !avatar) {
        return res.status(400).send("Por favor, preencha todos os campos!")
      }
    
      const newUser = {
        username: username,
        avatar: avatar
      }
    
      user.push(newUser)
    
      res.status(201).send("Ok!")
} )


app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;
  
    
    const userExists = user.find((u) => u.username === username);
    if (!userExists) {
      return res.status(401).send("UNAUTHORIZED");
    }
  

    tweets.push({ username, tweet });
  
    res.status(201).send("OK");
  });



  app.get("/tweets", (req, res) => {
    const lastTenTweets = tweets.slice(-10).reverse();
    const tweetsWithAvatar = lastTenTweets.map((tweet) => {
      const userWithAvatar = user.find((u) => u.username === tweet.username);
      return {
        username: tweet.username,
        avatar: userWithAvatar?.avatar || "",
        tweet: tweet.tweet,
      };
    });
    res.send(tweetsWithAvatar);
  });


const PORT = 5000

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}` ))