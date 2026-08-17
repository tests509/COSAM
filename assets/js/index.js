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
   Motor genérico: cada pregunta tiene 4 alternativas (A/B/C/D).
   Cada alternativa apunta a una "key" de categoría (data.categories).
   En el quiz de estilos de aprendizaje la key es la misma en todas
   las preguntas (A siempre = visual). En el quiz de inteligencias
   múltiples la key cambia pregunta a pregunta según la tabla oficial.
   Al final se cuentan las keys elegidas y gana la de mayor puntaje
   (empates se resuelven por el orden de categoryOrder).
------------------------------------------------- */
const LETTERS = ['A','B','C','D'];

const quizzes = {
  /* ---------------- QUIZ 1: Estilos de aprendizaje ---------------- */
  aprendizaje: {
    accentClass: '',
    icon: '🧠',
    title: '¿Cómo aprendes mejor?',
    subtitle: 'Trivia',
    intro: 'No hay respuestas correctas o incorrectas. Elige la alternativa que más se parezca a ti.',
    categories: {
      visual:   { icon:'👀', name:'Visual' },
      auditiva: { icon:'👂', name:'Auditiva' },
      lectura:  { icon:'📖', name:'Lectura/Escritura' },
      practica: { icon:'🤸', name:'Práctica/Experiencial' },
    },
    categoryOrder: ['visual','auditiva','lectura','practica'],
    questions: [
      { q:'Cuando tienes que aprender algo nuevo…', opts:{
          A:{ text:'Prefiero ver imágenes, esquemas o videos.', key:'visual' },
          B:{ text:'Prefiero que alguien me lo explique.', key:'auditiva' },
          C:{ text:'Prefiero leer la información.', key:'lectura' },
          D:{ text:'Prefiero probarlo y aprender mientras lo hago.', key:'practica' } } },
      { q:'Antes de una prueba importante, normalmente…', opts:{
          A:{ text:'Hago mapas conceptuales, dibujos o esquemas.', key:'visual' },
          B:{ text:'Explico la materia en voz alta o escucho a alguien.', key:'auditiva' },
          C:{ text:'Leo y resumo mis apuntes.', key:'lectura' },
          D:{ text:'Practico con ejercicios o ejemplos.', key:'practica' } } },
      { q:'Cuando alguien te explica cómo llegar a un lugar…', opts:{
          A:{ text:'Necesito ver un mapa.', key:'visual' },
          B:{ text:'Prefiero que me indiquen el camino hablando.', key:'auditiva' },
          C:{ text:'Prefiero que me escriban las indicaciones.', key:'lectura' },
          D:{ text:'Prefiero ir siguiendo el camino y descubrirlo.', key:'practica' } } },
      { q:'Si tienes que recordar algo importante…', opts:{
          A:{ text:'Lo recuerdo mejor si lo visualizo.', key:'visual' },
          B:{ text:'Lo repito o lo digo en voz alta.', key:'auditiva' },
          C:{ text:'Lo escribo varias veces.', key:'lectura' },
          D:{ text:'Lo relaciono con una experiencia o acción.', key:'practica' } } },
      { q:'En una clase, ¿qué te ayuda más?', opts:{
          A:{ text:'Presentaciones, imágenes y videos.', key:'visual' },
          B:{ text:'Explicaciones y conversaciones.', key:'auditiva' },
          C:{ text:'Textos, guías y apuntes.', key:'lectura' },
          D:{ text:'Actividades, experimentos o ejercicios.', key:'practica' } } },
      { q:'Cuando tienes que resolver un problema…', opts:{
          A:{ text:'Hago un dibujo o esquema para entenderlo.', key:'visual' },
          B:{ text:'Lo converso con alguien.', key:'auditiva' },
          C:{ text:'Busco información y la leo.', key:'lectura' },
          D:{ text:'Intento distintas soluciones hasta encontrar una.', key:'practica' } } },
      { q:'Si comienzas una nueva actividad…', opts:{
          A:{ text:'Primero observo cómo se hace.', key:'visual' },
          B:{ text:'Escucho las instrucciones.', key:'auditiva' },
          C:{ text:'Leo las instrucciones.', key:'lectura' },
          D:{ text:'¡Prefiero empezar a hacerlo!', key:'practica' } } },
      { q:'Imagínate entrando a la universidad. ¿Qué te gustaría encontrar en una clase?', opts:{
          A:{ text:'Videos, imágenes y presentaciones dinámicas.', key:'visual' },
          B:{ text:'Conversaciones, debates y explicaciones.', key:'auditiva' },
          C:{ text:'Lecturas, documentos y material para estudiar.', key:'lectura' },
          D:{ text:'Talleres, proyectos y actividades prácticas.', key:'practica' } } },
    ],
    results: {
      visual: { title:'Visual', headline:'¡Tu mente piensa en imágenes!',
        desc:'Puedes disfrutar especialmente de esquemas, mapas conceptuales, gráficos, videos y recursos visuales para organizar información.',
        tip:'Prueba transformar tus apuntes en esquemas o mapas.',
        challenge:'¡Explica algo que aprendiste utilizando solo un dibujo!' },
      auditiva: { title:'Auditiva', headline:'¡Aprendes conversando y escuchando!',
        desc:'Las explicaciones, conversaciones, debates y repetir información en voz alta pueden ayudarte a organizar tus ideas.',
        tip:'Prueba estudiar explicándole la materia a otra persona.',
        challenge:'¡Explica un tema en 30 segundos!' },
      lectura: { title:'Lectura/Escritura', headline:'¡Las palabras son tu herramienta!',
        desc:'Puedes sentirte cómodo/a leyendo, escribiendo, tomando apuntes y organizando información.',
        tip:'Prueba hacer resúmenes, listas de conceptos y preguntas de estudio.',
        challenge:'¡Resume algo que aprendiste en 3 frases!' },
      practica: { title:'Práctica/Experiencial', headline:'¡Aprendes haciendo!',
        desc:'Experimentar, practicar, moverte, resolver problemas y participar activamente puede ayudarte a comprender mejor.',
        tip:'Busca ejercicios, simulaciones, proyectos y ejemplos prácticos.',
        challenge:'¡Representa una profesión sin hablar!' },
    }
  },

  /* ---------------- QUIZ 2: Inteligencias múltiples ---------------- */
  inteligencias: {
    accentClass: 'quiz-teal',
    icon: '🌟',
    title: '¿Cuál es tu tipo de inteligencia?',
    subtitle: 'Trivia',
    intro: 'Elige solo una alternativa en cada pregunta. No hay respuestas correctas o incorrectas.',
    categories: {
      linguistica:    { icon:'🗣️', name:'Lingüística' },
      logica:         { icon:'🔢', name:'Lógico-matemática' },
      visual:         { icon:'🎨', name:'Visual-espacial' },
      corporal:       { icon:'🤸', name:'Corporal-cinestésica' },
      musical:        { icon:'🎵', name:'Musical' },
      interpersonal:  { icon:'🤝', name:'Interpersonal' },
      intrapersonal:  { icon:'🌱', name:'Intrapersonal' },
      naturalista:    { icon:'🌎', name:'Naturalista' },
    },
    categoryOrder: ['linguistica','logica','visual','corporal','musical','interpersonal','intrapersonal','naturalista'],
    questions: [
      { q:'Cuando tienes que aprender algo nuevo, prefieres…', opts:{
          A:{ text:'Leerlo, explicarlo o conversarlo. 🗣️', key:'linguistica' },
          B:{ text:'Resolver ejercicios o descubrir cómo funciona. 🔢', key:'logica' },
          C:{ text:'Ver imágenes, mapas o hacer un esquema. 🎨', key:'visual' },
          D:{ text:'Practicarlo directamente, haciendo o moviéndote. 🤸', key:'corporal' } } },
      { q:'Si tienes una tarde libre, probablemente…', opts:{
          A:{ text:'Escucho música o descubro canciones nuevas. 🎵', key:'musical' },
          B:{ text:'Salgo con amigos o hago algo con otras personas. 🤝', key:'interpersonal' },
          C:{ text:'Me quedo pensando en mis cosas, metas o planes. 🌱', key:'intrapersonal' },
          D:{ text:'Salgo a caminar, estar al aire libre o conectarme con la naturaleza. 🌎', key:'naturalista' } } },
      { q:'En un trabajo grupal, normalmente eres quien…', opts:{
          A:{ text:'Explica las ideas o prepara la presentación. 🗣️', key:'linguistica' },
          B:{ text:'Organiza la información y encuentra soluciones. 🔢', key:'logica' },
          C:{ text:'Se preocupa de que todo se vea atractivo. 🎨', key:'visual' },
          D:{ text:'Motiva al grupo y ayuda a que todos participen. 🤝', key:'interpersonal' } } },
      { q:'¿Cuál de estas actividades te llamaría más la atención?', opts:{
          A:{ text:'Crear una canción o aprender un instrumento. 🎵', key:'musical' },
          B:{ text:'Practicar un deporte, baile o actividad física. 🤸', key:'corporal' },
          C:{ text:'Dibujar, diseñar o crear contenido visual. 🎨', key:'visual' },
          D:{ text:'Investigar sobre animales, plantas o el medioambiente. 🌎', key:'naturalista' } } },
      { q:'Cuando tienes un problema, generalmente…', opts:{
          A:{ text:'Lo pienso y trato de entender qué estoy sintiendo. 🌱', key:'intrapersonal' },
          B:{ text:'Busco una solución lógica paso a paso. 🔢', key:'logica' },
          C:{ text:'Converso con alguien y escucho diferentes opiniones. 🤝', key:'interpersonal' },
          D:{ text:'Lo explico hablando o escribiendo para ordenar mis ideas. 🗣️', key:'linguistica' } } },
      { q:'¿Qué actividad elegirías para una feria?', opts:{
          A:{ text:'Resolver un misterio o desafío. 🔢', key:'logica' },
          B:{ text:'Hacer una presentación frente a otros. 🗣️', key:'linguistica' },
          C:{ text:'Crear un afiche, video o diseño. 🎨', key:'visual' },
          D:{ text:'Hacer una actividad relacionada con música. 🎵', key:'musical' } } },
      { q:'¿Qué te describe mejor?', opts:{
          A:{ text:'Aprendo mejor cuando puedo experimentar y hacer cosas. 🤸', key:'corporal' },
          B:{ text:'Me interesa entender cómo funcionan las personas y sus relaciones. 🤝', key:'interpersonal' },
          C:{ text:'Suelo reflexionar bastante sobre quién soy y qué quiero. 🌱', key:'intrapersonal' },
          D:{ text:'Me fijo mucho en los animales, plantas, paisajes y entorno. 🌎', key:'naturalista' } } },
      { q:'Si pudieras elegir un proyecto para realizar, escogerías…', opts:{
          A:{ text:'Crear una historia, podcast o presentación. 🗣️', key:'linguistica' },
          B:{ text:'Resolver un desafío utilizando datos o estrategias. 🔢', key:'logica' },
          C:{ text:'Diseñar un espacio, afiche o videojuego. 🎨', key:'visual' },
          D:{ text:'Crear una actividad para ayudar a otras personas. 🤝', key:'interpersonal' } } },
    ],
    results: {
      linguistica: { title:'Lingüística', headline:'¡Las palabras son tu fuerte!',
        desc:'Te resulta fácil expresarte, explicar ideas y comunicarte, ya sea hablando o escribiendo.',
        tip:'Explica lo que aprendes en voz alta o escribe resúmenes con tus propias palabras.',
        challenge:'¡Cuenta en 30 segundos algo que aprendiste hoy!' },
      logica: { title:'Lógico-matemática', headline:'¡Piensas en patrones y soluciones!',
        desc:'Te gusta razonar, resolver problemas paso a paso y entender cómo funcionan las cosas.',
        tip:'Busca ejercicios, acertijos o desafíos lógicos para poner a prueba tus ideas.',
        challenge:'¡Resuelve un acertijo o desafío lógico ahora mismo!' },
      visual: { title:'Visual-espacial', headline:'¡Ves el mundo en imágenes!',
        desc:'Disfrutas crear, diseñar y organizar información de forma visual: dibujos, mapas, esquemas.',
        tip:'Transforma tus apuntes en esquemas, diagramas o mapas visuales.',
        challenge:'¡Dibuja algo que represente cómo te sientes hoy!' },
      corporal: { title:'Corporal-cinestésica', headline:'¡Aprendes con el cuerpo en movimiento!',
        desc:'Te gusta experimentar, moverte y aprender haciendo, más que solo escuchando o leyendo.',
        tip:'Busca actividades prácticas, talleres o proyectos donde puedas moverte y crear.',
        challenge:'¡Haz un gesto o movimiento que represente lo que sientes ahora!' },
      musical: { title:'Musical', headline:'¡La música conecta contigo!',
        desc:'Tienes sensibilidad para los sonidos, ritmos y melodías; la música te ayuda a expresarte y concentrarte.',
        tip:'Prueba estudiar con música instrumental o crea una melodía para recordar contenidos.',
        challenge:'¡Tararea una melodía que represente tu estado de ánimo!' },
      interpersonal: { title:'Interpersonal', headline:'¡Te conectas fácilmente con otras personas!',
        desc:'Entiendes bien a los demás, trabajas bien en equipo y disfrutas ayudar y colaborar.',
        tip:'Aprovecha los trabajos grupales y arma redes de apoyo desde el primer semestre.',
        challenge:'¡Pregúntale a alguien cómo está y escúchalo de verdad!' },
      intrapersonal: { title:'Intrapersonal', headline:'¡Te conoces bien a ti mismo/a!',
        desc:'Te gusta reflexionar sobre tus metas, emociones y decisiones antes de actuar.',
        tip:'Date espacios para pensar en lo que realmente quieres antes de decidir tu camino.',
        challenge:'¡Escribe una meta que tengas para este año!' },
      naturalista: { title:'Naturalista', headline:'¡Conectas con el entorno natural!',
        desc:'Te interesan los animales, las plantas y el medioambiente; observas y comprendes bien la naturaleza.',
        tip:'Busca espacios al aire libre, ramos o actividades ligadas al medioambiente.',
        challenge:'¡Sal y observa algo de la naturaleza por un minuto!' },
    }
  }
};

