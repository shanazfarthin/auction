const allPlayers = [
  // Round 1 - Active Gold Player - 12 Players
  "M.S.M.Mufthhi", "M.I.M.Arshad", "M.Sajeed", "M.I.M.Mahdi", "M.Munaj", "M.I.M.Azeez",
  "M.Ifraz", "M.Fayaz", "M.Arshad", "M.Haseeb Mohammed", "M.S.M. Sharideen", "M.Ikam",

  // Round 2 - Zahira Goal - 20 Players
  "Abdur Rahman", "M.Mafaz", "Uzman Ali", "M.Shabith", "M.Zafran", "M.Muzni", "Abdul Basith( School Boy)", "Minshan Ahammed ( School Boy )",
  "M.R.M.Ilham ( School Boy )", "M.Hakam ( School Boy )", "M.Rifai", "M.S.Thabeeb", "M.Rimshad", "M.Zakeer", "M.Kalam",
  "M.Ilham", "Yogaraj", "M.Amanullah", "M.Mafaz", "Z.M.Hareez", "A.H.Amanullah",

  // Round 3 - Active Silver Player Keepers - 29 Players
  "M.Asir Ahammed", "M. Akeel", "M.Rizlan", "M.R.M.Raiz", "M.N.M.Zafer", "M.Abdur Rahman", "Divager", "Arham Dilip", "Ahammed Dilip", "Abdullah Dilip",
  "Muhammed Mubassir", "Mohammed Ilham", "Mohammed Safry", "R.F.Abdul Hakeem", "Ahammed akram", "Mohammed Mahsook", "Mohammed Zamrooth",
  "Muhammed Dilip", "Mohammed Hakeem", "Fahad Haffes", "M.S.M.Amry", "Mohammed Zimar", "Shakir Ahammed", "M.N.M.Asraf", "M.Hydroos Hassan",
  "M.Ansar Abdullah", "Mohammed Nakaz", "Mohammed Shahid", "Mohammed Rifki", "M.Musaraff",

  // Round 4 - Ex Zahira Stickers - 28 Players
  "M.Muzaique", "M.M.Musadiq", "M.Razeen", "M.Aslam deen", "Ali Shamil", "M.F.M.Aslam", "M.J.M.Lafir", "M.Rusdy", "M.F.M.Fazny", "M.Moufil",
  "M.K.M.Anaz", "M.R.M.Malik", "M.Ifam", "M.K.M.Shanaz", "M.Irshad", "M.M.M.Mueen", "M.S.Ahammd", "M.J.M.Rizwan", "M.Farhan Mawjood",
  "M.Irshad", "M.Isthiqar", "M.Nusky", "M.K.M.Asraf", "M.S.M.Azad", "MMM Mihaj", "M.I.M.Shamil", 

  // Round 5 - Zahira Legends - Over 50 - 17 Players
  "M.Farath Mohammed", "M.H.M. Hiyazdeen", "Mahudoon Irfan", "S.H.M.Subany", "M.A.M.Irfan", "M.Imbrooz", "Mohammed Nawshad", "Faizal Mohammed",
  "J.M.Abdul Nazar", "M.A.M..Ameer", "M.I.M.Fariz", "M.Ifthicar", "M.Ziyad", "A.S.M.Muhujizeen", "A.M.Naleem", "Mohammed Ali", "M Noordeen"
];

const roundTitles = [
  "Active Gold Player",
  "Zahira Goal Keepers",
  "Active Silver Player Keepers",
  "Ex Zahira Stickers",
  "Zahira Legends - Over 50"
];

const roundSizes = [12, 20, 29, 35, 16];
const rounds = [];
let startIndex = 0;

for (let i = 0; i < roundSizes.length; i++) {
  rounds.push({
    title: roundTitles[i],
    players: allPlayers.slice(startIndex, startIndex + roundSizes[i])
  });
  startIndex += roundSizes[i];
}

let currentRound = 0;
let currentPlayerIndex = 0;
let selectedPlayers = [];

const playerNameEl = document.getElementById("player-name");
const teamsEl = document.getElementById("teams");
const nextPlayerBtn = document.getElementById("next-player-btn");
const statusEl = document.getElementById("player-status");

