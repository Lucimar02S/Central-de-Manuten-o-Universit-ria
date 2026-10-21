const STORAGE_KEY = "unifix_tickets";
let tickets = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

// API BroadcastChannel para comunicação em tempo real (Eixo 1)
const realtimeChannel = new BroadcastChannel("unifix_realtime");

realtimeChannel.onmessage = function(event) {
  if (event.data.type === "tickets-updated") {
    tickets = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    renderAll();
    announce("O sistema recebeu uma atualização em tempo real.");
  }
};

function saveTickets() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  realtimeChannel.postMessage({ type: "tickets-updated" });
  renderAll();
}

function announce(message) {
  const region = document.getElementById("liveRegion");
  region.textContent = "";
  setTimeout(() => { region.textContent = message; }, 50);
}

function generateId() {
  return tickets.length === 0 ? 1001 : Math.max(...tickets.map(t => t.id)) + 1;
}

function formatDate(date) {
  return new Date(date).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(sectionId).classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (sectionId === "chamados") renderTickets();
  if (sectionId === "painel") renderTechnicalPanel();
}

function focusMain() {
  const content = document.getElementById("conteudo");
  content.setAttribute("tabindex", "-1");
  content.focus();
}

document.getElementById("ticketForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const now = new Date().toISOString();
  
  const ticket = {
    id: generateId(),
    title: formData.get("title"),
    category: formData.get("category"),
    location: formData.get("location"),
    priority: formData.get("priority"),
    description: formData.get("description"),
    status: "Aberto",
    requester: "Usuário Demo",
    createdAt: now,
    updatedAt: now,
    history: [{ status: "Aberto", date: now, message: "Chamado criado pelo usuário." }]
  };

  tickets.unshift(ticket);
  saveTickets();
  event.target.reset();
  announce(`Chamado número ${ticket.id} criado com sucesso.`);
  alert(`Chamado #${ticket.id} criado com sucesso!`);
  showSection("chamados");
});

