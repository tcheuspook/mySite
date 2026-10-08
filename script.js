const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.textContent = open ? '菜单' : '关闭';
  nav.classList.toggle('is-open', !open);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '菜单';
  nav.classList.remove('is-open');
}));

const cases = {
  waste: {
    kicker: 'CASE 01 / WASTE CAR HERO',
    title: '废车侠',
    summary: '报废车回收与拆车配件交易平台。以移动端多角色体验和 B 端代理商后台为两条产品线，推动线下业务线上化。',
    metrics: [['2,000+', '报废车线索'], ['88%', '线索转化率'], ['16万', '配件交易 GMV']],
    details: [['我的工作', '梳理车主、回收商、修理厂、车商等角色链路；设计车源、会员、订单、配件和分佣功能；用 MySQL 做数据核验与验收支持。'], ['岗位映射', '需求访谈、业务流程、权限设计、原型与 PRD、研发协作、上线验证。']],
    gallery: [['waste-home.png', '移动端首页'], ['waste-vin.png', 'VIN 查车型'], ['waste-parts.png', '配件发布'], ['waste-agent.png', '代理商场景']],
  },
  suyou: {
    kicker: 'CASE 02 / SHUYOU TRAINING',
    title: '数优战训平台',
    summary: '面向焚烧厂行业的企业管理 SaaS，围绕任务、培训、考试和知识共享，让组织经验变成可检索、可复用的系统资产。',
    metrics: [['8 家', '企业落地'], ['500+', '知识内容'], ['80%', '问答命中率']],
    details: [['我的工作', '拆解管理人员、一线员工、培训人员等业务链路；构建任务闭环、标签体系、知识库和 AI 问答；参与评审、实施和交付。'], ['岗位映射', '用户访谈、复杂流程抽象、AI 辅助需求整理、知识管理、系统验收与用户培训。']],
    gallery: [['suyou-task-list.jpg', '任务管理'], ['suyou-dashboard.jpg', '数据看板'], ['suyou-knowledge.jpg', '知识内容']],
  },
  iot: {
    kicker: 'CASE 03 / SMART ENVIRONMENT',
    title: '菲达智慧环保岛',
    summary: '面向工业园区的数据监控与智慧控制平台，将生产现场的实时数据、预警和操作动作放在同一套系统里。',
    metrics: [['175w+', '累计营收'], ['85%', '系统满意度'], ['15%', '资源浪费减少']],
    details: [['我的工作', '走进业务现场梳理线下操作，完成业务流程、功能模块、大屏界面、PRD 和原型；跟进智慧控制、除尘预警、数据分析等模块交付。'], ['岗位映射', '现场调研、IoT 数据理解、跨部门协作、实施交付、系统验收和持续迭代。']],
    gallery: [],
  },
};

const dialog = document.querySelector('.case-dialog');
const caseTitle = document.querySelector('#case-title');
const caseKicker = document.querySelector('#case-kicker');
const caseSummary = document.querySelector('#case-summary');
const caseBody = document.querySelector('#case-body');

function renderCase(key) {
  const item = cases[key];
  if (!item) return;
  caseKicker.textContent = item.kicker;
  caseTitle.textContent = item.title;
  caseSummary.textContent = item.summary;
  const metricMarkup = item.metrics.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join('');
  const detailMarkup = item.details.map(([title, text]) => `<div><h3>${title}</h3><p>${text}</p></div>`).join('');
  const galleryMarkup = item.gallery.length ? `<div class="case-gallery">${item.gallery.map(([src, alt]) => `<figure><img src="${src}" alt="${alt}"><figcaption>${alt}</figcaption></figure>`).join('')}</div>` : '';
  caseBody.innerHTML = `<div class="case-meta">${metricMarkup}</div><div class="case-detail-grid">${detailMarkup}</div>${galleryMarkup}`;
  dialog.showModal();
}

document.querySelectorAll('[data-open-case]').forEach((button) => button.addEventListener('click', () => renderCase(button.dataset.openCase)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();
