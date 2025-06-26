let jogoIniciado = false;
let episodiosDesdeUltimaMorte = 0;
// ========== PARTICIPANTES ==========

const participantes = [];

const maxParticipantes = 24;

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Adiciona participante via formulário
document.getElementById("form-add-participante").addEventListener("submit", e => {
  e.preventDefault();
  if (participantes.length >= maxParticipantes) {
    document.getElementById("erro-limite").style.display = "block";
    return;
  }
  const nome = document.getElementById("nome").value.trim();
  const ocupacao = document.getElementById("ocupacao").value.trim();
  const foto = document.getElementById("foto").value.trim();

  participantes.push({
    nome,
    ocupacao,
    foto,
    vivo: true,
    karma: 0,
    maldiçoado: false,
    iconeMaldição: null,
  });

  document.getElementById("form-add-participante").reset();
  document.getElementById("erro-limite").style.display = "none";

  atualizarLista();
});

function atualizarLista(participantesVisiveis = participantes) {
      console.log("Atualizando lista com:", participantesVisiveis.map(p => p.nome));
  const container = document.getElementById("cards-participantes");
  container.innerHTML = "";

  participantesVisiveis.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <div class="foto-container">
        <img src="${p.foto}" alt="${p.nome}" />
        ${p.maldiçoado ? `<img class="pentagrama-overlay" src="icons/pentagrama.png" alt="Maldição">` : ""}
      </div>
      <strong>${p.nome}</strong><br>
      <small>${p.ocupacao}</small><br>
      <div class="karma">Karma: ${p.karma}</div>
      <div>Status: ${p.vivo ? "Vivo" : "Morto"}</div>
    `;

    container.appendChild(div);
  });
}


const frasesConfessionario = [
  "Se eu fosse um mob do Minecraft, seria um Creeper.",
  "Tem gente que tem o coração mais duro que obsidiana.",
  "Estou com saudades da minha ex...",
];


const mortes = [
  "{A} foi teletransportado para o Nether e não voltou.",
  "{A} caiu numa armadilha de urso.",
  "{A} teve uma overdose.",
  "{A} escorregou na quina da pscina e morreu afogado.",
  "{A} foi para a praia e nunca mais voltou.",
  "Em algum lugar do mundo um boneco vodoo de {A} foi esmagado.",
  "{A} foi pego no meio da explosão de um Creeper.",
  "{A} foi transformado em uma abóbora.",
  "{A} ficou preso num loop infinito de comer e virou a Karine.",
  "{A} foi devorado por um bando de porcos enfurecidos.",
  "{A} não aguentou a situação e cometeu suicidio.",
  "{A} tentou fazer uma bomba caseira e se explodiu no processo",
  "{A} tomou banho de sêmen de um patrocinador misterioso.",
  "{A} teve o cobertor roubado durante a noite e morreu de hipotermia.",
  "{A} escondeu a última fatia de pizza e esqueceu onde deixou, assim morrendo de fome."
];


const eventos = [
  
"{A} acusou {B} de esconder um corpo no confessionário.",
  "{A} e {B} trocaram socos por causa de um Yakult.",
  "{A} tentou vender NFTs no jardim, {B} surtou.",
  "{A} envenenou a comida de {B}, mas comeu sem querer.",
  "{A} e {B} fundaram uma seita e brigaram pelo cargo de Messias.",
  "{A} hackeou a geladeira e revelou os segredos de {B}.",
  "{A} soltou um peido tão tóxico que {B} desmaiou.",
  "{A} roubou o edredom de {B} e fingiu que era um manto sagrado.",
  "{A} invocou um demônio de slime e ele virou amigo de {B}.",
  "{A} e {B} entraram em loop gritando 'abuu' por 4 horas.",
  "{A} disse que o 11 de setembro era fake news e {B} surtou.",
  "{A} quebrou o espelho e {B} foi sugado pra outra dimensão.",
  "{A} e {B} brigaram porque um deles dormiu de tênis.",
  "{A} acha que {B} é um NPC e bugou o reality.",
  "{A} construiu uma bomba com cápsulas de café. {B} achou lindo.",
  "{A} disse que Donald Trump era seu pai. {B} acreditou.",
  "{A} fez um culto pra uma torradeira e {B} foi batizado.",
  "{A} e {B} fundaram um sindicato de mortos-vivos.",
  "{A} invadiu o confessionário e anunciou golpe de estado.",
  "{A} esta conduzindo uma investigação sobre {B}.",
  "{A} exigiu que {B} fosse banido por peidar muito fedido.",
  "{A} tirou a bateria da casa e deixou todos no escuro.",
  "{A} tentou dar um mortal no jardim e aterrissou em {B}.",
  "{A} cobriu seu corpo nu de chantily e chamou {B} para ''testar uma coisa''",
  "{A} apertou um botão secreto de funcionalidade secreta...",
  "{A} ofereceu drogas a {B}, mas levou um tapa na cara.",
  "{A} deu um high five tão forte que quebrou o dedo de {B}.",
  "{A} e {B} engajaram em uma queda de braço que durou por 3 horas.",

];


const eventos3pessoas = [
    "{A}, {B} e {C} entraram numa briga generalizada pois precisavam usar o banheiro ao mesmo tempo.",
  "{A}, {B} e {C} criaram um triângulo amoroso com o boneco do dummy.",
  "{A}, {B} e {C} fundaram uma religião baseada em micro-ondas.",
  "{A} deu um susto em {B}, que gritou e acordou {C}, que morreu de susto.",
  "{A}, {B} e {C} começaram a cantar Roupa Nova e abriram um portal dimensional.",
  "{A} acusou {B} e {C} de serem bots gerados por IA.",
  "{A}, {B} e {C} comeram algo da cozinha misteriosa e trocaram de corpos.",
  "{A}, {B} e {C} passaram o dia tentando descobrir quem peidou no confessionário.",
  "{A}, {B} e {C} entraram na piscina de sangue e saíram diferentes.",
  "{A} confessou amar {B}, que ama {C}, que ama a geladeira.",
  "{A}, {B} e {C} iniciaram um motim contra o boneco do líder.",
  "{A} obrigou {B} e {C} a participarem de um casamento simbólico com o espelho da sala."
];


const eventosColetivos = [
    "TODOS os participantes se uniram para invocar o espírito de Jazzghost.",
  "A casa toda entrou em transe após ouvir 'Quem não chupa pepeka é viado' tocando no banheiro.",
  "TODOS fundaram uma banda chamada 'Os Enlouquecidos do Confessionário'.",
  "Uma briga coletiva estourou quando descobriram que só restava um burrito.",
  "TODOS os participantes perderam a sanidade e começaram a se comunicar por grunhidos.",
  "TODOS entraram em modo zumbi após cheirar o absorvente da líder.",
  "A casa inteira caiu em um looping temporal e viveu o mesmo dia 3 vezes.",
  "Um homem misterioso invadiu a casa e ateou fogo em todos os móveis.",
  "A casa toda se embebedou e sentiram a presença de Deus."
];


const eventosCiclicos = [
  "{A}, {B} e {C} encontraram uma sala secreta. Desde então, algo parece errado.",
  "{A} ativou um botão oculto e {B} e {C} começaram a ter visões do futuro.",
  "{A} recebeu uma mensagem de fora e agora {B} e {C} desconfiam de tudo.",
  "{A} foi infectado com um vírus emocional que se espalhou para {B} e {C}.",
  "{A}, {B} e {C} compartilharam um sonho com o Herobrine flutuando e acordaram chorando sangue.",
  "{A}, {B} e {C} acham que vieram do mesmo saco.",
  "{A} encontrou um megafone e agora aterroriza toda a casa.",
  "{A} se apaixonou por uma tangerina",
  "{A} se tornou um monge."
];


const maldicoes = [
   "foi amaldiçoado a só se comunicar por danças.",
  "passa a andar de quatro pela casa sem explicação.",
  "só pode dormir embaixo da mesa da cozinha.",
  "teve sua alma trocada com um guaxinim.",
  "agora acredita que é o próprio EduKof reencarnado.",
  "começa a cantar deftones involuntariamente toda vez que fala.",
  "só consegue ver os outros participantes como gnomos.",
  "recebeu uma voz na cabeça chamada Fábio que dá ordens absurdas.",
  "está preso num glitch mental e acha que é um patrocinador do programa.",
  "é seguido por uma nuvem pessoal que o molha o tempo todo.",
  "toda vez que fala a palavra 'líder', toma um choque espiritual.",
  "acorda todos os dias achando que é segunda-feira de novo.",
  "foi condenado a usar crocs barulhentos pelo resto do programa.",
  "começou a ver o espelho como seu inimigo mortal.",
  "agora é assombrado por uma vinheta do Star Wars toda vez que senta.",
  "só consegue se mover ao som de Ney Matogrosso.",
  "passa a ouvir o **Jazzghost** narrando seus pensamentos.",
];


const eventosPurificacao = [
  "Um raio de luz caiu sobre a casa. Deus abençoou os vivos com uma cerveja gelada.",
  "Todos da casa jogaram ultimate chicken horse.",
  "Todos tomaram banho de slime.",
  "A cama de um dos quartos flutuou e todos foram libertos das trevas.",
  "Nelci transformou o confessionário num templo da paz interior (por 3 minutos)."
];


function alterarKarma(p, valor) {
  p.karma += valor;
}


function sortearVitima(vivos, envolvidos, chanceEnvolvidoMorrer) {
  if (Math.random() < chanceEnvolvidoMorrer && envolvidos.length > 0) {
    return pickRandom(envolvidos);
  }

  let total = 0;
  vivos.forEach(p => total += 100 - p.karma);

  const sorteio = Math.random() * total;
  let acumulado = 0;

  for (let p of vivos) {
    acumulado += 100 - p.karma;
    if (sorteio <= acumulado) return p;
  }

  return pickRandom(vivos);
}


function verificarMaldição(participante) {
  if (!participante.vivo || participante.maldiçoado) return null;

  const karma = participante.karma;
  let chance = 0;

  if (karma <= -50) chance = 1.0;
  else if (karma <= -30) chance = 0.7;
  else if (karma <= -15) chance = 0.3;

  if (Math.random() < chance) {
    const mal = pickRandom(maldicoes);
    participante.maldiçoado = true;
    participante.iconeMaldição = `icons/pentagrama.png`;
    return `${participante.nome} ${mal}`;
  }

  return null;
}



function rodarEpisodio() {
    if (!jogoIniciado) {
  jogoIniciado = true;
  document.getElementById("formulario-participante").style.display = "none";
    }
  const vivos = participantes.filter(p => p.vivo);
  if (vivos.length <= 1) {
    const vencedor = vivos[0];
    document.getElementById("vencedor").innerText = `🏆 ${vencedor.nome} venceu por ser o último vivo!`;
    return;
  }

  const chanceColetivo = Math.random() < 0.10;
  const chanceCiclico = Math.random() < 0.15;
  const chance3Pessoas = Math.random() < 0.4 && vivos.length >= 3;
  const chanceMorteEnvolvido = Math.random() < 0.6;

  let evento = "";
  let participantesNoEvento = [];

  if (chanceColetivo) {
    evento = pickRandom(eventosColetivos);
    participantesNoEvento = [...vivos];
  } else if (chanceCiclico && vivos.length >= 3) {
    const A = pickRandom(vivos);
    const B = pickRandom(vivos.filter(p => p !== A));
    const C = pickRandom(vivos.filter(p => p !== A && p !== B));
    evento = pickRandom(eventosCiclicos)
      .replace("{A}", A.nome)
      .replace("{B}", B.nome)
      .replace("{C}", C.nome);
    participantesNoEvento = [A, B, C];

   
    [A, B, C].forEach(p => alterarKarma(p, -5));
  } else if (chance3Pessoas) {
    const A = pickRandom(vivos);
    const B = pickRandom(vivos.filter(p => p !== A));
    const C = pickRandom(vivos.filter(p => p !== A && p !== B));
    evento = pickRandom(eventos3pessoas)
      .replace("{A}", A.nome)
      .replace("{B}", B.nome)
      .replace("{C}", C.nome);
    participantesNoEvento = [A, B, C];
  } else {
    const A = pickRandom(vivos);
    const B = pickRandom(vivos.filter(p => p !== A));
    evento = pickRandom(eventos).replace("{A}", A.nome).replace("{B}", B.nome);
    participantesNoEvento = [A, B];
  }


  const episodioDiv = document.getElementById("episodio");
  episodioDiv.innerHTML = `<p>${evento}</p>`;

if (episodiosDesdeUltimaMorte >= 7) {
  const vitima = pickRandom(participantesNoEvento);
  vitima.vivo = false;

  const fraseMorte = pickRandom(mortes).replace("{A}", vitima.nome);
  episodioDiv.innerHTML += `<p>💀 ${fraseMorte}</p>`;

  episodiosDesdeUltimaMorte = 0;



 
  alterarKarma(vitima, -20);


  vivos.forEach(p => {
    if (p !== vitima) alterarKarma(p, 5);
  });

 
  if (vitima.maldiçoado) {
    const possiveisCurados = participantes.filter(p => p.vivo && p.maldiçoado && p !== vitima);
    possiveisCurados.forEach(p => {
      if (Math.random() < 0.25) { // 25% chance de cura
        p.maldiçoado = false;
        p.iconeMaldição = null;
      }
    });
  }

  
  let maldiçõesNoEpisodio = [];
  vivos.forEach(p => {
    const mal = verificarMaldição(p);
    if (mal) maldiçõesNoEpisodio.push("🔮 " + mal);
  });

  if (maldiçõesNoEpisodio.length > 0) {
    episodioDiv.innerHTML += `
      <h3>Maldições dos Youtubers Minecraft:</h3>
      <ul>${maldiçõesNoEpisodio.map(m => `<li>${m}</li>`).join("")}</ul>
    `;
  }

  
  const chancePurificacao = Math.random() < 0.05;

  if (chancePurificacao) {
    const purificacao = pickRandom(eventosPurificacao);
    let curados = 0;

    participantes.forEach(p => {
      if (p.maldiçoado && p.vivo) {
        p.maldiçoado = false;
        p.iconeMaldição = null;
        curados++;
      }
    });

    if (curados > 0) {
      episodioDiv.innerHTML += `
        <h3>🕊️ Ritual de Purificação!</h3>
        <p>${purificacao}</p>
        <p>${curados} participantes foram libertos de suas maldições.</p>
      `;
    }
  }

  // cura quem tem karma positivo > 10 (20% chance)
  participantes.forEach(p => {
    if (p.vivo && p.maldiçoado && p.karma > 10 && Math.random() < 0.2) {
      p.maldiçoado = false;
      p.iconeMaldição = null;
    }
  });
  } else {
  episodioDiv.innerHTML += `<p>⚠️ Apesar da tensão, ninguém morreu neste episódio...</p>`;
  episodiosDesdeUltimaMorte++;
}

  atualizarLista(participantesNoEvento);

  // Verifica vencedor
  const vivosDepois = participantes.filter(p => p.vivo);
  if (vivosDepois.length === 1) {
    document.getElementById("vencedor").innerText = `🏆 ${vivosDepois[0].nome} venceu por ser o último vivo!`;
  }
}

// Botão rodar episódio
document.getElementById("botao-rodar").addEventListener("click", () => {
  rodarEpisodio();
});

function salvarPreset() {
  localStorage.setItem("presetsParticipantes", JSON.stringify(participantes));
  alert("Preset salvo com sucesso!");
}


function carregarPreset() {
  const data = localStorage.getItem("presetsParticipantes");
  if (data) {
    const carregados = JSON.parse(data);
    participantes.length = 0; // Limpa o array existente
    carregados.forEach(p => participantes.push(p)); // Adiciona os novos
    atualizarLista();
    alert("Preset carregado!");
  } else {
    alert("Nenhum preset salvo.");
  }
}
function limparParticipantes() {
  if (confirm("Tem certeza que quer remover todos os participantes?")) {
    participantes.length = 0; // Limpa o array sem reatribuir
    atualizarLista();
    document.getElementById("episodio").innerHTML = "";
    document.getElementById("vencedor").innerText = "";
  }
}
