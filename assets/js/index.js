/* ---------------- Infographic modal ---------------- */
const images = {
  salud:   { src: 'assets/img/infografia-salud-mental.jpg', title: 'Cuida tu mente, construye tu futuro' },
  habitos: { src: 'assets/img/infografia-habitos.jpg',       title: 'Rutinas y buenos hábitos, mejor bienestar' }
};

function lockScroll(){ document.body.style.overflow = 'hidden'; }
function unlockScroll(){ document.body.style.overflow = ''; }

function openImage(key){
  document.getElementById('imgTarget').src = images[key].src;
  document.getElementById('imgTitle').textContent = images[key].title;
  document.getElementById('imgOverlay').classList.add('open');
  lockScroll();
}

/* ---------------- Trivia data ----------------
   Sistema: cada pregunta tiene 4 alternativas (A/B/C/D), cada letra
   pertenece siempre a la misma categoría. Al final se cuenta qué
   letra sumó más puntos y esa categoría define el resultado.
------------------------------------------------- */
const quizzes = {
  aprendizaje: {
    accentClass: '',
    icon: '🧠',
    title: '¿Cómo aprendes mejor?',
    subtitle: 'Trivia',
    intro: 'No hay respuestas correctas o incorrectas. Elige la alternativa que más se parezca a ti.',
    categories: {
      A: { icon:'👀' },
      B: { icon:'👂' },
      C: { icon:'📖' },
      D: { icon:'🤸' }
    },
    questions: [
      { q:'Cuando tienes que aprender algo nuevo…', opts:{
          A:'Prefiero ver imágenes, esquemas o videos.',
          B:'Prefiero que alguien me lo explique.',
          C:'Prefiero leer la información.',
          D:'Prefiero probarlo y aprender mientras lo hago.' } },
      { q:'Antes de una prueba importante, normalmente…', opts:{
          A:'Hago mapas conceptuales, dibujos o esquemas.',
          B:'Explico la materia en voz alta o escucho a alguien.',
          C:'Leo y resumo mis apuntes.',
          D:'Practico con ejercicios o ejemplos.' } },
      { q:'Cuando alguien te explica cómo llegar a un lugar…', opts:{
          A:'Necesito ver un mapa.',
          B:'Prefiero que me indiquen el camino hablando.',
          C:'Prefiero que me escriban las indicaciones.',
          D:'Prefiero ir siguiendo el camino y descubrirlo.' } },
      { q:'Si tienes que recordar algo importante…', opts:{
          A:'Lo recuerdo mejor si lo visualizo.',
          B:'Lo repito o lo digo en voz alta.',
          C:'Lo escribo varias veces.',
          D:'Lo relaciono con una experiencia o acción.' } },
      { q:'En una clase, ¿qué te ayuda más?', opts:{
          A:'Presentaciones, imágenes y videos.',
          B:'Explicaciones y conversaciones.',
          C:'Textos, guías y apuntes.',
          D:'Actividades, experimentos o ejercicios.' } },
      { q:'Cuando tienes que resolver un problema…', opts:{
          A:'Hago un dibujo o esquema para entenderlo.',
          B:'Lo converso con alguien.',
          C:'Busco información y la leo.',
          D:'Intento distintas soluciones hasta encontrar una.' } },
      { q:'Si comienzas una nueva actividad…', opts:{
          A:'Primero observo cómo se hace.',
          B:'Escucho las instrucciones.',
          C:'Leo las instrucciones.',
          D:'¡Prefiero empezar a hacerlo!' } },
      { q:'Imagínate entrando a la universidad. ¿Qué te gustaría encontrar en una clase?', opts:{
          A:'Videos, imágenes y presentaciones dinámicas.',
          B:'Conversaciones, debates y explicaciones.',
          C:'Lecturas, documentos y material para estudiar.',
          D:'Talleres, proyectos y actividades prácticas.' } },
    ],
    results: {
      A: { title:'Visual', headline:'¡Tu mente piensa en imágenes!',
           desc:'Puedes disfrutar especialmente de esquemas, mapas conceptuales, gráficos, videos y recursos visuales para organizar información.',
           tip:'Prueba transformar tus apuntes en esquemas o mapas.',
           challenge:'¡Explica algo que aprendiste utilizando solo un dibujo!' },
      B: { title:'Auditiva', headline:'¡Aprendes conversando y escuchando!',
           desc:'Las explicaciones, conversaciones, debates y repetir información en voz alta pueden ayudarte a organizar tus ideas.',
           tip:'Prueba estudiar explicándole la materia a otra persona.',
           challenge:'¡Explica un tema en 30 segundos!' },
      C: { title:'Lectura/Escritura', headline:'¡Las palabras son tu herramienta!',
           desc:'Puedes sentirte cómodo/a leyendo, escribiendo, tomando apuntes y organizando información.',
           tip:'Prueba hacer resúmenes, listas de conceptos y preguntas de estudio.',
           challenge:'¡Resume algo que aprendiste en 3 frases!' },
      D: { title:'Práctica/Experiencial', headline:'¡Aprendes haciendo!',
           desc:'Experimentar, practicar, moverte, resolver problemas y participar activamente puede ayudarte a comprender mejor.',
           tip:'Busca ejercicios, simulaciones, proyectos y ejemplos prácticos.',
           challenge:'¡Representa una profesión sin hablar!' },
    }
  },

  habitos: {
    accentClass: 'quiz-teal',
    icon: '🌱',
    title: '¿Qué tipo de autocuidado necesitas?',
    subtitle: 'Trivia',
    intro: 'No hay respuestas correctas o incorrectas. Elige la alternativa que más se parezca a ti.',
    categories: {
      A: { icon:'🗓️' },
      B: { icon:'🏃' },
      C: { icon:'🤝' },
      D: { icon:'🌙' }
    },
    questions: [
      { q:'Cuando sientes que tienes mucho que hacer…', opts:{
          A:'Hago una lista o planifico mis tiempos.',
          B:'Salgo a caminar o me muevo para despejarme.',
          C:'Hablo con alguien para ordenar mis ideas.',
          D:'Me tomo una pausa antes de seguir.' } },
      { q:'Antes de un día importante (prueba, entrevista, evento)…', opts:{
          A:'Preparo todo con anticipación y reviso mi horario.',
          B:'Hago algo de actividad física para liberar tensión.',
          C:'Converso con alguien de confianza sobre cómo me siento.',
          D:'Trato de dormir bien y descansar la mente.' } },
      { q:'Cuando terminas una semana agotadora…', opts:{
          A:'Ordeno mis pendientes para la próxima semana.',
          B:'Necesito moverme, salir o hacer deporte.',
          C:'Junto a mis amigos/as o familia para desconectar.',
          D:'Prefiero un momento tranquilo, solo/a y en silencio.' } },
      { q:'Si algo no sale como esperabas…', opts:{
          A:'Reorganizo mis planes y sigo adelante.',
          B:'Necesito liberar energía moviéndome.',
          C:'Busco apoyo o consejo en otras personas.',
          D:'Necesito tiempo para procesarlo con calma.' } },
      { q:'¿Qué rutina te cuesta más mantener?', opts:{
          A:'Organizar mi tiempo y mis tareas.',
          B:'Hacer actividad física con regularidad.',
          C:'Mantenerme en contacto con otras personas.',
          D:'Dormir bien y tomarme pausas.' } },
      { q:'Un buen día para ti incluye…', opts:{
          A:'Cumplir con lo que planifiqué.',
          B:'Moverme, entrenar o estar activo/a.',
          C:'Compartir tiempo con personas que quiero.',
          D:'Tener momentos de calma y descanso.' } },
      { q:'Cuando llegues a la universidad, ¿qué crees que más cuidarás de ti?', opts:{
          A:'Mi organización y planificación de estudio.',
          B:'Mi actividad física y energía.',
          C:'Mis redes de apoyo y amistades.',
          D:'Mi descanso y mis pausas.' } },
      { q:'Si tuvieras que elegir un solo hábito para empezar hoy…', opts:{
          A:'Armar una agenda o lista de tareas.',
          B:'Moverme más durante el día.',
          C:'Hablar más con las personas de mi entorno.',
          D:'Dormir mejor y descansar más.' } },
    ],
    results: {
      A: { title:'Organización', desc:'Te cuidas ordenando tu tiempo y tus tareas. La estructura y la planificación te dan tranquilidad.',
           uni:'Usa una agenda o app de tareas, prioriza y divide los trabajos grandes en pasos pequeños. Te va a ayudar a evitar el estrés de último minuto.' },
      B: { title:'Movimiento y energía', desc:'Te cuidas moviéndote. La actividad física es tu forma de liberar tensión y recargar energía.',
           uni:'Busca espacios para moverte entre clases: caminar, entrenar, estirarte. Tu cuerpo activo también ayuda a tu concentración.' },
      C: { title:'Conexión', desc:'Te cuidas conectando con otras personas. Hablar y compartir es tu forma de procesar lo que vives.',
           uni:'Construye tus redes de apoyo desde el primer semestre: compañeros, grupos de estudio, amistades. No tienes que pasar esta etapa solo/a.' },
      D: { title:'Calma y descanso', desc:'Te cuidas dándote espacio para descansar y procesar las cosas con calma.',
           uni:'Prioriza tu sueño y tus pausas, especialmente en época de pruebas. Aprender a parar también es parte de rendir bien.' },
    }
  }
};

