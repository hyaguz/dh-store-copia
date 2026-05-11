// Dados dos produtos com múltiplas imagens
const produtos = {
    produto1: {
        nome: "Camisa Brasil 2026 - Amarela",
        descricao: "Camisa Oficial da Seleção Brasileira 2026 - Versão Amarela. Tecido Dry Cell, escudo bordado, tecnologia de absorção de suor.",
        preco: "R$ 89,99",
        precoAntigo: "R$ 120,00",
        imagens: [
            "imagens/camisa-amarela.jpg",
            "imagens/camisa-amarela-2.jpg",
            "imagens/camisa-amarela-3.jpg"
        ],
        tamanhos: ["P", "M", "G", "GG"]
    },
    produto2: {
        nome: "Camisa Brasil 2026 - Azul",
        descricao: "Camisa Oficial da Seleção Brasileira 2026 - Versão Azul. Tecido Dry Cell, escudo bordado, tecnologia de absorção de suor.",
        preco: "R$ 89,99",
        precoAntigo: "R$ 120,00",
        imagens: [
            "imagens/camisa-azul.jpg",
            "imagens/camisa-azul-2.jpg",
            "imagens/camisa-azul-3.jpg"
        ],
        tamanhos: ["M", "G"]
    }
};

// Variáveis do carrossel
let imagemAtual = 0;
let imagensProduto = [];
let intervaloAutomatico;
let touchStartX = 0;
let touchEndX = 0;

// Número do WhatsApp
const NUMERO_WHATSAPP = "5598981865930";

// Função para mostrar detalhes do produto
function mostrarDetalhes(produtoId) {
    const produto = produtos[produtoId];
    const modal = document.getElementById('modal');
    
    if (produto) {
        document.getElementById('modal-titulo').textContent = produto.nome;
        document.getElementById('modal-descricao').textContent = produto.descricao;
        document.getElementById('modal-preco').textContent = produto.preco;
        document.getElementById('modal-preco-antigo').textContent = produto.precoAntigo;
        
        // Configurar carrossel
        imagensProduto = produto.imagens;
        imagemAtual = 0;
        carregarCarrossel();
        iniciarTrocaAutomatica();
        
        // Configurar touch para arraste
        configurarTouch();
        
        // Gerar tamanhos
        const tamanhosGrid = document.querySelector('.tamanhos-grid');
        tamanhosGrid.innerHTML = '';
        
        produto.tamanhos.forEach(tamanho => {
            const btn = document.createElement('button');
            btn.className = 'tamanho-btn';
            btn.textContent = tamanho;
            btn.onclick = (e) => selecionarTamanho(e, produto);
            tamanhosGrid.appendChild(btn);
        });
        
        // Configurar link do WhatsApp
        configurarWhatsAppLink(produto);
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Carregar imagens no carrossel
function carregarCarrossel() {
    const containerImagens = document.getElementById('carrossel-imagens');
    const containerIndicadores = document.getElementById('carrossel-indicadores');
    
    containerImagens.innerHTML = '';
    containerIndicadores.innerHTML = '';
    
    imagensProduto.forEach((imagem, index) => {
        // Criar imagem
        const img = document.createElement('img');
        img.src = imagem;
        img.alt = 'Foto do produto ' + (index + 1);
        containerImagens.appendChild(img);
        
        // Criar indicador
        const indicador = document.createElement('button');
        indicador.className = 'indicador';
        if (index === 0) indicador.classList.add('ativo');
        indicador.onclick = () => irParaImagem(index);
        containerIndicadores.appendChild(indicador);
    });
    
    atualizarPosicaoCarrossel();
}

// Atualizar posição do carrossel
function atualizarPosicaoCarrossel() {
    const containerImagens = document.getElementById('carrossel-imagens');
    containerImagens.style.transform = `translateX(-${imagemAtual * 100}%)`;
    
    // Atualizar indicadores
    document.querySelectorAll('.indicador').forEach((ind, index) => {
        ind.classList.toggle('ativo', index === imagemAtual);
    });
}

// Mudar imagem
function mudarImagem(direcao) {
    pararTrocaAutomatica();
    imagemAtual += direcao;
    
    if (imagemAtual >= imagensProduto.length) {
        imagemAtual = 0;
    }
    if (imagemAtual < 0) {
        imagemAtual = imagensProduto.length - 1;
    }
    
    atualizarPosicaoCarrossel();
    iniciarTrocaAutomatica();
}

// Ir para imagem específica
function irParaImagem(index) {
    pararTrocaAutomatica();
    imagemAtual = index;
    atualizarPosicaoCarrossel();
    iniciarTrocaAutomatica();
}

// Troca automática
function iniciarTrocaAutomatica() {
    pararTrocaAutomatica();
    intervaloAutomatico = setInterval(() => {
        mudarImagem(1);
    }, 4000); // Troca a cada 4 segundos
}

function pararTrocaAutomatica() {
    if (intervaloAutomatico) {
        clearInterval(intervaloAutomatico);
    }
}

// Configurar touch/arraste
function configurarTouch() {
    const carrossel = document.querySelector('.carrossel-container');
    
    carrossel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        pararTrocaAutomatica();
    }, { passive: true });
    
    carrossel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const diferenca = touchStartX - touchEndX;
        
        if (Math.abs(diferenca) > 50) {
            if (diferenca > 0) {
                mudarImagem(1); // Arrastou para esquerda
            } else {
                mudarImagem(-1); // Arrastou para direita
            }
        }
        iniciarTrocaAutomatica();
    });
    
    // Mouse drag para desktop
    let mouseDown = false;
    let mouseStartX = 0;
    
    carrossel.addEventListener('mousedown', (e) => {
        mouseDown = true;
        mouseStartX = e.clientX;
        pararTrocaAutomatica();
    });
    
    carrossel.addEventListener('mouseup', (e) => {
        if (mouseDown) {
            const diferenca = mouseStartX - e.clientX;
            if (Math.abs(diferenca) > 50) {
                if (diferenca > 0) {
                    mudarImagem(1);
                } else {
                    mudarImagem(-1);
                }
            }
            mouseDown = false;
            iniciarTrocaAutomatica();
        }
    });
    
    carrossel.addEventListener('mouseleave', () => {
        if (mouseDown) {
            mouseDown = false;
            iniciarTrocaAutomatica();
        }
    });
}

// Selecionar tamanho
function selecionarTamanho(event, produto) {
    document.querySelectorAll('.tamanho-btn').forEach(btn => {
        btn.classList.remove('selecionado');
    });
    
    event.target.classList.add('selecionado');
    
    const tamanhoSelecionado = event.target.textContent;
    atualizarWhatsAppLink(produto, tamanhoSelecionado);
}

// Configurar link do WhatsApp
function configurarWhatsAppLink(produto) {
    const mensagem = `Olá! Tenho interesse no produto: *${produto.nome}* - ${produto.preco}`;
    const link = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
    document.getElementById('whatsapp-link').href = link;
}

// Atualizar link do WhatsApp com tamanho
function atualizarWhatsAppLink(produto, tamanho) {
    const mensagem = `Olá! Tenho interesse no produto: *${produto.nome}* no tamanho *${tamanho}* - ${produto.preco}`;
    const link = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
    document.getElementById('whatsapp-link').href = link;
}

// Fechar modal
function fecharModal() {
    document.getElementById('modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    pararTrocaAutomatica();
}

// Fechar ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        fecharModal();
    }
}

// Fechar com ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharModal();
    }
});