let currentQuiz = null;
let currentIndex = 0;
let answers = [];

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
    const opt = q.opts[letter];
    const cat = data.categories[opt.key];
    opts += `<button class="opt ${sel}" onclick="selectOpt('${letter}')">
      <span class="opt-letter">${letter}</span>
      <span class="opt-icon">${cat.icon}</span>
      <span class="opt-text">${opt.text}</span>
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
  const order = data.categoryOrder;

  const tally = {};
  order.forEach(key => tally[key] = 0);
  answers.forEach((letter, i) => {
    const key = data.questions[i].opts[letter].key;
    tally[key]++;
  });

  let winner = order[0];
  order.forEach(key => { if(tally[key] > tally[winner]) winner = key; });

  const result = data.results[winner];
  const cat = data.categories[winner];
  const total = data.questions.length;

  let barsHtml = '<div class="profile-bars">';
  order.forEach(key=>{
    const pct = Math.round((tally[key]/total)*100);
    const isWinner = key === winner ? 'is-winner' : '';
    barsHtml += `
      <div class="profile-bar-row ${isWinner}">
        <span class="pb-icon">${data.categories[key].icon}</span>
        <div class="profile-bar-track"><div class="profile-bar-fill" style="width:${pct}%"></div></div>
        <span class="pb-count">${tally[key]}</span>
      </div>`;
  });
  barsHtml += '</div>';

  document.getElementById('quizBody').innerHTML = `
    <div class="result">
      <div class="badge">${cat.icon}</div>
      <span class="result-tag">Tu resultado</span>
      <h3>${result.title}</h3>
      <p class="result-headline">${result.headline}</p>
      <p class="lead">${result.desc}</p>
      ${barsHtml}
      <div class="tip-box"><b>💡 Para la universidad</b>${result.tip}</div>
      <div class="challenge-box"><b>🎯 Tu desafío</b>${result.challenge}</div>
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