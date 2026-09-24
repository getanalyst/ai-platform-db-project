const candidates = [
  {id:1,name:'Александрова Мария Сергеевна',initials:'АМ',color:'avatar-green',role:'Senior системный аналитик',email:'demo@example.test',phone:'+7 000 000-00-01',city:'Москва',experience:'7 лет 4 мес.',added:'12.09.2026',resumes:1,updated:'Сегодня, 14:32',status:'Активный',skills:['REST API','Kafka','PostgreSQL','BPMN','UML','Confluence'],about:'Системный аналитик с опытом проектирования высоконагруженных банковских и e-commerce систем. Специализируется на интеграциях, событийной архитектуре и формализации сложных бизнес-процессов.',jobs:[['Ведущий системный аналитик','FinTech Lab · март 2023 — настоящее время','Проектирование API и интеграций, декомпозиция требований, сопровождение команды разработки.'],['Системный аналитик','MarketSpace · июнь 2019 — февраль 2023','Разработка требований для платформы управления заказами и платёжных сценариев.']]},
  {id:2,name:'Волков Дмитрий Андреевич',initials:'ВД',color:'avatar-blue',role:'Java Backend Developer',email:'demo@example.test',phone:'+7 000 000-00-02',city:'Москва',experience:'5 лет 8 мес.',added:'10.09.2026',resumes:2,updated:'Сегодня, 11:08',status:'Активный',skills:['Java 21','Spring Boot','Kafka','Kubernetes','PostgreSQL','Redis'],about:'Backend-разработчик, специализируется на Java/Spring и микросервисной архитектуре. Участвовал в декомпозиции монолита и построении платформы обработки событий.',jobs:[['Senior Java Developer','PayCore · январь 2024 — настоящее время','Разработка платёжных микросервисов, оптимизация производительности, техническое наставничество.'],['Java Developer','Logix · ноябрь 2020 — декабрь 2023','Сервисы маршрутизации заказов, интеграции через Kafka и REST.']]},
  {id:3,name:'Соколова Анна Игоревна',initials:'СА',color:'avatar-purple',role:'Бизнес-аналитик',email:'demo@example.test',experience:'4 года 2 мес.',added:'08.09.2026',resumes:1,updated:'Вчера, 18:41',status:'Активный'},
  {id:4,name:'Морозов Илья Павлович',initials:'МИ',color:'avatar-orange',role:'Системный аналитик',email:'demo@example.test',experience:'6 лет 1 мес.',added:'05.09.2026',resumes:3,updated:'Вчера, 15:20',status:'Активный'},
  {id:5,name:'Ким Елена Викторовна',initials:'КЕ',color:'avatar-pink',role:'Product Analyst',email:'demo@example.test',experience:'3 года 9 мес.',added:'01.09.2026',resumes:1,updated:'22.09.2026',status:'Активный'},
  {id:6,name:'Павлов Максим Олегович',initials:'ПМ',color:'avatar-teal',role:'Python Developer',email:'demo@example.test',experience:'4 года 7 мес.',added:'28.08.2026',resumes:2,updated:'21.09.2026',status:'Активный'},
  {id:7,name:'Фёдорова Ольга Романовна',initials:'ФО',color:'avatar-navy',role:'UX Researcher',email:'demo@example.test',experience:'5 лет 3 мес.',added:'25.08.2026',resumes:1,updated:'19.09.2026',status:'В архиве'},
  {id:8,name:'Кузнецов Артём Львович',initials:'КА',color:'avatar-blue',role:'DevOps Engineer',email:'demo@example.test',experience:'6 лет 9 мес.',added:'20.08.2026',resumes:2,updated:'18.09.2026',status:'Активный'},
  {id:9,name:'Орлова Виктория Денисовна',initials:'ОВ',color:'avatar-green',role:'Системный аналитик',email:'demo@example.test',experience:'3 года 6 мес.',added:'17.08.2026',resumes:1,updated:'16.09.2026',status:'Активный'},
  {id:10,name:'Лебедев Кирилл Антонович',initials:'ЛК',color:'avatar-orange',role:'QA Automation Engineer',email:'demo@example.test',experience:'4 года 1 мес.',added:'12.08.2026',resumes:1,updated:'14.09.2026',status:'В архиве'},
  {id:11,name:'Новикова Алиса Максимовна',initials:'НА',color:'avatar-pink',role:'Бизнес-аналитик',email:'demo@example.test',experience:'5 лет 5 мес.',added:'10.08.2026',resumes:2,updated:'12.09.2026',status:'Активный'},
  {id:12,name:'Беляев Роман Ильич',initials:'БР',color:'avatar-navy',role:'Java Backend Developer',email:'demo@example.test',experience:'7 лет 2 мес.',added:'07.08.2026',resumes:1,updated:'10.09.2026',status:'Активный'},
  {id:13,name:'Громова Дарья Алексеевна',initials:'ГД',color:'avatar-purple',role:'Data Analyst',email:'demo@example.test',experience:'3 года 4 мес.',added:'03.08.2026',resumes:1,updated:'08.09.2026',status:'Активный'},
  {id:14,name:'Зайцев Никита Сергеевич',initials:'ЗН',color:'avatar-teal',role:'Solution Architect',email:'demo@example.test',experience:'9 лет 6 мес.',added:'29.07.2026',resumes:3,updated:'05.09.2026',status:'Активный'},
  {id:15,name:'Иванова Полина Артёмовна',initials:'ИП',color:'avatar-green',role:'Системный аналитик',email:'demo@example.test',experience:'4 года 8 мес.',added:'24.07.2026',resumes:1,updated:'01.09.2026',status:'Активный'},
  {id:16,name:'Макаров Денис Игоревич',initials:'МД',color:'avatar-orange',role:'Go Developer',email:'demo@example.test',experience:'5 лет 1 мес.',added:'19.07.2026',resumes:2,updated:'30.08.2026',status:'В архиве'},
  {id:17,name:'Васильева Софья Олеговна',initials:'ВС',color:'avatar-pink',role:'Product Manager',email:'demo@example.test',experience:'6 лет 3 мес.',added:'15.07.2026',resumes:1,updated:'28.08.2026',status:'Активный'},
  {id:18,name:'Смирнов Егор Валерьевич',initials:'СЕ',color:'avatar-blue',role:'Frontend Developer',email:'demo@example.test',experience:'3 года 10 мес.',added:'10.07.2026',resumes:1,updated:'25.08.2026',status:'Активный'},
  {id:19,name:'Петрова Ксения Львовна',initials:'ПК',color:'avatar-purple',role:'Бизнес-аналитик',email:'demo@example.test',experience:'4 года 5 мес.',added:'05.07.2026',resumes:2,updated:'21.08.2026',status:'Активный'},
  {id:20,name:'Титов Андрей Михайлович',initials:'ТА',color:'avatar-teal',role:'Database Engineer',email:'demo@example.test',experience:'8 лет 2 мес.',added:'30.06.2026',resumes:1,updated:'18.08.2026',status:'В архиве'}
];

