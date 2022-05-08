const express = require("express"); 
const app = express(); 
require("dotenv").config(); 
const apiToken = process.env.APP_TOKEN; 
const cors = require("cors"); 
const axios = require("axios"); 





// get the total breeds
app.get("/breeds", (req,res)=> {
     const config = {
         method: "GET", 
         url: "https://api.thecatapi.com/v1/breeds", 
         header: {
            "x-api-key": apiToken,
         }, 
         
     }

     axios.request(config).then((response)=> {
         res.status(200).json( response.data)
     }).catch(err => res.status(500).json(err)); 
  
} )

//get the particular breed
app.get("/search", (req, res)=> {

    const config = {
        method: "GET", 
        url: `https://api.thecatapi.com/v1/breeds/search?q=${req.query.name}`, 
        header: {
            "x-api-key": apiToken,  
        },
       
    }

    
    axios.request(config).then((response)=> {
        res.status(200).json(response.data)
    }).catch(err => res.status(500).json(err)); 
})


// get the particular image

app.get("/details/:id", (req, res)=> {

    const config = {
        method: "GET", 
        url: `https://api.thecatapi.com/v1/images/${req.params.id}`, 
        header: {
            "x-api-key": apiToken,  
        },
       
    }

    
    axios.request(config).then((response)=> {
        res.status(200).json(response.data)
    }).catch(err => res.status(500).json(err)); 
})

//get the top10 breed

app.get("/best", (req, res)=> {

    const config = {
        method: "GET", 
        url: "https://api.thecatapi.com/v1/breeds", 
        header: {
            "x-api-key": apiToken,  
        },
    
    }

    axios.request(config).then((response)=> {

        const Data = response.data; 
        const topBreeds = [ "Maine Coon", "Ragdoll", "Scottish Fold", "Siamese", "American Shorthair", "Persian", "Sphynx", "Bengal", "Exotic Shorthair", "Burmese"];
        const sorted = topBreeds.map((value) => Data.find((i) => i.name === value ));
         
        res.status(200).json(sorted); 
        
        
    }).
    catch(err=> res.status(500).json(err)); 
})

//get random images in the homepage 
app.get("/images", (req, res)=> {

    const config = {
        method: "GET", 
        url: "https://api.thecatapi.com/v1/breeds", 
        header: {
            "x-api-key": apiToken,  
        },
    
    }

    axios.request(config).then((response)=> {

       let arr = []; 
       const Data = response.data; 
       for(var i=0; i<4; i++){
           var max = 64; 
           var min = 0; 
           var random = Math.floor(Math.random() * (max - min) + min); 
           arr.push(random); 
       }

       console.log(arr); 
       

       const sorted = Data.filter((value, index)=> arr.find((i) => index === i)); 
       const newSorted = sorted.map((value) => {
           return{
               name:value.name,
               image: value.image.url
           }
       })

         
        res.status(200).json(newSorted); 
        
        
    }).
    catch(err=> res.status(500).json(err)); 
})



// app.use(
//     cors({
//         origin: "*", 
//         credentials: true
//     }));
const corsOptions ={
    origin:'http://localhost:8000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions)); 
app.use(express.json()); 
app.listen("8000", ()=> {
    console.log(
        "the app is listening at port 8000"
    )
})