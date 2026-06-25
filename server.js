import express from "express"
import path from "path"


const app = express()

const path = path();


// get all users

app.get("/getUsers", async(_req, res)=> {
    await client.connect (URL)

    console.log("connected succesfully")

    const db = client.db("harshit-docker")
    const data = await db.collection('users').find({}).toArray();

    client.commit();
    client.close();
    res.send(data)

})


// post route

app.post("/addUser", async (_req,res)=>{
    const UserObj = _req.body ;
    console.log(UserObj)

    await client.connect(URL)

    console.log('Connected db successfully')

    const db = client.db("harshit-docker")
    const db = await db.collection('users').insertOne(userObj)


    console.log(data)
    console.log("data inserted in the DB")
    client.commit()

    client.close();

})

app.listen( PORT , ()=>{
    console.log(`server running on port `)
})