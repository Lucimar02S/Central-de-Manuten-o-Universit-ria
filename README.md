    # UniFix - Central de Manutenção Predial

    ## 📌 Descrição do Problema de Negócio
    A infraestrutura predial sofre frequentemente com a lentidão na resolução de problemas físicos (lâmpadas queimadas, vazamentos, equipamentos defeituosos) e a falta de comunicação entre a usuários e a equipe de manutenção. 

    O **UniFix** é um sistema projetado para resolver essa ineficiência. A plataforma atua como uma central de registros de problemas, permitindo que alunos ou funcionários abram chamados e acompanhem o status de resolução em tempo real, enquanto a equipe técnica gerencia as demandas de forma ágil em um painel exclusivo.

    ## 👥 Integrantes da Equipe
    1. [José Ribamar Rodrigues Júnior]
    2. [Lucimar Soares da Silva]
    3. [Lázaro Vieira]
    4. [Francisca Silva]
    5. [Luiz César]
    6. [Cleiton ]

    ## 💻 Stack Tecnológica
    * **Frontend (Interface Web Responsiva):** React.js
    * **Backend (Regras de Negócio e APIs):** Node.js / Express
    * **Plataforma de Hospedagem / Deploy:** Vercel

    ## 🚀 Eixos Tecnológicos da Disciplina

    **[X] REQUISITO OBRIGATÓRIO UNIVERSAL: Acessibilidade e UX Inclusiva**
    O projeto conta com o esqueleto base de acessibilidade implementado rigorosamente:
    - Uso estrito de tags HTML semânticas (`<header>`, `<nav>`, `<main>`, `<footer>`, `<button>`).
    - Implementação de um contêiner configurado com `aria-live="polite"` e `aria-atomic="true"` pronto para receber e anunciar dinamicamente aos leitores de tela as atualizações da aplicação.
    - Contraste adequado e estruturação focada em usabilidade.

    **[X] EIXO 1: Tempo Real e Reatividade**
    *Tecnologias pretendidas:* Server-Sent Events (SSE) / Broadcast Channel.
    A comunicação reativa permite a sincronização da criação de chamados e a atualização de status entre clientes e o painel técnico de forma instantânea, sem a necessidade de recarregar a página (polling).

    ## 🛠️ Instruções de Instalação e Execução Local

    Para rodar a Prova de Conceito (PoC) localmente, certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

    **Passo 1: Clonar o repositório**
    Abra o terminal e execute:
    ```bash
    git clone [https://github.com/Lucimar02S/Central-de-Manuten-o-Universit-ria.git](https://github.com/Lucimar02S/Central-de-Manuten-o-Universit-ria.git)
    cd Central-de-Manuten-o-Universit-ria