candidates.forEach(candidate => {
  candidate.email = `candidate${candidate.id}@example.test`;
});

const resumes = [
  {id:101,name:'Александрова Мария Сергеевна',initials:'АМ',color:'avatar-green',role:'Senior системный аналитик',vacancy:'Senior системный аналитик',date:'Сегодня, 15:42',source:'hh.ru',score:94,status:'Новый',read:false,type:'ready',comment:['Кандидат отлично соответствует ключевым требованиям вакансии: 7+ лет опыта, сильная экспертиза в REST API, Kafka, UML/BPMN и проектировании интеграций.','Опыт в FinTech и e-commerce подтверждает работу с высоконагруженными системами и сложными сквозными процессами. Уровень ответственности соответствует позиции Senior.','Рекомендуется пригласить на техническое интервью. На встрече стоит уточнить практический опыт с event-driven архитектурой и нефункциональными требованиями.'],bars:[['Ключевые навыки',97],['Релевантный опыт',94],['Уровень позиции',92],['Доменный опыт',88]]},
  {id:102,name:'Волков Дмитрий Андреевич',initials:'ВД',color:'avatar-blue',role:'Java Backend Developer',vacancy:'Java Developer (Middle+)',date:'Сегодня, 15:38',source:'Хабр Карьера',score:87,status:'Новый',read:false,type:'ready',comment:['Профиль хорошо соответствует позиции Java Backend Developer: Spring Boot, Kafka, PostgreSQL, Redis и практический опыт с микросервисами.','Кандидат имеет релевантный опыт в платёжном домене и участвовал в декомпозиции монолита. Это снижает риски адаптации к текущей архитектуре продукта.','Можно приглашать на техническое интервью. Рекомендуется глубже проверить знание concurrency, транзакционных паттернов и Kubernetes.'],bars:[['Java / Spring',94],['Микросервисы',90],['Инфраструктура',78],['Доменный опыт',86]]},
  {id:103,name:'Соколова Анна Игоревна',initials:'СА',color:'avatar-purple',role:'Бизнес-аналитик',vacancy:'Бизнес-аналитик',date:'Сегодня, 15:35',source:'Карьерный сайт',score:null,status:'Обработка',read:false,type:'processing'},
  {id:104,name:'Миронова Алёна Романовна',initials:'МА',color:'avatar-pink',role:'Системный аналитик',vacancy:'Системный аналитик (Middle)',date:'Сегодня, 15:21',source:'hh.ru',score:76,status:'Новый',read:false,type:'ready'},
  {id:105,name:'Шевцов Арсений Ильич',initials:'ША',color:'avatar-navy',role:'Java Developer',vacancy:'Java Developer (Middle+)',date:'Сегодня, 15:12',source:'LinkedIn',score:68,status:'Просмотрен',read:true,type:'ready'},
  {id:106,name:'Мельникова Ирина Павловна',initials:'МИ',color:'avatar-teal',role:'Бизнес-аналитик',vacancy:'Бизнес-аналитик',date:'Сегодня, 14:56',source:'Email',score:null,status:'Обработка',read:false,type:'processing'},
  {id:107,name:'Гусев Матвей Олегович',initials:'ГМ',color:'avatar-orange',role:'Backend Developer',vacancy:'Java Developer (Middle+)',date:'Сегодня, 14:40',source:'Хабр Карьера',score:51,status:'Новый',read:false,type:'ready'},
  {id:108,name:'Котова Елизавета Андреевна',initials:'КЕ',color:'avatar-green',role:'Системный аналитик',vacancy:'Senior системный аналитик',date:'Сегодня, 14:18',source:'hh.ru',score:82,status:'Новый',read:false,type:'ready'},
  {id:109,name:'Андреев Степан Максимович',initials:'АС',color:'avatar-blue',role:'Java Developer',vacancy:'Java Developer (Middle+)',date:'Сегодня, 13:59',source:'Рекомендация',score:79,status:'Просмотрен',read:true,type:'ready'},
  {id:110,name:'Романова Юлия Денисовна',initials:'РЮ',color:'avatar-purple',role:'Бизнес-аналитик',vacancy:'Бизнес-аналитик',date:'Сегодня, 13:47',source:'Карьерный сайт',score:91,status:'Новый',read:false,type:'ready'}
];

