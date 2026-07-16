document.addEventListener("DOMContentLoaded", () => {

    fetch('components/menu.html')
        .then(resposta => resposta.text())
        .then(codigoHtml => {
            document.getElementById('header-container').innerHTML = codigoHtml;
        })
        .catch(erro => console.error("Erro ao carregar o menu:", erro));

    fetch('components/footer.html')
        .then(resposta => resposta.text())
        .then(codigoHtml => {
            document.getElementById('rodapé').innerHTML = codigoHtml;
        })
        .catch(erro => console.error("Erro ao carregar o footer:", erro));

});

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

/* =========================================
   LÓGICA DE ZOOM E PAN (TELA CHEIA)
   ========================================= */

document.querySelectorAll('.carousel-slide').forEach(slide => {
    
    // 1. O que acontece ao CLICAR na imagem
    slide.addEventListener('click', function(e) {
        if (document.fullscreenElement) {
            this.classList.toggle('zoomed'); // Liga/desliga o zoom
            
            if (this.classList.contains('zoomed')) {
                moverLupa(e, this);
            } else {
                this.style.transformOrigin = 'center center';
            }
        }
    });

    // 2. O que acontece ao MOVER O MOUSE com o zoom ligado
    slide.addEventListener('mousemove', function(e) {
        if (document.fullscreenElement && this.classList.contains('zoomed')) {
            moverLupa(e, this);
        }
    });
});

// Função matemática simples que calcula a posição do mouse e move a imagem
function moverLupa(e, elemento) {
    // Pega a posição (X, Y) exata do ponteiro do mouse dentro da imagem original
    const x = (e.offsetX / elemento.offsetWidth) * 100;
    const y = (e.offsetY / elemento.offsetHeight) * 100;
    
    // Altera o ponto de foco (ancoragem) do zoom para acompanhar o mouse
    elemento.style.transformOrigin = `${x}% ${y}%`;
}

// 3. Trava de Segurança: Desliga o zoom se o usuário fechar a tela cheia
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        document.querySelectorAll('.carousel-slide.zoomed').forEach(img => {
            img.classList.remove('zoomed');
            img.style.transformOrigin = 'center center';
        });
    }
});