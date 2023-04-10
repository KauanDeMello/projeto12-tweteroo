import express from "express";
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())


const users = []

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
    
      users.push(newUser)
    
      res.status(201).send("Ok!")
} )


app.get("/tweets", (req, res) => {
    const tweets = [
        {
            username: "bobesponja",
            avatar: "https://cdn.shopify.com/s/files/1/0150/0643/3380/files/Screen_Shot_2019-07-01_at_11.35.42_AM_370x230@2x.png",
            tweet: "Eu amo hambúrguer de siri!"
        }
    ]
    res.send(tweets)
})


const PORT = 5000

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}` ))