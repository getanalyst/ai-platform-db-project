const STORAGE_KEY = "getanalyst-ai-platform-v2";
const LEGACY_STORAGE_KEY = "getanalyst-ai-platform-v1";

const models = [
  { id: "gpt-6-astra", name: "GPT-6 Astra", provider: "OpenAI" },
  { id: "gpt-5.6-terra", name: "GPT-5.6 Terra", provider: "OpenAI" },
  { id: "gpt-5.6-luna", name: "GPT-5.6 Luna", provider: "OpenAI" },
  { id: "claude-sonnet-5", name: "Claude Sonnet 5", provider: "Anthropic" },
  { id: "claude-opus-5", name: "Claude Opus 5", provider: "Anthropic" },
  { id: "gemini-3.8-flash", name: "Gemini 3.8 Flash", provider: "Google" },
  { id: "grok-4.6", name: "Grok 4.6", provider: "xAI" },
];

const toolCatalog = [
  { id: "web-search", name: "Поиск в интернете", icon: "⌕" },
  { id: "deep-reasoning", name: "Глубокое размышление", icon: "◌" },
];

const seedProjects = [
  {
    id: "project-api",
    name: "Проектирование API",
    shortDescription: "Контракты REST API, JSON и маппинг данных на структуру БД.",
    systemInstruction: "Отвечай как ведущий системный аналитик. Проверяй структуру контрактов и объясняй принятые решения.",
    status: "active",
    color: "#0f8f85",
    icon: "🧩",
    files: [
      { id: "file-api-db", name: "database-schema.png", type: "image/png", size: 419662, addedAt: "2026-09-20T16:20:00Z" },
    ],
    createdAt: "2026-09-18T16:20:00Z",
    updatedAt: "2026-09-20T19:40:00Z",
    dialogs: [
      {
        id: "dialog-api-1",
        title: "POST /projects — структура JSON",
        modelId: "gpt-6-astra",
        tools: ["deep-reasoning"],
        status: "active",
        createdAt: "2026-09-20T19:40:00Z",
        updatedAt: "2026-09-20T19:40:00Z",
        messages: [
          { id: "m-1", role: "user", text: "Помоги спроектировать JSON для создания проекта.", attachments: [], tools: ["deep-reasoning"] },
          { id: "m-2", role: "assistant", text: "Начнём с минимального контракта: название, описание и системная инструкция. Идентификатор пользователя лучше получить из токена, а не принимать в body.", attachments: [], tools: [] },
        ],
      },
      {
        id: "dialog-api-2",
        title: "Ошибки и HTTP-коды",
        modelId: "claude-sonnet-5",
        tools: [],
        status: "active",
        createdAt: "2026-09-19T17:10:00Z",
        updatedAt: "2026-09-19T17:34:00Z",
        messages: [
          { id: "m-3", role: "user", text: "Какие ошибки нужны для метода создания проекта?", attachments: [], tools: [] },
          { id: "m-4", role: "assistant", text: "Минимально предусмотрите 400 для некорректного JSON, 401 без авторизации, 422 для бизнес-валидации и 500 для непредвиденной ошибки.", attachments: [], tools: [] },
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
    icon: "⚡",
    files: [],
    createdAt: "2026-09-15T15:00:00Z",
    updatedAt: "2026-09-20T18:15:00Z",
    dialogs: [
      {
        id: "dialog-arch-1",
        title: "Разбор C4 Container",
        modelId: "claude-opus-5",
        tools: ["web-search"],
        status: "active",
        createdAt: "2026-09-20T18:15:00Z",
        updatedAt: "2026-09-20T18:15:00Z",
        messages: [
          { id: "m-5", role: "user", text: "Что показывать на уровне Container?", attachments: [], tools: ["web-search"] },
          { id: "m-6", role: "assistant", text: "На Container-диаграмме показывают приложения и хранилища внутри системы: web/mobile-клиенты, backend-сервисы, базы данных, брокеры и внешние связи между ними.", attachments: [], tools: [] },
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
    icon: "📚",
    files: [],
    createdAt: "2026-09-12T13:20:00Z",
    updatedAt: "2026-09-18T22:05:00Z",
    dialogs: [
      {
        id: "dialog-content-1",
        title: "Анонс практикума",
        modelId: "gemini-3.8-flash",
        tools: [],
        status: "active",
        createdAt: "2026-09-18T22:05:00Z",
        updatedAt: "2026-09-18T22:05:00Z",
        messages: [
          { id: "m-7", role: "user", text: "Сделай короткий анонс практикума по брокерам сообщений.", attachments: [], tools: [] },
          { id: "m-8", role: "assistant", text: "На практике разберём, где брокер действительно нужен, где достаточно синхронного API и как не превратить архитектуру в Kafka-везде.", attachments: [], tools: [] },
        ],
      },
    ],
  },
];

const stored = loadStoredState();
const state = {
  projects: stored.projects,
  looseDialogs: stored.looseDialogs,
  view: "projects",
  activeProjectId: null,
  activeDialogId: null,
};

const main = document.querySelector("#main-content");
const projectModal = document.querySelector("#project-modal");
const projectForm = document.querySelector("#project-form");
const deleteModal = document.querySelector("#delete-project-modal");
const toast = document.querySelector("#toast");
let toastTimer;
let projectModalMode = "create";
let editingProjectId = null;
let projectIconDraft = "✨";
let pendingDeleteProjectId = null;

function loadStoredState() {
  try {
    const current = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (current && Array.isArray(current.projects)) {
      return {
        projects: current.projects.map(normalizeProject),
        looseDialogs: Array.isArray(current.looseDialogs) ? current.looseDialogs.map(normalizeDialog) : [],
      };
    }
    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY));
    if (Array.isArray(legacy) && legacy.length) return { projects: legacy.map(normalizeProject), looseDialogs: [] };
  } catch {}
  return { projects: structuredClone(seedProjects), looseDialogs: [] };
}

function normalizeProject(project, index = 0) {
  const colors = ["#0f8f85", "#7867d8", "#df7e4f", "#3e78c4", "#b35374"];
  return {
    ...project,
    color: project.color || colors[index % colors.length],
    icon: project.icon || "✨",
    files: Array.isArray(project.files) ? project.files : [],
    dialogs: Array.isArray(project.dialogs) ? project.dialogs.map(normalizeDialog) : [],
  };
}

function normalizeDialog(dialog) {
  return {
    ...dialog,
    tools: Array.isArray(dialog.tools) ? dialog.tools : [],
    messages: Array.isArray(dialog.messages) ? dialog.messages.map(normalizeMessage) : [],
  };
}

function normalizeMessage(message) {
  return { ...message, attachments: Array.isArray(message.attachments) ? message.attachments : [], tools: Array.isArray(message.tools) ? message.tools : [] };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects: state.projects, looseDialogs: state.looseDialogs }));
  } catch {
    showToast("Не удалось сохранить данные: локальное хранилище заполнено");
  }
}