let currentQuiz = null;
let currentIndex = 0;
let answers = [];
const LETTERS = ['A','B','C','D'];

function openQuiz(key){
  currentQuiz = key;
  const modal = document.getElementById('quizModal');
  const data = quizzes[key];
  modal.className = 'modal ' + (data.accentClass || '');
  document.getElementById('quizTitle').textContent = data.title;
  document.getElementById('quizOverlay').classList.add('open');
  lockScroll();
  renderIntro();
}

function renderIntro(){
  const data = quizzes[currentQuiz];
  document.getElementById('quizBody').innerHTML = `
    <div class="quiz-intro">
      <div class="big-icon">${data.icon}</div>
      <span class="intro-eyebrow">${data.subtitle}</span>
      <h3>${data.title}</h3>
      <p>${data.intro}</p>
      <button class="nav-btn primary start-btn" onclick="startQuiz()">Comenzar</button>
    </div>
  `;
}

function startQuiz(){
  currentIndex = 0;
  answers = new Array(quizzes[currentQuiz].questions.length).fill(null);
  renderQuestion();
}

function renderQuestion(){
  const data = quizzes[currentQuiz];
  const total = data.questions.length;
  const q = data.questions[currentIndex];

  let progress = '<div class="progress-row">';
  for(let i=0;i<total;i++){
    const pct = i < currentIndex ? 100 : (i === currentIndex ? (answers[i]!==null?100:0) : 0);
    progress += `<div class="seg"><i style="width:${pct}%"></i></div>`;
  }
  progress += '</div>';

  let opts = '<div class="options">';
  LETTERS.forEach(letter=>{
    const sel = answers[currentIndex]===letter ? 'selected' : '';
    const cat = data.categories[letter];
    opts += `<button class="opt ${sel}" onclick="selectOpt('${letter}')">
      <span class="opt-letter">${letter}</span>
      <span class="opt-icon">${cat.icon}</span>
      <span class="opt-text">${q.opts[letter]}</span>
    </button>`;
  });
  opts += '</div>';

  const isLast = currentIndex === total-1;
  const canNext = answers[currentIndex] !== null;

  document.getElementById('quizBody').innerHTML = `
    ${progress}
    <p class="q-count">Pregunta ${currentIndex+1} de ${total}</p>
    <p class="q-text">${q.q}</p>
    ${opts}
    <div class="quiz-nav">
      <button class="nav-btn ghost" onclick="prevQuestion()" ${currentIndex===0?'disabled':''}>Atrás</button>
      <button class="nav-btn primary" onclick="nextQuestion()" ${canNext?'':'disabled'}>${isLast?'Ver mi resultado':'Siguiente'}</button>
    </div>
  `;
}

