const container = document.getElementById("container")
const buscarcachorros = document.getElementById("buscarCachorros")
const input = document.getElementById("pesquisa")

async function BuscarCachorros() {

const raca = input.value

try {

const respostaRaca = await fetch(
`https://api.thedogapi.com/v1/breeds/search?q=${raca}`,
{
headers: {
"x-api-key": "live_Hl67QVVE8lOWXGkEVuLTIbcLLxvQTX7OfEfaOzS6kYtSXmwaK5dwFopy7AHzH5ga"
}
}
)

const dadosRaca = await respostaRaca.json()

if(dadosRaca.length === 0){
container.innerHTML = "<p>Raça não encontrada</p>"
return
}

const racaDog = dadosRaca[0]

const respostaImagem = await fetch(
`https://api.thedogapi.com/v1/images/search?breed_ids=${racaDog.id}`,
{
headers: {
"x-api-key": "live_Hl67QVVE8lOWXGkEVuLTIbcLLxvQTX7OfEfaOzS6kYtSXmwaK5dwFopy7AHzH5ga"
}
}
)

const dadosImagem = await respostaImagem.json()

container.innerHTML = ""

const card = document.createElement("div")
card.classList.add("card")

card.innerHTML = `
<img src="${dadosImagem[0].url}">
<h3>${racaDog.name}</h3>
<p>${racaDog.temperament}</p>
<p>${racaDog.life_span}</p>
`

container.appendChild(card)

} catch (erro){

container.innerHTML = "<p>Erro ao buscar dados da API</p>"
console.error(erro)

}

}

buscarcachorros.addEventListener("click", BuscarCachorros)
