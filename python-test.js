
const questions = [
    {
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "fun", "define"],
        answer: 1
    },
    {
        question: "Which symbol is used for a single-line comment?",
        options: ["//", "<!--", "#", "/*"],
        answer: 2
    },
    {
        question: "Which data type stores True or False?",
        options: ["String", "Integer", "Boolean", "List"],
        answer: 2
    },
    {
        question: "Which brackets are used to create a Python list?",
        options: ["()", "[]", "{}", "<>"],
        answer: 1
    },
    {
        question: "What is the output of print(2 + 3)?",
        options: ["23", "5", "2 + 3", "Error"],
        answer: 1
    },
    {
        question: "Which function displays output in Python?",
        options: ["show()", "display()", "print()", "output()"],
        answer: 2
    },
    {
        question: "Which keyword is used for a conditional statement?",
        options: ["if", "for", "def", "return"],
        answer: 0
    },
    {
        question: "Which method converts text to lowercase?",
        options: ["lower()", "small()", "tolower()", "case()"],
        answer: 0
    },
    {
        question: "Which loop is commonly used to iterate over a sequence?",
        options: ["repeat", "loop", "for", "iterate"],
        answer: 2
    },
    {
        question: "Which value represents no value in Python?",
        options: ["null", "None", "empty", "void"],
        answer: 1
    }
];

let currentQuestion = 0;
let selectedAnswers = Array(questions.length).fill(null);

const questionNumber = document.getElementById("question-number");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");
const questionTitle = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const errorMessage = document.getElementById("error-message");
const nextButton = document.getElementById("next-button");

function showQuestion() {
    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    const progress =
        ((currentQuestion + 1) / questions.length) * 100;

    progressText.textContent = `${Math.round(progress)}% completed`;
    progressFill.style.width = `${progress}%`;

    questionTitle.textContent = current.question;
    optionsContainer.innerHTML = "";
    errorMessage.textContent = "";

    current.options.forEach((option, index) => {
        const label = document.createElement("label");
        label.className = "option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = index;

        if (selectedAnswers[currentQuestion] === index) {
            radio.checked = true;
            label.classList.add("selected");
        }

        radio.addEventListener("change", () => {
            selectedAnswers[currentQuestion] = index;

            document.querySelectorAll(".option").forEach(item => {
                item.classList.remove("selected");
            });

            label.classList.add("selected");
            errorMessage.textContent = "";
        });

        const text = document.createElement("span");
        text.textContent = option;

        label.append(radio, text);
        optionsContainer.appendChild(label);
    });

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Submit Test ✓"
            : "Next Question →";
}

nextButton.addEventListener("click", () => {
    if (selectedAnswers[currentQuestion] === null) {
        errorMessage.textContent =
            "Please select an option before continuing.";
        return;
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    let correct = 0;

    questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.answer) {
            correct++;
        }
    });

    const percentage = Math.round((correct / questions.length) * 100);

    document.getElementById("quiz").hidden = true;
    document.getElementById("result").hidden = false;

    document.getElementById("score").textContent =
        `${correct}/${questions.length}`;

    document.getElementById("percentage").textContent =
        `${percentage}%`;

    document.getElementById("correct-count").textContent = correct;
    document.getElementById("wrong-count").textContent =
        questions.length - correct;

    document.getElementById("result-message").textContent =
        percentage >= 80
            ? "Excellent work! You have a strong foundation."
            : percentage >= 50
                ? "Good effort! Keep practising to improve."
                : "Keep learning! Practice will help you improve.";

    const reviewList = document.getElementById("review-list");
    reviewList.innerHTML = "";

    questions.forEach((question, index) => {
        const isCorrect = selectedAnswers[index] === question.answer;

        const reviewItem = document.createElement("div");
        reviewItem.className = "review-item";

        const heading = document.createElement("h4");
        heading.textContent = `${index + 1}. ${question.question}`;

        const yourAnswer = document.createElement("p");
        yourAnswer.textContent =
            `Your answer: ${question.options[selectedAnswers[index]]}`;

        yourAnswer.className = isCorrect
            ? "correct-answer"
            : "wrong-answer";

        const correctAnswer = document.createElement("p");
        correctAnswer.textContent =
            `Correct answer: ${question.options[question.answer]}`;

        correctAnswer.className = "correct-answer";

        reviewItem.append(heading, yourAnswer, correctAnswer);
        reviewList.appendChild(reviewItem);
    });

    document.getElementById("restart-button").onclick = () => {
        currentQuestion = 0;
        selectedAnswers = Array(questions.length).fill(null);

        document.getElementById("result").hidden = true;
        document.getElementById("quiz").hidden = false;

        showQuestion();
        window.scrollTo(0, 0);
    };

    window.scrollTo(0, 0);
}

showQuestion();