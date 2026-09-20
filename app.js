const STORAGE_KEY = "getanalyst-ai-platform-v1";

const models = [
  { id: "gpt-6-astra", name: "GPT-6 Astra", provider: "OpenAI" },
  { id: "gpt-5.6-terra", name: "GPT-5.6 Terra", provider: "OpenAI" },
  { id: "gpt-5.6-luna", name: "GPT-5.6 Luna", provider: "OpenAI" },
  { id: "claude-sonnet-5", name: "Claude Sonnet 5", provider: "Anthropic" },
  { id: "claude-opus-5", name: "Claude Opus 5", provider: "Anthropic" },
  { id: "gemini-3.8-flash", name: "Gemini 3.8 Flash", provider: "Google" },
  { id: "grok-4.6", name: "Grok 4.6", provider: "xAI" },
];

const seedProjects = [
  {
    id: "project-api",
    name: "Проектирование API",
    shortDescription: "Контракты REST API, JSON и маппинг данных на структуру БД.",
    systemInstruction: "Отвечай как ведущий системный аналитик.",
    status: "active",
    color: "#0f8f85",
    createdAt: "2026-09-18T16:20:00Z",
    updatedAt: "2026-09-20T19:40:00Z",
    dialogs: [
      {
        id: "dialog-api-1",
        title: "POST /projects — структура JSON",
        modelId: "gpt-6-astra",
        status: "active",
        createdAt: "2026-09-20T19:40:00Z",
        updatedAt: "2026-09-20T19:40:00Z",
        messages: [
          { id: "m-1", role: "user", text: "Помоги спроектировать JSON для создания проекта." },
          { id: "m-2", role: "assistant", text: "Начнём с минимального контракта: название, описание и системная инструкция. Идентификатор пользователя лучше получить из токена, а не принимать в body." },
        ],
      },
      {
        id: "dialog-api-2",
        title: "Ошибки и HTTP-коды",
        modelId: "claude-sonnet-5",
        status: "active",
        createdAt: "2026-09-19T17:10:00Z",
        updatedAt: "2026-09-19T17:34:00Z",
        messages: [
          { id: "m-3", role: "user", text: "Какие ошибки нужны для метода создания проекта?" },
          { id: "m-4", role: "assistant", text: "Минимально предусмотрите 400 для некорректного JSON, 401 без авторизации, 422 для бизнес-валидации и 500 для непредвиденной ошибки." },
        ],
      },
    ],
  },
  {
    id: "project-architecture",
    name: "Архитектура систем",
    shortDescription: "C4, микросервисы, брокеры сообщений и архитектурные решения.",
    systemInstruction: "Объясняй архитектурные решения с плюсами, минусами и границами применимости.",
    status: "active",
    color: "#7867d8",
    createdAt: "2026-09-15T15:00:00Z",
    updatedAt: "2026-09-20T18:15:00Z",
    dialogs: [
      {
        id: "dialog-arch-1",
        title: "Разбор C4 Container",
        modelId: "claude-opus-5",
        status: "active",
        createdAt: "2026-09-20T18:15:00Z",
        updatedAt: "2026-09-20T18:15:00Z",
        messages: [
          { id: "m-5", role: "user", text: "Что показывать на уровне Container?" },
          { id: "m-6", role: "assistant", text: "На Container-диаграмме показывают приложения и хранилища внутри системы: web/mobile-клиенты, backend-сервисы, базы данных, брокеры и внешние связи между ними." },
        ],
      },
    ],
  },
  {
    id: "project-content",
    name: "Контент GetAnalyst",
    shortDescription: "Черновики статей, вебинаров и учебных материалов сообщества.",
    systemInstruction: "Сохраняй экспертный, ясный и живой стиль GetAnalyst.",
    status: "active",
    color: "#df7e4f",
    createdAt: "2026-09-12T13:20:00Z",
    updatedAt: "2026-09-18T22:05:00Z",
    dialogs: [
      {
        id: "dialog-content-1",
        title: "Анонс практикума",
        modelId: "gemini-3.8-flash",
        status: "active",
        createdAt: "2026-09-18T22:05:00Z",
        updatedAt: "2026-09-18T22:05:00Z",
        messages: [
          { id: "m-7", role: "user", text: "Сделай короткий анонс практикума по брокерам сообщений." },
          { id: "m-8", role: "assistant", text: "На практике разберём, где брокер действительно нужен, где достаточно синхронного API и как не превратить архитектуру в Kafka-везде." },
        ],
      },
    ],
  },
];

const state = {
  projects: loadProjects(),
  view: "projects",
  activeProjectId: null,
  activeDialogId: null,
};