function selectOpt(letter){
  answers[currentIndex] = letter;
  renderQuestion();
}
function prevQuestion(){
  if(currentIndex>0){ currentIndex--; renderQuestion(); }
}
function nextQuestion(){
  const data = quizzes[currentQuiz];
  if(currentIndex < data.questions.length-1){
    currentIndex++;
    renderQuestion();
  } else {
    renderResult();
  }
}

function renderResult(){
  const data = quizzes[currentQuiz];

  const tally = {A:0,B:0,C:0,D:0};
  answers.forEach(letter => tally[letter]++);

  let winner = 'A';
  LETTERS.forEach(letter=>{ if(tally[letter] > tally[winner]) winner = letter; });

  const result = data.results[winner];
  const cat = data.categories[winner];
  const total = data.questions.length;

  let barsHtml = '<div class="profile-bars">';
  LETTERS.forEach(letter=>{
    const pct = Math.round((tally[letter]/total)*100);
    const isWinner = letter === winner ? 'is-winner' : '';
    barsHtml += `
      <div class="profile-bar-row ${isWinner}">
        <span class="pb-icon">${data.categories[letter].icon}</span>
        <div class="profile-bar-track"><div class="profile-bar-fill" style="width:${pct}%"></div></div>
        <span class="pb-count">${tally[letter]}</span>
      </div>`;
  });
  barsHtml += '</div>';

  const hasRichFormat = !!result.headline;

  let bodyHtml;
  if(hasRichFormat){
    bodyHtml = `
      <p class="result-headline">${result.headline}</p>
      <p class="lead">${result.desc}</p>
      ${barsHtml}
      <div class="tip-box"><b>💡 Para la universidad</b>${result.tip}</div>
      <div class="challenge-box"><b>🎯 Tu desafío</b>${result.challenge}</div>
    `;
  } else {
    bodyHtml = `
      <p class="lead">${result.desc}</p>
      ${barsHtml}
      <div class="uni-connect"><b>🎓 En la universidad:</b> ${result.uni}</div>
    `;
  }

  document.getElementById('quizBody').innerHTML = `
    <div class="result">
      <div class="badge">${cat.icon}</div>
      <span class="result-tag">Tu preferencia</span>
      <h3>${result.title}</h3>
      ${bodyHtml}
      <div class="stand-cta">¿Quieres profundizar en esto? <b>Acércate a nuestro stand COSAM</b> — estamos para escucharte y acompañarte en cada paso.</div>
      <button class="retry-btn" onclick="openQuiz('${currentQuiz}')">Responder de nuevo</button>
    </div>
  `;
}

/* ---------------- Shared modal helpers ---------------- */
function closeModal(id){
  document.getElementById(id).classList.remove('open');
  if(!document.querySelector('.overlay.open')) unlockScroll();
}
function closeOnOverlay(e, id){
  if(e.target.id === id) closeModal(id);
}
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    closeModal('imgOverlay');
    closeModal('quizOverlay');
  }
});