let displayedCandidates = 10;
let unreadCount = 723;
const candidateRows = document.getElementById('candidateRows');
const resumeRows = document.getElementById('resumeRows');
const loadStatus = document.getElementById('loadStatus');
const drawer = document.getElementById('drawer');
const backdrop = document.getElementById('drawerBackdrop');
const drawerContent = document.getElementById('drawerContent');

function candidateRow(c){
  const clickable = c.id <= 2;
  return `<tr class="${clickable?'clickable':''}" ${clickable?`data-candidate="${c.id}" title="Открыть карточку кандидата"`:'title="Демо-карточка доступна для первых двух кандидатов"'}>
    <td class="checkbox-col"><input type="checkbox" aria-label="Выбрать ${c.name}"></td>
    <td><div class="candidate-cell"><div class="avatar ${c.color}">${c.initials}</div><div><strong>${c.name}</strong><span>${c.email}</span></div></div></td>
    <td>${c.role}</td><td>${c.experience}</td><td>${c.added}</td>
    <td><span class="resume-count">▤ ${c.resumes}</span></td><td>${c.updated}</td>
    <td><span class="status ${c.status==='Активный'?'active':'archive'}">${c.status}</span></td><td><button class="row-menu">•••</button></td>
  </tr>`;
}

function renderCandidates(query=''){
  const filtered=candidates.filter(c=>(c.name+' '+c.role+' '+(c.skills||[]).join(' ')).toLowerCase().includes(query.toLowerCase()));
  candidateRows.innerHTML=filtered.slice(0,query?20:displayedCandidates).map(candidateRow).join('');
  document.querySelectorAll('[data-candidate]').forEach(row=>row.addEventListener('click',e=>{if(!e.target.matches('input,button')) openCandidate(+row.dataset.candidate)}));
}