const main = document.querySelector("#main-content");
const modal = document.querySelector("#project-modal");
const projectForm = document.querySelector("#project-form");
const toast = document.querySelector("#toast");
let toastTimer;

function loadProjects() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) && saved.length ? saved : structuredClone(seedProjects);
  } catch {
    return structuredClone(seedProjects);
  }
}

function saveProjects() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.projects));
}

function uid(prefix) {
  return `${prefix}-${crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  const date = new Date(value);
  const now = new Date();
  const diff = Math.floor((now - date) / 86400000);
  if (diff <= 0) return "сегодня";
  if (diff === 1) return "вчера";
  return new Intl.DateTimeFormat("ru", { day: "numeric", month: "short" }).format(date);
}

function getModel(modelId) {
  return models.find((model) => model.id === modelId) || models[0];
}

function modelOptions(selected = models[0].id) {
  const providers = [...new Set(models.map((model) => model.provider))];
  return providers
    .map((provider) => {
      const options = models
        .filter((model) => model.provider === provider)
        .map((model) => `<option value="${model.id}" ${model.id === selected ? "selected" : ""}>${model.name}</option>`)
        .join("");
      return `<optgroup label="${provider}">${options}</optgroup>`;
    })
    .join("");
}

function projectInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function renderSidebar() {
  const recent = document.querySelector("#recent-projects");
  recent.innerHTML = [...state.projects]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5)
    .map(
      (project) => `
        <button class="recent-project ${state.activeProjectId === project.id ? "is-active" : ""}" type="button" data-project-id="${project.id}">
          <span class="recent-project-dot" style="--project-color:${project.color}"></span>
          <span>${escapeHtml(project.name)}</span>
        </button>
      `,
    )
    .join("");
}

function renderProjects() {
  state.view = "projects";
  state.activeProjectId = null;
  state.activeDialogId = null;
  main.innerHTML = `
    <section class="content-wrap" aria-labelledby="projects-title">
      <header class="page-heading">
        <div>
          <span class="eyebrow">Рабочее пространство</span>
          <h1 id="projects-title">Ваши проекты</h1>
          <p>Объединяйте диалоги одной тематики и задавайте для каждого проекта собственный контекст.</p>
        </div>
        <button class="button primary" type="button" data-action="create-project">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
          Создать проект
        </button>
      </header>
      <div class="projects-grid">
        ${state.projects.map(projectCard).join("")}
        <button class="empty-project-card" type="button" data-action="create-project">
          <span>+</span>
          <strong>Новый проект</strong>
        </button>
      </div>
    </section>
  `;
  renderSidebar();
  main.focus({ preventScroll: true });
}

function projectCard(project) {
  const dialogs = project.dialogs || [];
  return `
    <button class="project-card" type="button" data-project-id="${project.id}" style="--project-color:${project.color}">
      <span class="project-card-top">
        <span class="project-icon">${escapeHtml(projectInitials(project.name))}</span>
        <span class="project-arrow"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg></span>
      </span>
      <h2>${escapeHtml(project.name)}</h2>
      <p>${escapeHtml(project.shortDescription || "Без описания")}</p>
      <span class="project-meta">
        <span>${dialogs.length} ${pluralize(dialogs.length, "диалог", "диалога", "диалогов")}</span>
        <span>Обновлён ${formatDate(project.updatedAt)}</span>
      </span>
    </button>
  `;
}

function pluralize(number, one, few, many) {
  const mod10 = number % 10;
  const mod100 = number % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return few;
  return many;
}

function openProject(projectId, focusComposer = false) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) return;
  state.view = "project";
  state.activeProjectId = project.id;
  state.activeDialogId = null;
  main.innerHTML = `
    <section class="content-wrap" aria-labelledby="project-title">
      <button class="back-button" type="button" data-action="home">
        <svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>
        Все проекты
      </button>
      <header class="project-heading">
        <div>
          <span class="eyebrow">Проект</span>
          <h1 id="project-title">${escapeHtml(project.name)}</h1>
          <p>${escapeHtml(project.shortDescription || "Без описания")}</p>
        </div>
        <span class="project-badge">Активен</span>
      </header>
      <div class="project-layout">
        <form class="composer-card" id="new-dialog-form">
          <h2>Начните новый диалог</h2>
          <p>Первое сообщение создаст новый диалог внутри этого проекта.</p>
          <div class="prompt-box">
            <textarea id="new-dialog-prompt" name="prompt" placeholder="Спросите что-нибудь по проекту…" required></textarea>
            <div class="prompt-actions">
              <div class="model-select-wrap">
                <label class="sr-only" for="new-dialog-model">AI-модель</label>
                <select id="new-dialog-model" class="model-select" name="modelId" aria-label="Выберите AI-модель">
                  ${modelOptions()}
                </select>
              </div>
              <button class="send-button" type="submit" aria-label="Создать диалог и отправить сообщение">
                <svg viewBox="0 0 24 24"><path d="m5 12 14-7-4 14-3-6zM12 13l7-8" /></svg>
              </button>
            </div>
          </div>
        </form>
        <aside class="dialog-panel" aria-label="Диалоги проекта">
          <div class="dialog-panel-header">
            <h2>Диалоги</h2>
            <span class="dialog-count">${project.dialogs.length}</span>
          </div>
          <div class="dialogs-list">
            ${project.dialogs.length ? [...project.dialogs].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map(dialogItem).join("") : '<div class="empty-dialogs">Здесь появятся диалоги проекта</div>'}
          </div>
        </aside>
      </div>
    </section>
  `;
  renderSidebar();
  main.focus({ preventScroll: true });
  if (focusComposer) requestAnimationFrame(() => document.querySelector("#new-dialog-prompt")?.focus());
}

function dialogItem(dialog) {
  const model = getModel(dialog.modelId);
  return `
    <button class="dialog-item" type="button" data-dialog-id="${dialog.id}">
      <span class="dialog-title">${escapeHtml(dialog.title)}</span>
      <span class="dialog-meta">
        <span class="model-pill">${escapeHtml(model.name)}</span>
        <span>${formatDate(dialog.updatedAt)}</span>
      </span>
    </button>
  `;
}

function createDialog(projectId, prompt, modelId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) throw new Error("Проект не найден");
  const cleanPrompt = prompt.trim();
  if (!cleanPrompt) throw new Error("Введите сообщение");
  if (!models.some((model) => model.id === modelId)) throw new Error("Модель не найдена");

  const now = new Date().toISOString();
  const title = cleanPrompt.length > 54 ? `${cleanPrompt.slice(0, 54).trim()}…` : cleanPrompt;
  const dialog = {
    id: uid("dialog"),
    title,
    modelId,
    status: "active",
    createdAt: now,
    updatedAt: now,
    messages: [
      { id: uid("message"), role: "user", text: cleanPrompt },
      {
        id: uid("message"),
        role: "assistant",
        text: "Диалог создан. В рабочей версии здесь появится ответ выбранной AI-модели.",
      },
    ],
  };
  project.dialogs.unshift(dialog);
  project.updatedAt = now;
  saveProjects();
  return dialog;
}

function openDialog(projectId, dialogId) {
  const project = state.projects.find((item) => item.id === projectId);
  const dialog = project?.dialogs.find((item) => item.id === dialogId);
  if (!project || !dialog) return;
  state.view = "dialog";
  state.activeProjectId = project.id;
  state.activeDialogId = dialog.id;
  const model = getModel(dialog.modelId);
  main.innerHTML = `
    <section class="chat-layout" aria-labelledby="dialog-title">
      <header class="chat-header">
        <div>
          <button class="back-button" type="button" data-project-id="${project.id}">
            <svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>
            ${escapeHtml(project.name)}
          </button>
          <h1 id="dialog-title">${escapeHtml(dialog.title)}</h1>
        </div>
        <span class="chat-model">${escapeHtml(model.provider)} · ${escapeHtml(model.name)}</span>
      </header>
      <div class="messages" id="messages">
        ${dialog.messages.map(messageItem).join("")}
      </div>
      <form class="chat-composer" id="message-form">
        <textarea id="message-text" name="message" placeholder="Продолжите диалог…" required></textarea>
        <div class="prompt-actions">
          <span class="model-pill">${escapeHtml(model.name)}</span>
          <button class="send-button" type="submit" aria-label="Отправить сообщение">
            <svg viewBox="0 0 24 24"><path d="m5 12 14-7-4 14-3-6zM12 13l7-8" /></svg>
          </button>
        </div>
      </form>
    </section>
  `;
  renderSidebar();
  main.focus({ preventScroll: true });
}

function messageItem(message) {
  const role = message.role === "assistant" ? "assistant" : "user";
  return `
    <article class="message ${role}">
      <div class="message-avatar">${role === "assistant" ? "AI" : "ЕА"}</div>
      <div class="message-body"><p>${escapeHtml(message.text)}</p></div>
    </article>
  `;
}

function createProject(data) {
  const name = String(data.name || "").trim();
  if (!name) throw new Error("Введите название проекта");
  const colors = ["#0f8f85", "#7867d8", "#df7e4f", "#3e78c4", "#b35374"];
  const now = new Date().toISOString();
  const project = {
    id: uid("project"),
    name,
    shortDescription: String(data.description || "").trim(),
    systemInstruction: String(data.instruction || "").trim(),
    status: "active",
    color: colors[state.projects.length % colors.length],
    createdAt: now,
    updatedAt: now,
    dialogs: [],
  };
  state.projects.unshift(project);
  saveProjects();
  return project;
}

function addMessage(projectId, dialogId, text) {
  const project = state.projects.find((item) => item.id === projectId);
  const dialog = project?.dialogs.find((item) => item.id === dialogId);
  const cleanText = text.trim();
  if (!dialog || !cleanText) return;
  const now = new Date().toISOString();
  dialog.messages.push({ id: uid("message"), role: "user", text: cleanText });
  dialog.messages.push({
    id: uid("message"),
    role: "assistant",
    text: "Сообщение сохранено. Подключение к AI API можно добавить на следующем этапе.",
  });
  dialog.updatedAt = now;
  project.updatedAt = now;
  saveProjects();
  openDialog(project.id, dialog.id);
}

function showModal() {
  projectForm.reset();
  modal.showModal();
  requestAnimationFrame(() => document.querySelector("#project-name")?.focus());
}

function closeModal() {
  modal.close();
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

document.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-action]");
  const projectTarget = event.target.closest("[data-project-id]");
  const dialogTarget = event.target.closest("[data-dialog-id]");

  if (dialogTarget) {
    openDialog(state.activeProjectId, dialogTarget.dataset.dialogId);
    return;
  }

  if (projectTarget) {
    openProject(projectTarget.dataset.projectId);
    return;
  }

  const action = actionTarget?.dataset.action;
  if (action === "home") renderProjects();
  if (action === "create-project") showModal();
  if (action === "close-modal") closeModal();
  if (action === "new-dialog") {
    const projectId = state.activeProjectId || state.projects[0]?.id;
    if (projectId) openProject(projectId, true);
    else showModal();
  }
});

document.addEventListener("submit", (event) => {
  event.preventDefault();

  if (event.target.id === "project-form") {
    const formData = new FormData(event.target);
    const project = createProject(Object.fromEntries(formData));
    closeModal();
    openProject(project.id, true);
    showToast(`Проект «${project.name}» создан`);
  }

  if (event.target.id === "new-dialog-form") {
    const formData = new FormData(event.target);
    const dialog = createDialog(state.activeProjectId, formData.get("prompt"), formData.get("modelId"));
    openDialog(state.activeProjectId, dialog.id);
    showToast("Новый диалог создан");
  }

  if (event.target.id === "message-form") {
    const formData = new FormData(event.target);
    addMessage(state.activeProjectId, state.activeDialogId, formData.get("message"));
  }
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    const projectId = state.activeProjectId || state.projects[0]?.id;
    if (projectId) openProject(projectId, true);
  }
});

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const controller = new AbortController();
  const register = (tool) => {
    try {
      Promise.resolve(context.registerTool(tool, { signal: controller.signal })).catch(() => {});
    } catch {}
  };

  register({
    name: "list_projects",
    title: "Показать проекты",
    description: "Возвращает сохранённые в ИИ-Платформе проекты и количество их диалогов.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, untrustedContentHint: false },
    execute() {
      return state.projects.map((project) => ({ id: project.id, name: project.name, dialogCount: project.dialogs.length }));
    },
  });

  register({
    name: "create_project",
    title: "Создать проект",
    description: "Создаёт новый проект и открывает его на странице.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", minLength: 1, maxLength: 60 },
        description: { type: "string", maxLength: 180 },
        instruction: { type: "string", maxLength: 400 },
      },
      required: ["name"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      const project = createProject(input || {});
      openProject(project.id);
      return { id: project.id, name: project.name, status: project.status };
    },
  });

  register({
    name: "create_project_dialog",
    title: "Создать диалог в проекте",
    description: "Создаёт диалог из первого сообщения и выбранной AI-модели.",
    inputSchema: {
      type: "object",
      properties: {
        projectId: { type: "string", minLength: 1 },
        message: { type: "string", minLength: 1 },
        modelId: { type: "string", enum: models.map((model) => model.id) },
      },
      required: ["projectId", "message", "modelId"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, untrustedContentHint: false },
    execute(input) {
      const dialog = createDialog(input.projectId, input.message, input.modelId);
      openDialog(input.projectId, dialog.id);
      return { dialogId: dialog.id, title: dialog.title, modelId: dialog.modelId };
    },
  });
}

renderProjects();
registerWebMcpTools();