function uid(prefix) {
  return `${prefix}-${crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;
}

function escapeHtml(value = "") {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function formatDate(value) {
  const date = new Date(value);
  const diff = Math.floor((new Date() - date) / 86400000);
  if (diff <= 0) return "сегодня";
  if (diff === 1) return "вчера";
  return new Intl.DateTimeFormat("ru", { day: "numeric", month: "short" }).format(date);
}

function formatFileSize(bytes = 0) {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1048576) return `${Math.round(bytes / 1024)} КБ`;
  return `${(bytes / 1048576).toFixed(1)} МБ`;
}

function getModel(modelId) {
  return models.find((model) => model.id === modelId) || models[0];
}

function modelOptions(selected = models[0].id) {
  return [...new Set(models.map((model) => model.provider))].map((provider) => {
    const options = models.filter((model) => model.provider === provider).map((model) => `<option value="${model.id}" ${model.id === selected ? "selected" : ""}>${model.name}</option>`).join("");
    return `<optgroup label="${provider}">${options}</optgroup>`;
  }).join("");
}

function projectOptions(selected = "") {
  return `<option value="" ${selected === "" ? "selected" : ""}>Без проекта</option>${state.projects.map((project) => `<option value="${project.id}" ${project.id === selected ? "selected" : ""}>${escapeHtml(project.name)}</option>`).join("")}`;
}

function projectInitials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}

function projectIcon(project, className = "project-icon") {
  if (String(project.icon || "").startsWith("data:image")) return `<span class="${className}"><img src="${project.icon}" alt="" /></span>`;
  return `<span class="${className}">${escapeHtml(project.icon || projectInitials(project.name))}</span>`;
}

function pluralize(number, one, few, many) {
  const mod10 = number % 10;
  const mod100 = number % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return few;
  return many;
}

function renderSidebar() {
  const recent = document.querySelector("#recent-projects");
  recent.innerHTML = [...state.projects].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5).map((project) => `
    <button class="recent-project ${state.activeProjectId === project.id ? "is-active" : ""}" type="button" data-project-id="${project.id}">
      <span class="recent-project-icon">${String(project.icon || "✨").startsWith("data:image") ? `<img src="${project.icon}" alt="" />` : escapeHtml(project.icon || "✨")}</span>
      <span>${escapeHtml(project.name)}</span>
    </button>`).join("");
}

function renderProjects() {
  state.view = "projects";
  state.activeProjectId = null;
  state.activeDialogId = null;
  main.innerHTML = `
    <section class="content-wrap" aria-labelledby="projects-title">
      <header class="page-heading">
        <div><span class="eyebrow">Рабочее пространство</span><h1 id="projects-title">Ваши проекты</h1><p>Объединяйте диалоги одной тематики, добавляйте файлы и задавайте проекту собственную инструкцию.</p></div>
        <button class="button primary" type="button" data-action="create-project"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>Создать проект</button>
      </header>
      <div class="projects-grid">${state.projects.map(projectCard).join("")}<button class="empty-project-card" type="button" data-action="create-project"><span>+</span><strong>Новый проект</strong></button></div>
      ${renderLooseDialogsSection()}
    </section>`;
  renderSidebar();
  main.focus({ preventScroll: true });
}

function renderLooseDialogsSection() {
  if (!state.looseDialogs.length) return "";
  return `<section class="loose-dialogs-section" aria-labelledby="loose-dialogs-title">
    <div class="section-heading-row"><div><span class="eyebrow">Без проекта</span><h2 id="loose-dialogs-title">Отдельные диалоги</h2></div><button class="button secondary" type="button" data-action="new-dialog">Новый диалог</button></div>
    <div class="loose-dialogs-grid">${[...state.looseDialogs].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map((dialog) => dialogCard(dialog, null)).join("")}</div>
  </section>`;
}

function projectCard(project) {
  const dialogs = project.dialogs || [];
  return `<button class="project-card" type="button" data-project-id="${project.id}" style="--project-color:${project.color}">
    <span class="project-card-top">${projectIcon(project)}<span class="project-arrow"><svg viewBox="0 0 24 24"><path d="m9 18 6-6-6-6" /></svg></span></span>
    <h2>${escapeHtml(project.name)}</h2><p>${escapeHtml(project.shortDescription || "Без описания")}</p>
    <span class="project-meta"><span>${dialogs.length} ${pluralize(dialogs.length, "диалог", "диалога", "диалогов")}</span><span>${project.files.length} ${pluralize(project.files.length, "файл", "файла", "файлов")}</span><span>Обновлён ${formatDate(project.updatedAt)}</span></span>
  </button>`;
}

function dialogCard(dialog, projectId) {
  const model = getModel(dialog.modelId);
  return `<button class="loose-dialog-card" type="button" data-dialog-id="${dialog.id}" data-dialog-project="${projectId || "none"}"><strong>${escapeHtml(dialog.title)}</strong><span>${escapeHtml(model.name)} · ${formatDate(dialog.updatedAt)}</span></button>`;
}

function openProject(projectId, focusComposer = false) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) return;
  state.view = "project";
  state.activeProjectId = project.id;
  state.activeDialogId = null;
  main.innerHTML = `<section class="content-wrap" aria-labelledby="project-title">
    <button class="back-button" type="button" data-action="home"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>Все проекты</button>
    <header class="project-heading">
      <div class="project-heading-main">${projectIcon(project, "project-title-icon")}<div><span class="eyebrow">Проект</span><h1 id="project-title">${escapeHtml(project.name)}</h1><p>${escapeHtml(project.shortDescription || "Без описания")}</p></div></div>
      <div class="project-header-actions"><button class="button secondary" type="button" data-action="edit-project" data-id="${project.id}">Редактировать</button><button class="icon-button danger-quiet" type="button" data-action="delete-project" data-id="${project.id}" aria-label="Удалить проект"><svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13M10 11v5M14 11v5" /></svg></button></div>
    </header>
    <div class="instruction-card"><div><span class="eyebrow">Системная инструкция</span><p>${escapeHtml(project.systemInstruction || "Инструкция не задана")}</p></div><button class="text-button" type="button" data-action="edit-project" data-id="${project.id}">Изменить</button></div>
    <div class="project-layout">
      <div class="project-main-column">
        <form class="composer-card" id="new-dialog-form"><h2>Начните новый диалог</h2><p>Первое сообщение создаст новый диалог внутри проекта.</p>
          <div class="prompt-box"><textarea id="new-dialog-prompt" name="prompt" placeholder="Спросите что-нибудь по проекту…" required></textarea>${attachmentPreview("new-dialog-file-preview")}<div class="prompt-toolbar">${toolControls()}</div>${projectFileSelector(project, "projectFileIds")}
            <div class="prompt-actions">${fileUploadButton("new-dialog-files")}<div class="model-select-wrap"><label class="sr-only" for="new-dialog-model">AI-модель</label><select id="new-dialog-model" class="model-select" name="modelId" aria-label="Выберите AI-модель">${modelOptions()}</select></div><button class="send-button" type="submit" aria-label="Создать диалог и отправить сообщение"><svg viewBox="0 0 24 24"><path d="m5 12 14-7-4 14-3-6zM12 13l7-8" /></svg></button></div>
          </div>
        </form>${renderProjectFiles(project)}
      </div>
      <aside class="dialog-panel" aria-label="Диалоги проекта"><div class="dialog-panel-header"><h2>Диалоги</h2><span class="dialog-count">${project.dialogs.length}</span></div><div class="dialogs-list">${project.dialogs.length ? [...project.dialogs].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).map(dialogItem).join("") : '<div class="empty-dialogs">Здесь появятся диалоги проекта</div>'}</div></aside>
    </div>
  </section>`;
  renderSidebar();
  main.focus({ preventScroll: true });
  if (focusComposer) requestAnimationFrame(() => document.querySelector("#new-dialog-prompt")?.focus());
}

function renderProjectFiles(project) {
  return `<section class="project-files-card" aria-labelledby="project-files-title">
    <div class="section-heading-row compact"><div><h2 id="project-files-title">Файлы проекта</h2><p>Их можно прикреплять к сообщениям в этом проекте.</p></div><label class="button secondary file-label"><input id="project-library-upload" type="file" multiple /><svg viewBox="0 0 24 24"><path d="M12 16V4m0 0L7 9m5-5 5 5M5 14v5h14v-5" /></svg>Добавить</label></div>
    <div class="project-files-list">${project.files.length ? project.files.map(fileRow).join("") : '<div class="empty-file-state">В проекте пока нет файлов</div>'}</div>
  </section>`;
}

function fileRow(file) {
  return `<div class="file-row"><span class="file-type-icon">${fileTypeIcon(file)}</span><span class="file-copy"><strong>${escapeHtml(file.name)}</strong><small>${formatFileSize(file.size)}</small></span><button class="icon-button small danger-quiet" type="button" data-action="remove-project-file" data-file-id="${file.id}" aria-label="Удалить ${escapeHtml(file.name)}">×</button></div>`;
}

function fileTypeIcon(file) {
  if (file.type?.startsWith("image/")) return "IMG";
  if (file.type?.includes("pdf")) return "PDF";
  return "FILE";
}

function dialogItem(dialog) {
  const model = getModel(dialog.modelId);
  return `<button class="dialog-item" type="button" data-dialog-id="${dialog.id}" data-dialog-project="${state.activeProjectId}"><span class="dialog-title">${escapeHtml(dialog.title)}</span><span class="dialog-meta"><span class="model-pill">${escapeHtml(model.name)}</span><span>${formatDate(dialog.updatedAt)}</span></span></button>`;
}

function renderNewDialog() {
  state.view = "new-dialog";
  state.activeProjectId = null;
  state.activeDialogId = null;
  main.innerHTML = `<section class="new-dialog-page" aria-labelledby="new-dialog-title">
    <button class="back-button" type="button" data-action="home"><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>Назад</button>
    <div class="new-dialog-heading"><span class="eyebrow">Новый диалог</span><h1 id="new-dialog-title">С чего начнём?</h1><p>Выберите проект или оставьте диалог вне проектов.</p></div>
    <form class="global-composer" id="global-dialog-form"><div class="global-settings-row"><label class="select-field"><span>Проект</span><select id="global-project-select" name="projectId">${projectOptions("")}</select></label><label class="select-field"><span>Модель</span><select name="modelId">${modelOptions()}</select></label></div>
      <div class="prompt-box large"><textarea id="global-dialog-prompt" name="prompt" placeholder="Введите первое сообщение…" required></textarea>${attachmentPreview("global-file-preview")}<div class="prompt-toolbar">${toolControls()}</div><div id="global-project-files"></div><div class="prompt-actions">${fileUploadButton("global-dialog-files")}<span class="composer-hint">Диалог можно создать без проекта</span><button class="send-button" type="submit" aria-label="Создать диалог"><svg viewBox="0 0 24 24"><path d="m5 12 14-7-4 14-3-6zM12 13l7-8" /></svg></button></div></div>
    </form>
  </section>`;
  renderSidebar();
  main.focus({ preventScroll: true });
  requestAnimationFrame(() => document.querySelector("#global-dialog-prompt")?.focus());
}

function toolControls(selected = []) {
  return `<div class="tool-controls" role="group" aria-label="Инструменты сообщения">${toolCatalog.map((tool) => `<label class="tool-toggle"><input type="checkbox" name="tools" value="${tool.id}" ${selected.includes(tool.id) ? "checked" : ""} /><span><b aria-hidden="true">${tool.icon}</b>${escapeHtml(tool.name)}</span></label>`).join("")}</div>`;
}

function fileUploadButton(inputId) {
  return `<label class="attach-button" title="Прикрепить файлы"><input id="${inputId}" class="message-file-input" type="file" multiple /><svg viewBox="0 0 24 24"><path d="m8.5 12.5 6.7-6.7a3 3 0 0 1 4.2 4.2l-8.5 8.5a5 5 0 0 1-7.1-7.1l8.2-8.2" /></svg><span>Файлы</span></label>`;
}

function attachmentPreview(id) {
  return `<div id="${id}" class="attachment-preview" aria-live="polite"></div>`;
}

function projectFileSelector(project, name) {
  if (!project?.files?.length) return "";
  return `<details class="project-file-picker"><summary>Выбрать из файлов проекта <span>${project.files.length}</span></summary><div class="project-file-checks">${project.files.map((file) => `<label><input type="checkbox" name="${name}" value="${file.id}" /><span>${escapeHtml(file.name)}</span></label>`).join("")}</div></details>`;
}

function createDialog(projectId, prompt, modelId, tools = [], attachments = []) {
  const project = projectId ? state.projects.find((item) => item.id === projectId) : null;
  if (projectId && !project) throw new Error("Проект не найден");
  const cleanPrompt = String(prompt || "").trim();
  if (!cleanPrompt) throw new Error("Введите сообщение");
  if (!models.some((model) => model.id === modelId)) throw new Error("Модель не найдена");
  const now = new Date().toISOString();
  const title = cleanPrompt.length > 54 ? `${cleanPrompt.slice(0, 54).trim()}…` : cleanPrompt;
  const dialog = { id: uid("dialog"), title, modelId, tools, status: "active", createdAt: now, updatedAt: now, messages: [
    { id: uid("message"), role: "user", text: cleanPrompt, attachments, tools },
    { id: uid("message"), role: "assistant", text: buildAssistantPlaceholder(tools, attachments), attachments: [], tools: [] },
  ] };
  if (project) { project.dialogs.unshift(dialog); project.updatedAt = now; } else state.looseDialogs.unshift(dialog);
  saveState();
  return dialog;
}

function buildAssistantPlaceholder(tools, attachments) {
  const details = [];
  if (attachments.length) details.push(`прикреплено файлов: ${attachments.length}`);
  if (tools.includes("web-search")) details.push("включён поиск в интернете");
  if (tools.includes("deep-reasoning")) details.push("включено глубокое размышление");
  return `Сообщение принято${details.length ? ` (${details.join(", ")})` : ""}. В рабочей версии здесь появится ответ выбранной AI-модели.`;
}

function findDialog(projectId, dialogId) {
  if (projectId) {
    const project = state.projects.find((item) => item.id === projectId);
    return { project, dialog: project?.dialogs.find((item) => item.id === dialogId) };
  }
  return { project: null, dialog: state.looseDialogs.find((item) => item.id === dialogId) };
}

function openDialog(projectId, dialogId) {
  const { project, dialog } = findDialog(projectId, dialogId);
  if (!dialog) return;
  state.view = "dialog";
  state.activeProjectId = project?.id || null;
  state.activeDialogId = dialog.id;
  const model = getModel(dialog.modelId);
  main.innerHTML = `<section class="chat-layout" aria-labelledby="dialog-title">
    <header class="chat-header"><div><button class="back-button" type="button" ${project ? `data-project-id="${project.id}"` : 'data-action="home"'}><svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6" /></svg>${project ? escapeHtml(project.name) : "Все диалоги"}</button><h1 id="dialog-title">${escapeHtml(dialog.title)}</h1><span class="dialog-location">${project ? `Проект · ${escapeHtml(project.name)}` : "Без проекта"}</span></div><span class="chat-model">${escapeHtml(model.provider)} · ${escapeHtml(model.name)}</span></header>
    <div class="messages" id="messages">${dialog.messages.map(messageItem).join("")}</div>
    <form class="chat-composer" id="message-form"><textarea id="message-text" name="message" placeholder="Продолжите диалог…" required></textarea>${attachmentPreview("message-file-preview")}<div class="prompt-toolbar">${toolControls(dialog.tools || [])}</div>${projectFileSelector(project, "projectFileIds")}<div class="prompt-actions">${fileUploadButton("message-files")}<span class="model-pill">${escapeHtml(model.name)}</span><button class="send-button" type="submit" aria-label="Отправить сообщение"><svg viewBox="0 0 24 24"><path d="m5 12 14-7-4 14-3-6zM12 13l7-8" /></svg></button></div></form>
  </section>`;
  renderSidebar();
  main.focus({ preventScroll: true });
}

function messageItem(message) {
  const role = message.role === "assistant" ? "assistant" : "user";
  const tools = (message.tools || []).map((id) => toolCatalog.find((tool) => tool.id === id)).filter(Boolean);
  return `<article class="message ${role}"><div class="message-avatar">${role === "assistant" ? "AI" : "ЕА"}</div><div class="message-body"><p>${escapeHtml(message.text)}</p>${tools.length ? `<div class="message-tools">${tools.map((tool) => `<span>${tool.icon} ${escapeHtml(tool.name)}</span>`).join("")}</div>` : ""}${message.attachments?.length ? `<div class="message-attachments">${message.attachments.map((file) => `<span><b>${fileTypeIcon(file)}</b>${escapeHtml(file.name)}</span>`).join("")}</div>` : ""}</div></article>`;
}

function createProject(data) {
  const name = String(data.name || "").trim();
  if (!name) throw new Error("Введите название проекта");
  const colors = ["#0f8f85", "#7867d8", "#df7e4f", "#3e78c4", "#b35374"];
  const now = new Date().toISOString();
  const project = { id: uid("project"), name, shortDescription: String(data.description || "").trim(), systemInstruction: String(data.instruction || "").trim(), status: "active", color: colors[state.projects.length % colors.length], icon: projectIconDraft || "✨", files: [], createdAt: now, updatedAt: now, dialogs: [] };
  state.projects.unshift(project);
  saveState();
  return project;
}

function updateProject(projectId, data) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) throw new Error("Проект не найден");
  const name = String(data.name || "").trim();
  if (!name) throw new Error("Введите название проекта");
  project.name = name;
  project.shortDescription = String(data.description || "").trim();
  project.systemInstruction = String(data.instruction || "").trim();
  project.icon = projectIconDraft || project.icon || "✨";
  project.updatedAt = new Date().toISOString();
  saveState();
  return project;
}

function deleteProject(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) return;
  state.projects = state.projects.filter((item) => item.id !== projectId);
  saveState();
  deleteModal.close();
  pendingDeleteProjectId = null;
  renderProjects();
  showToast(`Проект «${project.name}» и его диалоги удалены`);
}

function addMessage(projectId, dialogId, text, tools = [], attachments = []) {
  const { project, dialog } = findDialog(projectId, dialogId);
  const cleanText = String(text || "").trim();
  if (!dialog || !cleanText) return;
  const now = new Date().toISOString();
  dialog.messages.push({ id: uid("message"), role: "user", text: cleanText, attachments, tools });
  dialog.messages.push({ id: uid("message"), role: "assistant", text: buildAssistantPlaceholder(tools, attachments), attachments: [], tools: [] });
  dialog.tools = tools;
  dialog.updatedAt = now;
  if (project) project.updatedAt = now;
  saveState();
  openDialog(project?.id || null, dialog.id);
}

function showProjectModal(mode = "create", projectId = null) {
  projectModalMode = mode;
  editingProjectId = projectId;
  projectForm.reset();
  const project = mode === "edit" ? state.projects.find((item) => item.id === projectId) : null;
  projectIconDraft = project?.icon || "✨";
  document.querySelector("#project-modal-eyebrow").textContent = project ? "Настройки проекта" : "Новый проект";
  document.querySelector("#project-modal-title").textContent = project ? "Редактировать проект" : "Создайте рабочее пространство";
  document.querySelector("#project-submit").textContent = project ? "Сохранить изменения" : "Создать проект";
  document.querySelector("#project-name").value = project?.name || "";
  document.querySelector("#project-description").value = project?.shortDescription || "";
  document.querySelector("#project-instruction").value = project?.systemInstruction || "";
  updateIconChoices();
  projectModal.showModal();
  requestAnimationFrame(() => document.querySelector("#project-name")?.focus());
}

function updateIconChoices() {
  document.querySelectorAll("[data-icon]").forEach((button) => button.classList.toggle("is-selected", button.dataset.icon === projectIconDraft));
  const custom = String(projectIconDraft).startsWith("data:image");
  const uploader = document.querySelector(".upload-icon-button");
  uploader?.classList.toggle("has-custom-icon", custom);
  if (custom) uploader.style.setProperty("--custom-icon", `url(${projectIconDraft})`);
}

function showDeleteModal(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  if (!project) return;
  pendingDeleteProjectId = projectId;
  const count = project.dialogs.length;
  document.querySelector("#delete-project-copy").textContent = `Проект «${project.name}» и ${count} ${pluralize(count, "диалог", "диалога", "диалогов")} будут удалены без возможности восстановления.`;
  deleteModal.showModal();
}

function closeProjectModal() { projectModal.close(); }

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function selectedTools(form) { return new FormData(form).getAll("tools"); }

function selectedProjectFiles(form, project) {
  if (!project) return [];
  const ids = new FormData(form).getAll("projectFileIds");
  return ids.map((id) => project.files.find((file) => file.id === id)).filter(Boolean).map((file) => ({ ...file, source: "project" }));
}

function filesToRecords(fileList) {
  return [...(fileList || [])].map((file) => ({ id: uid("file"), name: file.name, type: file.type || "application/octet-stream", size: file.size, addedAt: new Date().toISOString(), source: "upload" }));
}

function renderSelectedFiles(input) {
  const previewIds = { "new-dialog-files": "new-dialog-file-preview", "global-dialog-files": "global-file-preview", "message-files": "message-file-preview" };
  const preview = document.querySelector(`#${previewIds[input.id]}`);
  if (preview) preview.innerHTML = [...input.files].map((file) => `<span><b>${fileTypeIcon(file)}</b>${escapeHtml(file.name)}<small>${formatFileSize(file.size)}</small></span>`).join("");
}

