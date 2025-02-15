const levels = [
    // المستوى 1
    [
      { question: "ما هو لون السماء في يوم صافٍ؟", options: ["أحمر", "أزرق", "أخضر"], answer: "أزرق" },
      { question: "كم عدد الكواكب في المجموعة الشمسية؟", options: ["7", "8", "9"], answer: "8" },
      { question: "ما هي الدولة التي تُعرف باسم 'أرض الفراعنة'؟", options: ["السعودية", "مصر", "اليونان"], answer: "مصر" },
      { question: "ما هو العنصر الأكثر وفرة في الهواء الذي نتنفسه؟", options: ["الأكسجين", "النيتروجين", "ثاني أكسيد الكربون"], answer: "النيتروجين" },
      { question: "ما هي عاصمة فرنسا؟", options: ["باريس", "لندن", "برلين"], answer: "باريس" }
    ],
    // المستوى 2
    [
      { question: "ما هو أكبر كوكب في المجموعة الشمسية؟", options: ["الأرض", "المشتري", "زحل"], answer: "المشتري" },
      { question: "من هو مخترع المصباح الكهربائي؟", options: ["إديسون", "نيوتن", "آينشتاين"], answer: "إديسون" },
      { question: "ما هي العملة الرسمية في اليابان؟", options: ["اليورو", "الين", "الدولار"], answer: "الين" },
      { question: "ما هي أطول سلسلة جبلية في العالم؟", options: ["جبال الألب", "جبال الأنديز", "جبال الهيمالايا"], answer: "جبال الهيمالايا" },
      { question: "ما هو العنصر الكيميائي الذي رمزه H؟", options: ["الهيدروجين", "الهيليوم", "الحديد"], answer: "الهيدروجين" }
    ],
    // المستوى 3
    [
      { question: "ما هي أسرع حيوان على وجه الأرض؟", options: ["الفهد", "الأسد", "الذئب"], answer: "الفهد" },
      { question: "ما هي أكبر قارة في العالم؟", options: ["آسيا", "إفريقيا", "أمريكا الشمالية"], answer: "آسيا" },
      { question: "ما هو أعمق نقطة في المحيطات؟", options: ["خندق ماريانا", "خليج المكسيك", "بحر العرب"], answer: "خندق ماريانا" },
      { question: "ما هي اللغة الأكثر تحدثًا في العالم؟", options: ["الإنجليزية", "الصينية", "الإسبانية"], answer: "الصينية" },
      { question: "ما هو الجهاز المسؤول عن تنظيم ضربات القلب؟", options: ["الكبد", "الدماغ", "القلب"], answer: "الدماغ" }
    ],
    // المستوى 2
    [
        { question: "ما هو أكبر كوكب في المجموعة الشمسية؟", options: ["الأرض", "المشتري", "زحل"], answer: "المشتري" },
        { question: "من هو مخترع المصباح الكهربائي؟", options: ["إديسون", "نيوتن", "آينشتاين"], answer: "إديسون" },
        { question: "ما هي العملة الرسمية في اليابان؟", options: ["اليورو", "الين", "الدولار"], answer: "الين" },
        { question: "ما هي أطول سلسلة جبلية في العالم؟", options: ["جبال الألب", "جبال الأنديز", "جبال الهيمالايا"], answer: "جبال الهيمالايا" },
        { question: "ما هو العنصر الكيميائي الذي رمزه H؟", options: ["الهيدروجين", "الهيليوم", "الحديد"], answer: "الهيدروجين" }
    ],
  ];

let currentLevel = 0;
let currentQuestionIndex = 0;
let score = 0;
let attempts = 3;

const elements = {
    question: document.getElementById('question'),
    optionsContainer: document.getElementById('options-container'),
    levelTitle: document.getElementById('level-title'),
    score: document.getElementById('score'),
    messageContainer: document.getElementById('message-container'),
    progressBar: document.getElementById('progress-bar'),
    attemptDots: document.querySelectorAll('.attempt-dot')
};

function startGame() {
    showQuestion();
    updateProgress();
}

function showQuestion() {
    const currentLevelQuestions = levels[currentLevel];
    if (currentQuestionIndex < currentLevelQuestions.length) {
        const q = currentLevelQuestions[currentQuestionIndex];
        elements.question.textContent = q.question;
        elements.optionsContainer.innerHTML = '';

        q.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(option, q.answer);
            elements.optionsContainer.appendChild(button);
        });
    } else {
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            currentQuestionIndex = 0;
            elements.levelTitle.textContent = `المستوى ${currentLevel + 1}`;
            showQuestion();
        } else {
            endGame('🎉 فوز! أكملت جميع المستويات!');
        }
    }
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score += 10;
        elements.score.textContent = `النقاط: ${score}`;
        showMessage('إجابة صحيحة! 🎉', 'success');
        currentQuestionIndex++;
        if (currentQuestionIndex >= levels[currentLevel].length) {
            setTimeout(() => {
                if (currentLevel < levels.length - 1) {
                    showMessage('🎊 انتقل إلى المستوى التالي', 'success');
                    currentLevel++;
                    currentQuestionIndex = 0;
                    elements.levelTitle.textContent = `المستوى ${currentLevel + 1}`;
                }
                showQuestion();
            }, 1500);
        } else {
            setTimeout(showQuestion, 1000);
        }
    } else {
        attempts--;
        updateAttempts();
        showMessage('❌ إجابة خاطئة!', 'error');
        if (attempts <= 0) {
            endGame('💥 خسارة! انتهت المحاولات');
        }
    }
    updateProgress();
}

function updateAttempts() {
    elements.attemptDots.forEach((dot, index) => {
        dot.classList.toggle('red', index >= attempts);
    });
}

function showMessage(text, type) {
    elements.messageContainer.textContent = text;
    elements.messageContainer.className = type;
    elements.messageContainer.style.display = 'block';
    setTimeout(() => {
        elements.messageContainer.style.display = 'none';
    }, 1500);
}

function updateProgress() {
    // حساب التقدم بناءً على عدد الأسئلة المكتملة
    const totalQuestions = levels[currentLevel].length;
    const progress = (currentQuestionIndex / totalQuestions) * 100; // بدون إضافة +1
    
    // تحديث عرض شريط التقدم
    elements.progressBar.style.width = `${progress}%`;
  }

function endGame(message) {
    elements.question.textContent = message;
    elements.optionsContainer.innerHTML = '';
}

function restartGame() {
    currentLevel = 0;
    currentQuestionIndex = 0;
    elements.progressBar.style.width = "0%"; // إعادة الشريط إلى الصفر
    score = 0;
    attempts = 3;
    elements.score.textContent = 'النقاط: 0';
    elements.attemptDots.forEach(dot => dot.classList.remove('red'));
    startGame();
}

window.onload = startGame;




// في ملف script.js


  
  function startLevel() {
    currentQuestionIndex = 0; // إعادة التعيين عند بدء مستوى جديد
    updateProgress(); // تحديث الشريط مباشرة
    showQuestion();
  }
  