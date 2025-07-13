// Variável global que irá armazenar todos os filmes depois de carregados.
let todosOsFilmes = [];

// Função para renderizar os cards na tela
function renderizarCards(dados) {
    const container = document.querySelector('.conteudo-principal');
    if (dados.length === 0) {
        container.innerHTML = "<p>Nenhum filme encontrado para a sua busca.</p>";
        return;
    }
    
    container.innerHTML = dados.map(filme => `
        <div class="card">
            <h2>${filme.nome}</h2>
            <img src="${filme.imagem}" alt="Poster de ${filme.nome}" class="card-image">
            <p>${filme.descricao}</p>
            
            <div class="fontes-links">
                <h4>Onde Assistir:</h4>
                <ul>
                    ${filme.fontes.map(fonte => `
                        <li><a href="${fonte.url}" target="_blank">${fonte.nome}</a> (${fonte.tipo})</li>
                    `).join('')}
                </ul>
            </div>

            <small>Categoria: ${filme.categoria}</small>
        </div>
    `).join('');
}

// Função de pesquisa
function pesquisar(termo) {
    const filtrados = todosOsFilmes.filter(filme =>
        filme.nome.toLowerCase().includes(termo.toLowerCase()) ||
        filme.descricao.toLowerCase().includes(termo.toLowerCase())
    );
    renderizarCards(filtrados);
}

// Função de filtro por categoria
function filtrarPorCategoria(categoria) {
    if (categoria === 'todos') { // Adicione uma opção "todos" ao seu HTML se desejar
        renderizarCards(todosOsFilmes);
        return;
    }
    const filtrados = todosOsFilmes.filter(filme => filme.categoria === categoria);
    renderizarCards(filtrados);
}

// Função para limpar a busca e os filtros
function limparFiltros() {
    document.getElementById('pesquisa').value = '';
    document.getElementById('filtro').selectedIndex = 0; // Isso depende das suas opções no HTML
    renderizarCards(todosOsFilmes);
}

// Evento que dispara quando o conteúdo da página é carregado
document.addEventListener('DOMContentLoaded', () => {
    // Busca os dados do ficheiro JSON
    fetch('./filmes.json')
        .then(response => {
            // Verifica se a requisição foi bem sucedida
            if (!response.ok) {
                throw new Error('Erro na rede: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            todosOsFilmes = data; // Armazena os dados na variável global
            renderizarCards(todosOsFilmes); // Renderiza os cards pela primeira vez
        })
        .catch(error => {
            console.error('Houve um problema ao carregar o banco de dados de filmes:', error);
            const container = document.querySelector('.conteudo-principal');
            container.innerHTML = "<p>Erro ao carregar os filmes. Tente novamente mais tarde.</p>";
        });
});