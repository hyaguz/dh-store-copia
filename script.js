// Dados dos produtos
const produtos = {
    produto1: {
        nome: "Camisa Brasil 2026 - Amarela",
        descricao: "Camisa Oficial da Seleção Brasileira 2026 - Versão Amarela. Tecido Dry Cell, escudo bordado, tecnologia de absorção de suor.",
        preco: "R$ 89,99",
        precoAntigo: "R$ 120,00",
        imagem: "imagens/camisa-amarela.jpg",
        tamanhos: ["P", "M", "G", "GG"]
    },
    produto2: {
        nome: "Camisa Brasil 2026 - Azul",
        descricao: "Camisa Oficial da Seleção Brasileira 2026 - Versão Azul. Tecido Dry Cell, escudo bordado, tecnologia de absorção de suor.",
        preco: "R$ 89,99",
        precoAntigo: "R$ 120,00",
        imagem: "imagens/camisa-azul.jpg",
        tamanhos: ["P", "M", "G", "GG"]
    }
};

// Número do WhatsApp CORRETO
const NUMERO_WHATSAPP = "5541987984450";

// Função para mostrar detalhes do produto
function mostrarDetalhes(produtoId) {
    const produto = produtos[produtoId];
    const modal = document.getElementById('modal');
    
    if (produto) {
        document.getElementById('modal-imagem').src = produto.imagem;
        document.getElementById('modal-titulo').textContent = produto.nome;
        document.getElementById('modal-descricao').textContent = produto.descricao;
        document.getElementById('modal-preco').textContent = produto.preco;
        document.getElementById('modal-preco-antigo').textContent = produto.precoAntigo;
        
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

// Função para selecionar tamanho
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
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharModal();
    }
});
