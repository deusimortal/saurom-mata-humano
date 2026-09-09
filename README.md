# Sauron: Defesa de Mordor

Jogo 2D desenvolvido com p5.js e p5.play. O jogador controla o Olho de Sauron, dispara Nazgûl e protege Mordor contra guerreiros que avançam pela tela.

## Como jogar

- Use as setas do teclado para movimentar Sauron.
- Pressione `T` ou `ESPACO` para disparar.
- No celular, use a area de movimento no canto inferior esquerdo e o botao de ataque no canto inferior direito.
- Cada guerreiro derrotado vale 10 pontos.
- Sauron comeca com 3 vidas.
- Um guerreiro que alcanca Sauron ou atravessa a tela remove uma vida.
- A dificuldade aumenta conforme a pontuacao sobe.
- Alcance 500 pontos para vencer.

## Executar localmente

Como o jogo usa arquivos JavaScript e imagens locais, basta abrir o arquivo `index.html` em um navegador.

Tambem e possivel usar um servidor local. Por exemplo, com Python instalado:

```bash
python -m http.server 8000
```

Depois, abra <http://localhost:8000>.

## Publicar no GitHub Pages

1. Envie este projeto para um repositorio GitHub.
2. Abra **Settings > Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/ (root)`.
5. Salve e aguarde a publicacao.

O endereco sera semelhante a:

```text
https://SEU_USUARIO.github.io/saurom-mata-humano/
```

## Estrutura

```text
.
├── index.html       # Pagina que inicia o jogo
├── sketch.js        # Regras, controles e loop principal
├── style.css        # Estilos da pagina e responsividade
├── assets/          # Imagens e arquivos de audio do projeto
├── p5.js            # Biblioteca p5.js
├── p5.play.js       # Sprites, grupos e colisoes
├── p5.dom.min.js    # Extensao DOM do p5.js
└── p5.sound.min.js  # Extensao de audio do p5.js
```

## Tecnologias

- HTML5
- CSS3
- JavaScript
- p5.js 0.8.0
- p5.play

O arquivo `matter.js` permanece no projeto para referencia, mas nao e necessario para o funcionamento atual do jogo.

## Assets

O jogo utiliza os arquivos presentes em `assets/`, incluindo o fundo de Mordor, o Olho de Sauron, guerreiros, Nazgûl e o Anel. Os caminhos dos arquivos sao relativos ao `index.html`, portanto a pasta `assets` deve permanecer na raiz do projeto.