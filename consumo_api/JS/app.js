//Pega o container onde os cards serão exibidos
const container = document.getElementById("container")

//Pega o botão de busca
const buscarcachorros = document.getElementById("buscarCachorros")

//Pega o input onde o usuario digita a raça
const input = document.getElementById("pesquisa")

//Função assicrona responsavel por buscar os dados do cachorro na API
async function BuscarCachorros(){

    //Pega o valor digitado no input
const raca = input.value

try{

    // faz a requisição para a API buscando a raça digitada
const resposta = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${raca}`,
    {
        headers:{
"x-api-key": "live_Hl67QVVE8lOWXGkEVuLTIbcLLxvQTX7OfEfaOzS6kYtSXmwaK5dwFopy7AHzH5ga"
        }
    }
)

// converte a resposta da API para JSON
const dados = await resposta.json()

// Verifica se a API encontrou alguma raça
if(dados.length === 0){
container.innerHTML = "<p>Raça não encontrada</p>"
return
}

//Pega a primeira raça encontrada
const dog = dados[0]

let imagem = ""

//busca a imagem da raça utilizando o reference_image_id
const respostaImage = await fetch(
`https://api.thedogapi.com/v1/images/${dog.reference_image_id}`
)

//converte a resposta da imagem para JSON
const dadosImage = await respostaImage.json()

//pega a URL da imagem retornada pela API

const image = dadosImage.url

container.innerHTML = ""

//cria um elemento div que será o card do cachorro
const card = document.createElement("div")

//adiciona a classe card para estilização no CSS
card.classList.add("card")

//adiciona o conteudo HTML dentro do card
card.innerHTML = `
<img src="${image}" alt="${dog.name}">
<h3>${dog.name}</h3>
<p><strong>Temperamento:</strong> ${dog.temperament}</p>
<p><strong>Expectativa de vida:</strong> ${dog.life_span}</p>
`

//adiciona o card dentro do container da pagina
container.appendChild(card)

}catch(erro){

    //caso aconteça algum erro na requisição da API
container.innerHTML = "<p>Erro ao conectar com a API</p>"

// Mostra o erro no console par facilitar o debug
console.error(erro)

}

}

// adiciona um evento no botão para executar a busca quando ele for clicado



buscarcachorros.addEventListener("click", BuscarCachorros)
