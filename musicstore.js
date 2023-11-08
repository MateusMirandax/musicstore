
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/musicstore', {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    serverSelectionTimeoutMS : 20000  
})



const UsuarioSchema = new mongoose.Schema({
    
   email : {type :String, required : true },
   password : {type :String},
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);


app.post("/cadastrousuario", async(req, res)=>{
    const email = req.body.email;
    const password = req.body.password


    const usuario = new Usuario({
        email : email,
        password : password
    })

    try {
        const newUsuario = await usuario.save();

        res.json({error : null, msg : "Cadastro feito com sucesso", usuarioId : newUsuario._id});
    }
    catch(error){
        res.status(400).json({error});
    }
});

app.get("/cadastrousuario", async(req, res)=>{
    res.sendFile(__dirname + "/cadastrousuario.html")
})


const ProdutomusicaSchema = new mongoose.Schema({
    
    id_produtomusica : {type : Number, required : true },
    descricao : {type : String},
    marca : {type : String},
    dataFabricacao : {type : Date},
    quantidadeEstoque : {type : Number},
 });
 
 const Produtomusica = mongoose.model("Produtomusica", ProdutomusicaSchema);
 

 
 app.post("/cadastroprodutomusica", async(req, res)=>{
     const id_produtomusica = req.body.id_produtomusica;
     const descricao = req.body.descricao;
     const marca = req.body.marca;
     const dataFabricacao = req.body.dataFabricacao;
     const quantidadeEstoque = req.body.quantidadeEstoque

     if(quantidadeEstoque > 14){
        return res.status(400).json({error : "Acabou o estoque, não é possivel cadastrar mais!"});
    }
    else if(quantidadeEstoque <= 0){
        return res.status(400).json({error : "Você digitou um valor de estoque inválido. Insira um valor de estoque entre 1 e 14. "});
    }
 
 
     const produtomusica = new Produtomusica({
         id_produtomusica : id_produtomusica,
         descricao : descricao,
         marca : marca,
         dataFabricacao : dataFabricacao,
         quantidadeEstoque : quantidadeEstoque,
     })
 
     try {
         const newProdutomusica = await produtomusica.save();
 
         res.json({error : null, msg : "Cadastro feito com sucesso", produtomusicaId : newProdutomusica._id});
     }
     catch(error){
         res.status(400).json({error});
     }
 });
 
 app.get("/cadastroprodutomusica", async(req, res)=>{
     res.sendFile(__dirname + "/cadastroprodutomusica.html")
 })

 

app.get("/", async(req, res)=>{
    res.sendFile(__dirname + "/index.html")
});


app.listen(port, ()=>{
    console.log(`servidor rodando na porta ${port}`)
})
