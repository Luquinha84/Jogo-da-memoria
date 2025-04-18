const emojis = ['🍕', '🎮', '🐶', '🚀', '🌈', '📚', '🎧', '⚽'];
let primeiraCarta = null;
let bloqueado = false;
let paresEncontrados = 0;

function embaralhar(array) {
  // Fisher-Yates shuffle
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function criarCarta(emoji) {
  const carta = document.createElement('div');
  carta.classList.add('carta');
  carta.dataset.emoji = emoji;

  carta.innerHTML = `
    <div class="verso">❓</div>
    <div class="frente">${emoji}</div>
  `;

  carta.addEventListener('click', () => manipularClique(carta));
  return carta;
}

function criarTabuleiro() {
  const tabuleiro = document.getElementById('tabuleiro');
  tabuleiro.innerHTML = '';
  const cartasEmbaralhadas = embaralhar([...emojis, ...emojis]);

  cartasEmbaralhadas.forEach(emoji => {
    const carta = criarCarta(emoji);
    tabuleiro.appendChild(carta);
  });

  // Resetar variáveis
  primeiraCarta = null;
  bloqueado = false;
  paresEncontrados = 0;
}

function manipularClique(carta) {
  if (bloqueado || carta.classList.contains('virada')) return;

  carta.classList.add('virada');

  if (!primeiraCarta) {
    primeiraCarta = carta;
  } else {
    verificarPar(primeiraCarta, carta);
    primeiraCarta = null;
  }
}

function verificarPar(c1, c2) {
  const e1 = c1.dataset.emoji;
  const e2 = c2.dataset.emoji;

  if (e1 === e2) {
    // Par correto
    c1.removeEventListener('click', manipularClique);
    c2.removeEventListener('click', manipularClique);
    paresEncontrados += 1;
    verificarFimDeJogo();
  } else {
    // Par incorreto
    bloqueado = true;
    setTimeout(() => {
      c1.classList.remove('virada');
      c2.classList.remove('virada');
      bloqueado = false;
    }, 1000);
  }
}

function verificarFimDeJogo() {
  const totalPares = emojis.length;
  if (paresEncontrados === totalPares) {
    setTimeout(() => {
      alert('🎉 Parabéns! Você encontrou todos os pares!');
    }, 300);
  }
}

document.getElementById('reset').addEventListener('click', criarTabuleiro);
window.addEventListener('DOMContentLoaded', criarTabuleiro);
let tempoRestante = 150; // 2 minutos e 30 segundos
let intervaloTempo;

function atualizarCronometro() {
  const minutos = Math.floor(tempoRestante / 60);
  const segundos = tempoRestante % 60;
  document.getElementById('cronometro').textContent = `Tempo restante: ${minutos}:${segundos.toString().padStart(2, '0')}`;
}

function iniciarCronometro() {
  clearInterval(intervaloTempo); // Evita múltiplos timers
  tempoRestante = 150; // Reset para 2:30
  atualizarCronometro();

  intervaloTempo = setInterval(() => {
    tempoRestante--;
    atualizarCronometro();

    if (tempoRestante <= 0) {
      clearInterval(intervaloTempo);
      alert('⏰ Tempo esgotado! O jogo será reiniciado.');
      criarTabuleiro();
    }
  }, 1000);
}

// Atualize sua função criarTabuleiro() para iniciar o cronômetro:
function criarTabuleiro() {
  const tabuleiro = document.getElementById('tabuleiro');
  tabuleiro.innerHTML = '';

  const cartasEmbaralhadas = embaralhar([...emojis, ...emojis]);

  cartasEmbaralhadas.forEach(emoji => {
    const carta = criarCarta(emoji);
    tabuleiro.appendChild(carta);
  });

  // Resetar variáveis
  primeiraCarta = null;
  bloqueado = false;
  paresEncontrados = 0;

  iniciarCronometro(); // Inicia o cronômetro ao criar o tabuleiro
}

// Botão de reinício manual também reinicia o timer:
document.getElementById('reset').addEventListener('click', criarTabuleiro);
function verificarPar(c1, c2) {
  const e1 = c1.dataset.emoji;
  const e2 = c2.dataset.emoji;

  if (e1 === e2) {
    // Par correto
    c1.removeEventListener('click', manipularClique);
    c2.removeEventListener('click', manipularClique);

    // Verifica se o jogo acabou
    setTimeout(() => {
      const todasViradas = document.querySelectorAll('.carta:not(.virada)').length === 0;
      if (todasViradas) {
        mostrarMensagemVitoria();
      }
    }, 300);
  } else {
    // Par errado
    bloqueado = true;
    setTimeout(() => {
      c1.classList.remove('virada');
      c2.classList.remove('virada');
      bloqueado = false;
    }, 1000);
  }
}
function mostrarMensagemVitoria() {
  const mensagem = document.getElementById('mensagem-vitoria');
  mensagem.classList.remove('oculto');
  
  // Oculta após 4s (ou mantenha se quiser que fique até reiniciar)
  setTimeout(() => {
    mensagem.classList.add('oculto');
  }, 4000);
}
