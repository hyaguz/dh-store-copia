// Dados dos produtos (você pode expandir isso)
const produtos = {
    produto1: {
        nome: "Vestido Floral",
        descricao: "Vestido floral leve e confortável, perfeito para o verão. Estampa exclusiva.",
        preco: "R$ 89,90",
        imagem: "imagens/produto1.jpg",
        tamanhos: ["P", "M", "G", "GG"]
    },
    produto2: {
        nome: "Conjunto Casual",
        descricao: "Conjunto casual super confortável, ideal para o dia a dia.",
        preco: "R$ 129,90",
        imagem: "imagens/produto2.jpg",
        tamanhos: ["P", "M", "G"]
    },
    produto3: {
        nome: "Blusa Manga Longa",
        descricao: "Blusa manga longa elegante, disponível em várias cores.",
        preco: "R$ 69,90",
        imagem: "imagens/produto3.jpg",
        tamanhos: ["M", "G", "GG"]
    }
};

// Número do WhatsApp (substitua pelo seu)
const NUMERO_WHATSAPP = "5541987984450"; // Exemplo: 55 + DDD + número

// Função para mostrar detalhes do produto
function mostrarDetalhes(produtoId) {
    const produto = produtos[produtoId];
    const modal = document.getElementById('modal');
    
    if (produto) {
        document.getElementById('modal-imagem').src = produto.imagem;
        document.getElementById('modal-titulo').textContent = produto.nome;
        document.getElementById('modal-descricao').textContent = produto.descricao;
        document.getElementById('modal-preco').textContent = produto.preco;
        
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
    }
}

// Função para selecionar tamanho
function selecionarTamanho(event, produto) {
    // Remover seleção anterior
    document.querySelectorAll('.tamanho-btn').forEach(btn => {
        btn.classList.remove('selecionado');
    });
    
    // Adicionar seleção ao botão clicado
    event.target.classList.add('selecionado');
    
    // Atualizar link do WhatsApp com tamanho selecionado
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
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}