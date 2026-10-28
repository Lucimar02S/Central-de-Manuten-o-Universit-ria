# UniFix - Central de Manutenção Predial

## 📌 Descrição do Problema de Negócio
A infraestrutura predial sofre frequentemente com a lentidão na resolução de problemas físicos (lâmpadas queimadas, vazamentos, equipamentos defeituosos) e a falta de comunicação entre os usuários e a equipe de manutenção. 

O **UniFix** é uma solução desenvolvida para centralizar o registro de ocorrências. A plataforma permite que alunos, professores e funcionários abram chamados e acompanhem o status de resolução em tempo real, enquanto a equipe técnica gerencia as demandas de forma ágil através de um painel exclusivo.

## 👥 Integrantes da Equipe
1. José Ribamar Rodrigues Júnior
2. Lucimar Soares da Silva
3. Lázaro Vieira
4. Francisca Silva
5. Luiz César
6. Cleiton

## 💻 Stack Tecnológica
* **Ambiente de Execução Local:** Node.js + Express
* **Frontend:** HTML5 Semântico, CSS3 (Variáveis CSS, Flexbox e Grid) e JavaScript Vanilla (ES6+).
* **Persistência de Dados Local:** `localStorage`
* **Comunicação em Tempo Real:** API Nativa `BroadcastChannel`

## 🚀 Eixo Tecnológico Selecionado

### **[X] EIXO 1: Tempo Real e Reatividade**
- **Mecanismo:** Utilização da API nativa `BroadcastChannel` (`unifix_realtime`).
- **Demonstração:** Ao abrir o sistema em duas abas/janelas distintas em `http://localhost:3000` (uma no painel do usuário e outra no painel técnico), qualquer criação de chamado ou alteração de status em uma aba é refletida instantaneamente na outra sem a necessidade de recarregar a página (polling).

---

### **[X] REQUISITO OBRIGATÓRIO UNIVERSAL: Esqueleto Base de Acessibilidade**
- **HTML Semântico:** Estruturação estrita com `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` e elementos interativos corretos (`<button>`).
- **Região Viva (Screen Readers):** Contêiner reservado com `aria-live="polite"` e `aria-atomic="true"` que anuncia dinamicamente aos leitores de tela cada atualização do sistema (ex: "Chamado #1001 criado com sucesso").
- **Recursos Inclusivos de UX:**
  - Botão de atalho para navegação via teclado (`.skip-link`).
  - Alternador de **Alto Contraste** em tempo real.
  - Alternador de **Aumento de Texto** (acessibilidade visual).
  - Indicadores de foco visíveis adaptados (`:focus-visible`).

---

## 🛠️ Instruções de Instalação e Execução Local

Pré-requisito: Ter o [Node.js](https://nodejs.org/) instalado na máquina.

1. **Clonar o repositório público:**
   ```bash
   git clone [https://github.com/Lucimar02S/Central-de-Manuten-o-Universit-ria.git](https://github.com/Lucimar02S/Central-de-Manuten-o-Universit-ria.git)
   cd Central-de-Manuten-o-Universit-ria