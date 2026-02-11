//const express = require("express") // antigo
import express from "express" // atual
const app = express()
app.use(express.json())
let proximoId = 2
let  LISTARALUNOS = [
    {
        id:1,
        nome:"Vitor"
    },
    {
        id:2,
        nome:"Felipe"
    },
]

//
app.get("/",(req,res)=>{
    res.status(200).json({       //300 ao 399 REDIRECIONAMENTO/400 ao 499 ERRO DO CLIENTE / 500 ao 999 ERRO DE SERVIDOR.
        msg:"BOM DIA"                
    })                
})
//LISTAR ALUNO
app.get("/alunos",(req,res) =>{
    res.status(200).json(LISTARALUNOS)
})
//BUSCAR ALUNO POR ID
app.get("/alunos/:id",(req,res)=>{
    const idParametro = Number (req.params.id)
    const aluno = LISTARALUNOS.find(a => a.id==idParametro)

        if (!aluno) {
            return res.status(404).json({msg:"Aluno nao Encontrado"})
        }
    res.status(200).json(aluno)
})
//ALTERAR ALUNO
app.put("/alunos/:id", (req, res) => {
    const idParametro = Number(req.params.id)
    const indiceAluno = LISTARALUNOS.findIndex(a => a.id === idParametro)
    const { nome } = req.body

    if (indiceAluno === -1) {
        return res.status(404).json({ msg: "Aluno nao Encontrado" })
    }

    if (!nome) {
        return res.status(400).json({ msg: "O Nome é obrigatório!" })
    }

    LISTARALUNOS[indiceAluno].nome = nome

    res.status(200).json({
        msg: "Alteração feita com sucesso!",
        aluno: LISTARALUNOS[indiceAluno]
    })
})

//DELETAR ALUNO
app.delete("/alunos/:id",(req,res)=>{
    const idParametro = Number (req.params.id)
    const aluno = LISTARALUNOS.findIndex(a => a.id==idParametro)
    console.log(aluno)
        
        if (aluno ===-1) {
            return res.status(400).json({msg:"Aluno nao Encontrado"})
        }
        LISTARALUNOS.splice(aluno,1)
        res.status(200).json({msg:"Aluno excluido com sucesso!"})
})

//DELETAR ERRO
app.delete("/alunos/", (req,res)=>{
    const idParametro = req.params.codigo? Number(req.params.codigo):0;
    console.log("Parametro: ", req.params);
    if (idParametro===0){
        return res.status(400).json({msg: "O parâmetro é obrigatório"})
    }
})

//ADICIONAR ALUNO
app.post("/alunos", (req, res) => {
    console.log(req.body)
    const { nome } = req.body

    if (!nome) {
        return res.status(400).json({ msg: "Por gentileza complete o nome!" })
    }

    const id = LISTARALUNOS.length > 0
        ? LISTARALUNOS[LISTARALUNOS.length - 1].id + 1
        : 1

    const aluno = { id, nome }
    LISTARALUNOS.push(aluno)

    res.status(201).json({ msg: "Aluno cadastrado com sucesso!" })
})


app.listen(5000, ()=>{
    console.log("Server Rodando!")
})



  