function scoreMarkup(r){
  if(r.score===null) return '<div class="ai-processing"><span class="spinner"></span><span>Оценка<br>готовится</span></div>';
  const cls=r.score>=80?'score-high':r.score>=65?'score-mid':'score-low';
  const label=r.score>=80?'Высокое':r.score>=65?'Среднее':'Низкое';
  return `<div class="ai-score"><div class="score-ring ${cls}" style="--score:${r.score}"><b>${r.score}%</b></div><span>${label}<br>соответствие</span></div>`;
}

function renderResumes(query=''){
  const filtered=resumes.filter(r=>(r.name+' '+r.vacancy).toLowerCase().includes(query.toLowerCase()));
  resumeRows.innerHTML=filtered.map((r,i)=>`<tr class="clickable ${r.read?'':'unread'}" data-resume="${r.id}" title="${i<3?'Открыть резюме':'Демо-просмотр доступен для первых трёх резюме'}">
    <td class="checkbox-col"><input type="checkbox" aria-label="Выбрать резюме"></td>
    <td><div class="candidate-cell"><div class="avatar ${r.color}">${r.initials}</div><div><strong>${r.read?'':'<i class="unread-dot"></i>'}${r.name}</strong><span>${r.role}</span></div></div></td>
    <td>${r.vacancy}</td><td>${r.date}</td><td><span class="source-tag">${r.source}</span></td><td>${scoreMarkup(r)}</td>
    <td><span class="status ${r.status==='Новый'?'new':r.status==='Обработка'?'review':'active'}">${r.status}</span></td>
    <td><button class="row-menu">•••</button></td></tr>`).join('');
  document.querySelectorAll('[data-resume]').forEach((row,i)=>row.addEventListener('click',e=>{if(!e.target.matches('input,button')&&i<3)openResume(+row.dataset.resume)}));
}

function openDrawer(kicker,html){
  document.getElementById('drawerKicker').textContent=kicker;
  drawerContent.innerHTML=html;drawer.classList.add('open');backdrop.classList.add('open');drawer.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}
function closeDrawer(){drawer.classList.remove('open');backdrop.classList.remove('open');drawer.setAttribute('aria-hidden','true');document.body.style.overflow=''}

