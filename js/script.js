document.addEventListener("DOMContentLoaded", () => {
    
    // Puxa o arquivo do menu e injeta na página
    fetch('components/menu.html')
        .then(resposta => resposta.text())
        .then(codigoHtml => {
            // Procura a div vazia e joga o menu lá dentro
            document.getElementById('header-container').innerHTML = codigoHtml;
        })
        .catch(erro => console.error("Erro ao carregar o menu:", erro));

});

// Função para fazer o carrossel andar para a esquerda ou direita
function moverCarrossel(trackId, direcao) {
    const track = document.getElementById(trackId);
    const larguraDoSlide = track.clientWidth; // Pega o tamanho exato de uma imagem
    
    // Se a direção for 1 (Avançar), soma a largura. Se for -1 (Voltar), subtrai.
    track.scrollBy({
        left: larguraDoSlide * direcao,
        behavior: 'smooth'
    });
}