function renderPlayer() {
  const round = rounds[currentRound];
  const player = round.players[currentPlayerIndex];
  playerNameEl.textContent = `🏑 ${round.title} - Player ${currentPlayerIndex + 1}: ${player}`;
  statusEl.innerHTML = `<p class="waiting">🟠 Waiting for bids...</p>`;
  updateRemainingCount();

  teamsEl.innerHTML = '';
  teams.forEach((team, index) => {
    const teamCard = document.createElement('div');
    teamCard.className = 'team-card';
    teamCard.innerHTML = `
      <img src="images/L${index + 1}.jpeg" alt="${team} Logo" style="width: 50px; height: 50px; object-fit: contain; display: block; margin-bottom: 4px;" />
      <strong>${team}</strong><br/>
      <input type="number" min="0" id="bid-${team.replace(/\s+/g, '')}" /><br/>
    `;
    teamsEl.appendChild(teamCard);
  });
}


function clearBids() {
  teams.forEach(team => {
    const bidInput = document.getElementById(`bid-${team.replace(/\s+/g, '')}`);
    if (bidInput) bidInput.value = '';
  });
}

function handleNextPlayer() {
  const round = rounds[currentRound];
  const player = round.players[currentPlayerIndex];
  const bids = {};
  let highestBid = 0;
  let highestBidder = null;

  teams.forEach(team => {
    const bidInput = document.getElementById(`bid-${team.replace(/\s+/g, '')}`);
    const bidValue = Number(bidInput.value);

    if (bidValue > highestBid) {
      highestBid = bidValue;
      highestBidder = team;
    }
    bids[team] = bidValue;
  });

  if (highestBid > 0) {
    statusEl.innerHTML = `<p class="sold">🟢 Sold to ${highestBidder} for ₹${highestBid}</p>`;
    selectedPlayers.push({ player, team: highestBidder, bid: highestBid });
  } else {
    statusEl.innerHTML = `<p class="unsold">🔴 Unsold</p>`;
    selectedPlayers.push({ player, team: "Unsold", bid: 0 });
  }

  updateSelectedList();
  currentPlayerIndex++;
  updateWaitingList();
  clearBids();

  if (currentPlayerIndex >= round.players.length) {
    currentRound++;
    currentPlayerIndex = 0;
  }

  if (currentRound < rounds.length) {
    nextPlayerBtn.textContent = "Next Player";
    setTimeout(renderPlayer, 2000);
  } else {
    nextPlayerBtn.disabled = true;
    nextPlayerBtn.textContent = "🏁 Auction Complete";
    updateRemainingCount();
  }
}

function updateSelectedList() {
  const listEl = document.getElementById("selected-list");
  const grouped = {};
  selectedPlayers.forEach(p => {
    if (!grouped[p.team]) grouped[p.team] = [];
    grouped[p.team].push(p);
  });

  listEl.innerHTML = `<h3>✅ Selected Players</h3>`;
  for (const team in grouped) {
    if (team !== "Unsold") {
      listEl.innerHTML += `<h4>${team}</h4><div class="selected-buttons">${grouped[team].map(p => `<button>✔️ ${p.player} - ₹${p.bid}</button>`).join('')}</div>`;
    }
  }
}

function updateRemainingCount() {
  let totalRemaining = 0;
  for (let i = currentRound; i < rounds.length; i++) {
    if (i === currentRound) {
      totalRemaining += rounds[i].players.length - currentPlayerIndex;
    } else {
      totalRemaining += rounds[i].players.length;
    }
  }
  document.getElementById("remaining-count").textContent = `🔁 Remaining Players: ${totalRemaining}`;
}

function updateWaitingList() {
  const listEl = document.getElementById("waiting-list");
  const round = rounds[currentRound];
  const remainingPlayers = round.players.slice(currentPlayerIndex);

  listEl.innerHTML = `
    <h3>🟠 Waiting List - ${round.title}</h3>
    <div class="waiting-buttons">
      ${remainingPlayers.map(p => `<button>${p}</button>`).join('')}
    </div>
  `;
}

const teams = ["ZAHIRA SHARKS", "ZAHIRA HEROES", "ZAHIRA LEGENDS", "ZAHIRAK NIGHTS",  "ZAHIRA TUSKERS", "ZAHIRA TITANS", "ZAHIRA TIGERS", "ZAHIRA BULLETS", "ZAHIRA KINGS", "ZAHIRA LIONS", "ZAHIRA STRIKERS","ZAHIRA EMPERORS"];

nextPlayerBtn.addEventListener("click", handleNextPlayer);
renderPlayer();
updateWaitingList();