function openCandidate(id){
  const c=candidates.find(x=>x.id===id);
  const buttons=c.resumes===2?'<div class="resume-switcher"><button class="active" data-resume-version="new">Резюме от 10.09.2026</button><button data-resume-version="old">Резюме от 18.02.2025</button></div>':'<span>1 файл</span>';
  openDrawer('Карточка кандидата',`<div class="drawer-body">
    <div class="profile-head"><div class="avatar ${c.color}">${c.initials}</div><div><h2>${c.name}</h2><p>${c.role}</p><div class="profile-meta"><span>⌖ ${c.city}</span><span>◷ ${c.experience}</span><span>● В активном поиске</span></div></div><div class="drawer-actions"><button title="Написать">✉</button><button title="Позвонить">☎</button></div></div>
    <div class="detail-grid"><div class="detail-box"><span>Email</span><strong>${c.email}</strong></div><div class="detail-box"><span>Телефон</span><strong>${c.phone}</strong></div><div class="detail-box"><span>Добавлен в базу</span><strong>${c.added}</strong></div><div class="detail-box"><span>Последнее обновление</span><strong>${c.updated}</strong></div></div>
    <div class="section-title"><h3>Актуальное резюме <b class="latest-label">Самое актуальное</b></h3>${buttons}</div>
    <div id="candidateResumeContent">
      <p class="summary-text">${c.about}</p>
      <div class="section-title"><h3>Ключевые навыки</h3></div><div class="skill-list">${c.skills.map(s=>`<span>${s}</span>`).join('')}</div>
      <div class="section-title"><h3>Опыт работы</h3><span>${c.experience}</span></div><div class="timeline">${c.jobs.map(j=>`<div class="timeline-item"><strong>${j[0]}</strong><span>${j[1]}</span><p>${j[2]}</p></div>`).join('')}</div>
      <div class="section-title"><h3>Файл резюме</h3></div><div class="resume-file"><div class="file-icon">PDF</div><div><strong>${c.name.split(' ')[0]}_resume_2026.pdf</strong><span>PDF · 1,2 МБ · загружен ${c.added}</span></div><button class="demo-download">↓ Скачать</button></div>
    </div>
  </div>`);
  document.querySelectorAll('[data-resume-version]').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('[data-resume-version]').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
    if(btn.dataset.resumeVersion==='old'){
      document.getElementById('candidateResumeContent').innerHTML=`<p class="summary-text">Предыдущая версия резюме. Опыт указан до февраля 2025 года; текущая позиция PayCore ещё не добавлена.</p><div class="section-title"><h3>Ключевые навыки</h3></div><div class="skill-list"><span>Java 17</span><span>Spring Boot</span><span>PostgreSQL</span><span>Docker</span></div><div class="section-title"><h3>Файл резюме</h3></div><div class="resume-file"><div class="file-icon">PDF</div><div><strong>Volkov_resume_2025.pdf</strong><span>PDF · 860 КБ · загружен 18.02.2025</span></div><button class="demo-download">↓ Скачать</button></div>`;
    } else openCandidate(id);
  }));
  bindDemoButtons();
}

function openResume(id){
  const r=resumes.find(x=>x.id===id);
  if(!r.read){r.read=true;unreadCount--;updateUnread();renderResumes(document.getElementById('resumeSearch').value)}
  const ai=r.type==='processing'?`<div class="ai-panel processing"><div class="processing-state"><span class="spinner"></span><h3>AI-оценка готовится</h3><p>Резюме распознано и поставлено в очередь на анализ.<br>Обычно это занимает до 2 минут.</p></div></div>`:
    `<div class="ai-panel"><div class="ai-heading"><div><div class="eyebrow">✦ AI-анализ резюме</div><h3>Соответствие вакансии</h3></div><div class="big-score">${r.score}<small>/100</small></div></div><div class="match-bars">${r.bars.map(b=>`<div class="match-bar"><span>${b[0]}</span><strong>${b[1]}%</strong><div class="bar"><i style="width:${b[1]}%"></i></div></div>`).join('')}</div><div class="ai-comment"><div class="section-title"><h3>Краткий комментарий AI</h3><span>Сформировано сегодня</span></div>${r.comment.map(p=>`<p>${p}</p>`).join('')}</div></div>`;
  openDrawer('Входящее резюме',`<div class="drawer-body"><div class="profile-head"><div class="avatar ${r.color}">${r.initials}</div><div><h2>${r.name}</h2><p>${r.role}</p><div class="profile-meta"><span>Отклик: ${r.date}</span><span>${r.source}</span></div></div><div class="drawer-actions"><button class="reject-button">Отклонить</button><button class="advance-button">Следующий этап</button></div></div>
    ${ai}
    <div class="detail-grid"><div class="detail-box"><span>Вакансия</span><strong>${r.vacancy}</strong></div><div class="detail-box"><span>Опыт работы</span><strong>${id===102?'5 лет 8 мес.':id===101?'7 лет 4 мес.':'4 года 2 мес.'}</strong></div><div class="detail-box"><span>Желаемый доход</span><strong>${id===102?'от 320 000 ₽':'от 280 000 ₽'}</strong></div><div class="detail-box"><span>Формат работы</span><strong>Удалённо / гибрид</strong></div></div>
    <div class="section-title"><h3>Файл резюме</h3><span>Исходный документ</span></div><div class="resume-file"><div class="file-icon">PDF</div><div><strong>${r.name.split(' ')[0]}_resume.pdf</strong><span>PDF · 1,1 МБ · ${r.date}</span></div><button class="demo-download">↓ Скачать</button></div>
    <div class="section-title"><h3>Навыки из резюме</h3></div><div class="skill-list">${id===102?['Java','Spring Boot','Kafka','PostgreSQL','Kubernetes']:id===103?['BPMN','Сбор требований','User Story','SQL','Figma']:['REST API','Kafka','UML','BPMN','PostgreSQL'].map(x=>x).map(s=>`<span>${s}</span>`).join('')}</div>
  </div>`);
  if(id===102){document.querySelector('.skill-list').innerHTML=['Java','Spring Boot','Kafka','PostgreSQL','Kubernetes'].map(s=>`<span>${s}</span>`).join('')}
  if(id===103){document.querySelector('.skill-list').innerHTML=['BPMN','Сбор требований','User Story','SQL','Figma'].map(s=>`<span>${s}</span>`).join('')}
  bindDemoButtons();
}