function readIconFile(file) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/")) return reject(new Error("Выберите изображение"));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Не удалось прочитать файл"));
    reader.onload = () => {
      if (file.type === "image/svg+xml") return resolve(reader.result);
      const image = new Image();
      image.onerror = () => reject(new Error("Не удалось обработать изображение"));
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 128; canvas.height = 128;
        const context = canvas.getContext("2d");
        context.fillStyle = "#ffffff"; context.fillRect(0, 0, 128, 128);
        const scale = Math.max(128 / image.width, 128 / image.height);
        const width = image.width * scale; const height = image.height * scale;
        context.drawImage(image, (128 - width) / 2, (128 - height) / 2, width, height);
        resolve(canvas.toDataURL("image/webp", 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function updateGlobalProjectFiles(projectId) {
  const container = document.querySelector("#global-project-files");
  if (!container) return;
  const project = state.projects.find((item) => item.id === projectId);
  container.innerHTML = projectFileSelector(project, "projectFileIds");
}

document.addEventListener("click", (event) => {
  const actionTarget = event.target.closest("[data-action]");
  const action = actionTarget?.dataset.action;
  if (action === "home") return renderProjects();
  if (action === "create-project") return showProjectModal("create");
  if (action === "edit-project") return showProjectModal("edit", actionTarget.dataset.id);
  if (action === "delete-project") return showDeleteModal(actionTarget.dataset.id);
  if (action === "close-modal") return closeProjectModal();
  if (action === "close-delete-modal") return deleteModal.close();
  if (action === "new-dialog") return renderNewDialog();
  if (action === "remove-project-file") {
    const project = state.projects.find((item) => item.id === state.activeProjectId);
    if (!project) return;
    project.files = project.files.filter((file) => file.id !== actionTarget.dataset.fileId);
    project.updatedAt = new Date().toISOString();
    saveState();
    openProject(project.id);
    return showToast("Файл удалён из проекта");
  }
  const iconChoice = event.target.closest("[data-icon]");
  if (iconChoice) { projectIconDraft = iconChoice.dataset.icon; updateIconChoices(); return; }
  const dialogTarget = event.target.closest("[data-dialog-id]");
  if (dialogTarget) {
    const projectId = dialogTarget.dataset.dialogProject === "none" ? null : dialogTarget.dataset.dialogProject || state.activeProjectId;
    return openDialog(projectId, dialogTarget.dataset.dialogId);
  }
  const projectTarget = event.target.closest("[data-project-id]");
  if (projectTarget) return openProject(projectTarget.dataset.projectId);
});

document.addEventListener("change", async (event) => {
  if (event.target.matches(".message-file-input")) return renderSelectedFiles(event.target);
  if (event.target.id === "global-project-select") return updateGlobalProjectFiles(event.target.value);
  if (event.target.id === "project-icon-file") {
    try { projectIconDraft = await readIconFile(event.target.files[0]); updateIconChoices(); showToast("Своя иконка добавлена"); }
    catch (error) { showToast(error.message); }
  }
  if (event.target.id === "project-library-upload") {
    const project = state.projects.find((item) => item.id === state.activeProjectId);
    if (!project || !event.target.files.length) return;
    const files = filesToRecords(event.target.files).map((file) => ({ ...file, source: "project" }));
    project.files.push(...files);
    project.updatedAt = new Date().toISOString();
    saveState();
    openProject(project.id);
    showToast(`${files.length} ${pluralize(files.length, "файл добавлен", "файла добавлены", "файлов добавлены")} в проект`);
  }
});

document.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  if (form.id === "project-form") {
    const data = Object.fromEntries(new FormData(form));
    const mode = projectModalMode;
    const project = mode === "edit" ? updateProject(editingProjectId, data) : createProject(data);
    closeProjectModal();
    openProject(project.id, mode === "create");
    showToast(mode === "edit" ? "Настройки проекта сохранены" : `Проект «${project.name}» создан`);
  }
  if (form.id === "delete-project-form") deleteProject(pendingDeleteProjectId);
  if (form.id === "new-dialog-form") {
    const project = state.projects.find((item) => item.id === state.activeProjectId);
    const data = new FormData(form);
    const attachments = [...selectedProjectFiles(form, project), ...filesToRecords(document.querySelector("#new-dialog-files")?.files)];
    const dialog = createDialog(project.id, data.get("prompt"), data.get("modelId"), selectedTools(form), attachments);
    openDialog(project.id, dialog.id); showToast("Новый диалог создан");
  }
  if (form.id === "global-dialog-form") {
    const data = new FormData(form);
    const projectId = data.get("projectId") || null;
    const project = projectId ? state.projects.find((item) => item.id === projectId) : null;
    const attachments = [...selectedProjectFiles(form, project), ...filesToRecords(document.querySelector("#global-dialog-files")?.files)];
    const dialog = createDialog(projectId, data.get("prompt"), data.get("modelId"), selectedTools(form), attachments);
    openDialog(projectId, dialog.id); showToast(projectId ? "Диалог создан в выбранном проекте" : "Диалог создан без проекта");
  }
  if (form.id === "message-form") {
    const project = state.activeProjectId ? state.projects.find((item) => item.id === state.activeProjectId) : null;
    const data = new FormData(form);
    const attachments = [...selectedProjectFiles(form, project), ...filesToRecords(document.querySelector("#message-files")?.files)];
    addMessage(state.activeProjectId, state.activeDialogId, data.get("message"), selectedTools(form), attachments);
  }
});

projectModal.addEventListener("click", (event) => { if (event.target === projectModal) closeProjectModal(); });
deleteModal.addEventListener("click", (event) => { if (event.target === deleteModal) deleteModal.close(); });

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); renderNewDialog(); }
});

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const controller = new AbortController();
  const register = (tool) => { try { Promise.resolve(context.registerTool(tool, { signal: controller.signal })).catch(() => {}); } catch {} };
  register({ name: "list_projects", title: "Показать проекты", description: "Возвращает проекты, количество диалогов и файлов.", inputSchema: { type: "object", properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true, untrustedContentHint: false }, execute() { return state.projects.map((project) => ({ id: project.id, name: project.name, dialogCount: project.dialogs.length, fileCount: project.files.length })); } });
  register({ name: "create_project", title: "Создать проект", description: "Создаёт новый проект и открывает его.", inputSchema: { type: "object", properties: { name: { type: "string", minLength: 1, maxLength: 60 }, description: { type: "string", maxLength: 180 }, instruction: { type: "string", maxLength: 1000 }, icon: { type: "string" } }, required: ["name"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute(input) { projectIconDraft = input.icon || "✨"; const project = createProject(input || {}); openProject(project.id); return { id: project.id, name: project.name, status: project.status }; } });
  register({ name: "create_dialog", title: "Создать диалог", description: "Создаёт диалог в выбранном проекте или без проекта.", inputSchema: { type: "object", properties: { projectId: { type: ["string", "null"] }, message: { type: "string", minLength: 1 }, modelId: { type: "string", enum: models.map((model) => model.id) }, tools: { type: "array", items: { type: "string", enum: toolCatalog.map((tool) => tool.id) } } }, required: ["message", "modelId"], additionalProperties: false }, annotations: { readOnlyHint: false, untrustedContentHint: false }, execute(input) { const dialog = createDialog(input.projectId || null, input.message, input.modelId, input.tools || [], []); openDialog(input.projectId || null, dialog.id); return { dialogId: dialog.id, title: dialog.title, modelId: dialog.modelId, projectId: input.projectId || null }; } });
}

renderProjects();
registerWebMcpTools();
