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

// Função para abrir ou fechar o modo Tela Cheia
function alternarTelaCheia(containerId) {
    const container = document.getElementById(containerId);
    
    // Verifica se já existe algum elemento em tela cheia no navegador
    if (!document.fullscreenElement) {
        // Se NÃO estiver em tela cheia, pede para entrar
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) { /* Suporte para Safari */
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) { /* Suporte para IE/Edge antigo */
            container.msRequestFullscreen();
        }
    } else {
        // Se JÁ estiver em tela cheia, pede para sair
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}