function renderTickets() {
  const container = document.getElementById("ticketList");
  const search = document.getElementById("searchInput").value.toLowerCase();
  const status = document.getElementById("statusFilter").value;
  const priority = document.getElementById("priorityFilter").value;

  const filtered = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(search) || ticket.description.toLowerCase().includes(search) || ticket.location.toLowerCase().includes(search);
    const matchesStatus = !status || ticket.status === status;
    const matchesPriority = !priority || ticket.priority === priority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div class="empty"><h3>Nenhum chamado encontrado</h3></div>`;
    return;
  }
  container.innerHTML = filtered.map(createTicketHTML).join("");
}

function createTicketHTML(ticket) {
  return `
    <article class="ticket">
      <div class="ticket-header">
        <div>
          <h3 class="ticket-title">#${ticket.id} — ${escapeHTML(ticket.title)}</h3>
          <div class="ticket-meta">📍 ${escapeHTML(ticket.location)} <br> 📁 ${escapeHTML(ticket.category)} <br> 🕒 ${formatDate(ticket.createdAt)}</div>
        </div>
      </div>
      <div class="badges">
        <span class="badge ${getStatusClass(ticket.status)}">${escapeHTML(ticket.status)}</span>
        <span class="badge ${getPriorityClass(ticket.priority)}">Prioridade: ${escapeHTML(ticket.priority)}</span>
      </div>
      <p>${escapeHTML(ticket.description)}</p>
      <div class="ticket-actions">
        <button type="button" onclick="openTicket(${ticket.id})">Ver detalhes</button>
      </div>
    </article>
  `;
}

function renderTechnicalPanel() {
  const container = document.getElementById("technicalList");
  if (tickets.length === 0) {
    container.innerHTML = `<div class="empty"><h3>Nenhum chamado registrado.</h3></div>`;
    return;
  }
  container.innerHTML = tickets.map(ticket => `
    <article class="ticket">
      <div class="ticket-header">
        <div>
          <h3 class="ticket-title">#${ticket.id} — ${escapeHTML(ticket.title)}</h3>
          <div class="ticket-meta">📍 ${escapeHTML(ticket.location)} <br> 📁 ${escapeHTML(ticket.category)}</div>
        </div>
      </div>
      <div class="badges">
        <span class="badge ${getStatusClass(ticket.status)}">${escapeHTML(ticket.status)}</span>
        <span class="badge ${getPriorityClass(ticket.priority)}">${escapeHTML(ticket.priority)}</span>
      </div>
      <label for="status-${ticket.id}">Alterar status</label>
      <select id="status-${ticket.id}" onchange="changeStatus(${ticket.id}, this.value)">
        <option ${ticket.status === "Aberto" ? "selected" : ""}>Aberto</option>
        <option ${ticket.status === "Em análise" ? "selected" : ""}>Em análise</option>
        <option ${ticket.status === "Em atendimento" ? "selected" : ""}>Em atendimento</option>
        <option ${ticket.status === "Resolvido" ? "selected" : ""}>Resolvido</option>
      </select>
      <div class="ticket-actions">
        <button type="button" onclick="openTicket(${ticket.id})">Ver detalhes e histórico</button>
      </div>
    </article>
  `).join("");
}

function changeStatus(ticketId, newStatus) {
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket || ticket.status === newStatus) return;
  
  const now = new Date().toISOString();
  ticket.history.push({ status: newStatus, date: now, message: `Status alterado de "${ticket.status}" para "${newStatus}".` });
  ticket.status = newStatus;
  ticket.updatedAt = now;
  
  saveTickets();
  announce(`O chamado ${ticket.id} foi atualizado para ${newStatus}.`);
}

function openTicket(ticketId) {
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return;

  document.getElementById("modalBody").innerHTML = `
    <p><strong>Chamado:</strong> #${ticket.id}</p>
    <p><strong>Problema:</strong> ${escapeHTML(ticket.title)}</p>
    <p><strong>Local:</strong> ${escapeHTML(ticket.location)}</p>
    <p><strong>Status:</strong> ${escapeHTML(ticket.status)}</p>
    <p><strong>Descrição:</strong><br>${escapeHTML(ticket.description)}</p>
    <h3>Histórico do atendimento</h3>
    <div class="timeline">
      ${ticket.history.map(item => `
        <div class="timeline-item">
          <strong>${escapeHTML(item.status)}</strong>
          <div class="timeline-date">${formatDate(item.date)}</div>
          <div>${escapeHTML(item.message)}</div>
        </div>
      `).join("")}
    </div>
  `;
  document.getElementById("ticketModal").classList.add("open");
}

function closeModal() {
  document.getElementById("ticketModal").classList.remove("open");
}

function toggleContrast() {
  document.body.classList.toggle("high-contrast");
  announce(document.body.classList.contains("high-contrast") ? "Alto contraste ativado." : "Alto contraste desativado.");
}

function toggleLargeText() {
  document.body.classList.toggle("large-text");
  announce(document.body.classList.contains("large-text") ? "Texto ampliado." : "Tamanho de texto normal.");
}

function getStatusClass(status) {
  const classes = { "Aberto": "badge-open", "Em análise": "badge-analysis", "Em atendimento": "badge-progress", "Resolvido": "badge-resolved" };
  return classes[status] || "badge-open";
}

function getPriorityClass(priority) {
  const classes = { "Alta": "badge-high", "Média": "badge-medium", "Baixa": "badge-low" };
  return classes[priority] || "badge-medium";
}

function updateDashboard() {
  document.getElementById("statTotal").textContent = tickets.length;
  document.getElementById("statOpen").textContent = tickets.filter(t => t.status === "Aberto" || t.status === "Em análise").length;
  document.getElementById("statProgress").textContent = tickets.filter(t => t.status === "Em atendimento").length;
  document.getElementById("statResolved").textContent = tickets.filter(t => t.status === "Resolvido").length;
}

function renderAll() {
  updateDashboard();
  renderTickets();
  renderTechnicalPanel();
}

function createDemoData() {
  if (tickets.length > 0) return;
  const now = new Date().toISOString();
  tickets = [
    { id: 1001, title: "Vazamento na pia", category: "Hidráulica", location: "Bloco C", priority: "Baixa", description: "Torneira vazando.", status: "Aberto", createdAt: now, history: [{ status: "Aberto", date: now, message: "Chamado registrado." }] }
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

createDemoData();
renderAll();