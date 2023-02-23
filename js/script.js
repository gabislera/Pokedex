const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon-image')

const form = document.querySelector('.form')
const input = document.querySelector('.input-search')
const buttonNext = document.querySelector('.btn-next')
const buttonPrev = document.querySelector('.btn-prev')

let searchPokemon = 1

const fetchpokemon = async (pokemon) => {
  const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

  if(APIresponse.status === 200) {
    const data =  await APIresponse.json()
    return data
  }
}

const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading...'
  pokemonNumber.innerHTML = ''

  const data = await fetchpokemon(pokemon)

  if(data) {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    input.value = ''
    searchPokemon = data.id
  } else {
    pokemonName.innerHTML = 'Not Found :('
    pokemonNumber.innerHTML = ''
    pokemonImage.style.display = 'none'
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault()
  renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener('click', (event) => {
  if(searchPokemon > 1) {
    searchPokemon -= 1
    renderPokemon(searchPokemon)
  }
})

buttonNext.addEventListener('click', (event) => {
  searchPokemon += 1
  renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)