function bindDemoButtons(){
  document.querySelectorAll('.demo-download,.reject-button,.advance-button').forEach(btn=>btn.addEventListener('click',()=>showToast(btn.classList.contains('demo-download')?'Демо: файл резюме подготовлен к скачиванию':btn.textContent.trim()==='Отклонить'?'Кандидат перемещён в отклонённые':'Кандидат переведён на следующий этап')));
}
function updateUnread(){document.getElementById('inboxBadge').textContent=unreadCount;document.getElementById('titleBadge').textContent=`${unreadCount} новых`}
function showToast(text){const t=document.getElementById('toast');document.getElementById('toastText').textContent=text;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2600)}

function switchView(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===view));
  if(view==='candidates')document.getElementById('candidatesView').classList.add('active');
  else if(view==='inbox')document.getElementById('inboxView').classList.add('active');
  else{document.getElementById('placeholderView').classList.add('active');const item=document.querySelector(`[data-view="${view}"] span:nth-child(2)`);document.getElementById('placeholderTitle').textContent=item?.textContent||'Раздел'}
  window.scrollTo({top:0,behavior:'smooth'});document.getElementById('sidebar').classList.remove('open');document.getElementById('mobileOverlay').classList.remove('open');
}

document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.view)));
document.getElementById('candidateSearch').addEventListener('input',e=>renderCandidates(e.target.value));
document.getElementById('resumeSearch').addEventListener('input',e=>renderResumes(e.target.value));
document.getElementById('globalSearch').addEventListener('keydown',e=>{if(e.key==='Enter'){switchView('candidates');document.getElementById('candidateSearch').value=e.target.value;renderCandidates(e.target.value)}});
document.getElementById('markAllRead').addEventListener('click',()=>{resumes.forEach(r=>r.read=true);unreadCount=0;updateUnread();renderResumes();showToast('Все входящие резюме отмечены прочитанными')});
document.getElementById('addCandidate').addEventListener('click',()=>showToast('Форма добавления кандидата готова к подключению'));
document.getElementById('closeDrawer').addEventListener('click',closeDrawer);backdrop.addEventListener('click',closeDrawer);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeDrawer()});
document.getElementById('mobileMenu').addEventListener('click',()=>{document.getElementById('sidebar').classList.add('open');document.getElementById('mobileOverlay').classList.add('open')});
document.getElementById('mobileOverlay').addEventListener('click',()=>{document.getElementById('sidebar').classList.remove('open');document.getElementById('mobileOverlay').classList.remove('open')});

let loading=false;
window.addEventListener('scroll',()=>{if(document.getElementById('candidatesView').classList.contains('active')&&displayedCandidates<20&&!loading&&window.innerHeight+window.scrollY>=document.body.offsetHeight-180){loading=true;loadStatus.classList.add('loading');loadStatus.innerHTML='<span class="spinner"></span> Загружаем ещё 10 кандидатов…';setTimeout(()=>{displayedCandidates=20;renderCandidates();loadStatus.classList.remove('loading');loadStatus.innerHTML='Показаны все 20 кандидатов';loading=false},650)}});

renderCandidates();renderResumes();
