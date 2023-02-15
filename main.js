//Fetch Pokemon ------------------------------------------------------

let master = null;

document.querySelector("#searchbtn").addEventListener("click", getPokemon);

function getPokemon(e) {
  const name = document.querySelector("#searchbar").value;

  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((Response) => Response.json())
    .then((data) => {
      document.querySelector("#displayCard").innerHTML = `
      <img
      id="image"
      src="${data.sprites.other["official-artwork"].front_default}"
      alt="${data.name}"
    />
    <div id="info">
      <h1 id="name">${data.name}</h1>
      <h3 id="pokedex">Pokedex Entry: ${data.id}</h3>
      <h3 id="weight">Weight: ${data.weight}</h3>
      <h3 id="type">Type: ${data.types[0].type.name}</h3>
    </div>`;
      master = data;
    })
    .catch((err) => {
      console.log("pokemon not found", err);
    });
  e.preventDefault();
}

//Add Pokemon --------------------------------------------------------

document.querySelector("#select").addEventListener("click", selectPokemon);

let fighterOne = document.getElementById("fighter1");
let fighterTwo = document.getElementById("fighter2");
let fighter1Stat;
let fighter2Stat;
let count = 0;

function selectPokemon() {
  document.getElementById("searchbar").value = "";

  if (count === 0) {
    fighter1Stat = master;
    console.log("1" + fighter1Stat);
    renderField(fighterOne);
    count += 1;
  } else if (count === 1) {
    fighter2Stat = master;
    console.log("2" + fighter2Stat);
    renderField(fighterTwo);
    document.getElementById("fightbtn").classList.remove("hidden");
    document.getElementById("select").classList.add("hidden");
    document.getElementById("displayCard").classList.add("hidden");
  }
}

function renderField(fighter) {
  const pkm = document.createElement("img");
  pkm.src = master.sprites.other["official-artwork"].front_default;
  pkm.alt = master.name;
  pkm.classList.add("pkball");
  const title = document.createElement("h1");
  title.innerHTML = master.name;
  fighter.appendChild(pkm);
  fighter.appendChild(title);
}

//---------------------------------------------------------
// fight

function fight() {
  fighter1PhatStat =
    fighter1Stat.stats[0].base_stat +
    fighter1Stat.stats[1].base_stat +
    fighter1Stat.stats[2].base_stat +
    fighter1Stat.stats[3].base_stat +
    fighter1Stat.stats[4].base_stat +
    fighter1Stat.stats[5].base_stat;
  fighter2PhatStat =
    fighter2Stat.stats[0].base_stat +
    fighter2Stat.stats[1].base_stat +
    fighter2Stat.stats[2].base_stat +
    fighter2Stat.stats[3].base_stat +
    fighter2Stat.stats[4].base_stat +
    fighter2Stat.stats[5].base_stat;
  score(fighterOne, fighter1PhatStat);
  score(fighterTwo, fighter2PhatStat);

  if (fighter1PhatStat > fighter2PhatStat) {
    winner(fighterOne, fighterTwo);
  } else if (fighter1PhatStat < fighter2PhatStat) {
    winner(fighterTwo, fighterOne);
  } else {
    document.getElementById("final").innerHTML = "TIE";
  }
}

function score(fighter, fighterScore) {
  const combat = document.createElement("h3");
  combat.innerHTML = `Combat Score: ${fighterScore}`;
  fighter.appendChild(combat);
}

function winner(a, b) {
  const win = document.createElement("h1");
  win.innerHTML = "Winner";
  const lose = document.createElement("h1");
  lose.innerHTML = "Loser";
  a.appendChild(win);
  b.appendChild(lose);
  a.classList.add("winner");
}
