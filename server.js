// — [SPRINT 01 - BASE: Express e ES Modules — mantido da primeira aula] — 
import express from 'express'


const app = express()
const porta = 3000


app.get('/', (req, res) => {
    res.send('Servidor Node.js com Express funcionando!')
})


// — [SPRINT 02 — HERDADO] —
// Mensagens em memória: ao reiniciar o servidor, voltam aos valores
// iniciais.
const mensagens = [
  { id: 1, usuario: "Ana", texto: "Bom dia!" },
  { id: 2, usuario: "Pedro", texto: "Olá, turma!" },
  { id: 3, usuario: "Maria", texto: "Nosso servidor está funcionando!" },
];


// [SPRINT 02 — HERDADO] Função que devolve todas as mensagens.
function listarMensagens() { return mensagens; }


// [SPRINT 02] Pesquisa uma mensagem pelo identificador.
function buscarMensagem(id) { return mensagens.find(m => m.id === id); }


// — [SPRINT 02 — ROTAS HERDADAS] —
app.get("/mensagens", (req, res) => res.json(listarMensagens()));




app.get("/mensagens/:id", (req, res) => {
  const id = Number(req.params.id);
  const mensagem = buscarMensagem(id);
  if (!mensagem) return res.status(404).json({ erro: "Mensagem não encontrada." });
  res.json(mensagem);
});


app.get("/total-mensagens", (req, res) => res.json({ total: mensagens.length }));


// — [SPRINT 03 - NOVO: consulta assíncrona com Promise] —
// setTimeout é apenas uma simulação de espera (Sprint 03).
function consultarMensagens(simularErro = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (simularErro) return reject(new Error("Falha simulada na consulta."));
            resolve(listarMensagens());
        }, 1000);
    });
}


// — [SPRINT 03 — NOVAS ROTAS: then/catch e async/await] —
app.get("/mensagens-then", (req, res) => {
  consultarMensagens()
    .then(dados => res.json(dados))
    .catch(erro => {
      console.error(erro);
      res.status(500).json({ erro: "Falha ao consultar mensagens." });
    });
});


app.get("/mensagens-async", async (req, res) => {
  try {
    res.json(await consultarMensagens());
  } catch (erro) {
console.error(erro);
res.status(500).json({ erro: "Falha ao consultar mensagens." });
}
});


app.get("/mensagens-erro", async (req, res) => {
  try {
    res.json(await consultarMensagens(true));
  } catch (erro) {
    console.error("Erro simulado:", erro.message);
    res.status(500).json({ erro: "Falha simulada na consulta." });
  }
});


// [SPRINT 01 - SERVIDOR: iniciado na porta 3000; mantido ao longo das aulas]
app.listen(PORT, () => {console.log("Servidor iniciado em https://localhost:${PORT}")});