$(document).ready(function () {

    //Variables

    var correctTracker = 0;

    var incorrectTracker = 0;

    var unansweredTracker = 0;

    var questionIndex = 0;

    var gameIsOver = false;

    triviaQuestions = [

        { q: "What is the most common element in the human body?", a: ["oxygen ", "carbon", "iron ", "hydrogen "], c: "carbon", img: "https://media0.giphy.com/media/lboFmA8xFIaAg/200w.webp" },

        { q: "Which of the following has more bones?", a: ["baby", "teenager", "adult", "all the same"], c: "baby", img: "https://media0.giphy.com/media/3oKIPxe2rCWKDlYq2c/200w.webp" },

        { q: "What was the first genetically engineered organism?", a: ["rat", "corn", "tobacco", "sheep"], c: "tobacco", img: "https://media2.giphy.com/media/OnJLRvXvAmvPW/200.webp" },

        { q: "What is the largest cell in a human body?", a: ["blood cell", "sperm", "ovum", "nueron"], c: "ovum", img: "https://media0.giphy.com/media/VVgRNcBKp64NO/200.webp" },

        { q: "In 1796 Edward Jenner developed the vaccination for what disease?", a: ["rabies", "influenza", "consumption", "smallpox"], c: "smallpox", img: "https://media1.giphy.com/media/iNQ2cIve8rUqI/200.webp" },

        { q: "Which scientist is considered the father of modern genetics?", a: ["Tesla", "Mendel", "Einstein", "Darwin"], c: "Mendel", img: "https://media1.giphy.com/media/RB1gL2aMEsItG/200.webp" },

        { q: "What was the name given to the sheep that was the first mammal cloned from an adult cell?", a: ["Lucy", "Sally", "Martha", "Dolly"], c: "Dolly", img: "https://media2.giphy.com/media/z5u3Hddn4P45O/200.webp" },

        { q: "How many pairs of chromosomes are in found in the average human?", a: ["23", "26", "13", "46"], c: "23", img: "https://media3.giphy.com/media/FO4fycHyNImLm/200w.webp" },

        { q: "What does the acronym DNA stand for?", a: ["deoxynucleic acid", "dioxyribonucleic acid", "deoxyribonucleic acid", "dioxynucleic acid"], c: "deoxyribonucleic acid", img: "https://media3.giphy.com/media/SJX3gbZ2dbaEhU92Pu/200w.webp" },

        { q: "What blood type do you need to be a universal donor?", a: ["A+", "O-", "B-", "O+"], c: "O+", img: "https://media2.giphy.com/media/tMPSeKEplOfK0/200.webp" }
    ];

    //Only start button shows at the begining of the game
    $(".time-div").hide();
    $(".question-div").hide();
    $(".answer-div").hide();

    //Functions:

    //Function to add a question to the "question-div"
    function addQuestion() {
        $(".time-div").show();
        $(".question-div").html('<div>' + triviaQuestions[questionIndex].q + '</div>');
        console.log(triviaQuestions[questionIndex].q);
        console.log("Correct answer: " + triviaQuestions[questionIndex].c);
    };

    //Function to add answers to the "answer-div"
    function addAnswers() {
        $(".answer-div").show();
        $(".btn1").text(triviaQuestions[questionIndex].a[0]);
        $(".btn2").text(triviaQuestions[questionIndex].a[1]);
        $(".btn3").text(triviaQuestions[questionIndex].a[2]);
        $(".btn4").text(triviaQuestions[questionIndex].a[3]);
    };

    //Function to determine if game is over
    //If not go to next question
    function isGameOver() {
        questionIndex++;
        console.log("Question number " + questionIndex + " out of 10.");
        if (questionIndex === triviaQuestions.length) {
            gameIsOver === true;
            console.log("GAME OVER");

            //Displays Game Over Screen
            $(".time-div").hide();
            $(".answer-div").hide();
            $(".hide-button").show();
            $(".start-button").text("Start Over?");
            $(".question-div").html(
                "<h1 class='text-danger'>GAME OVER</h1>" +
                "<p>" +
                "Correct Answers: " + correctTracker +
                "<br>" +
                "Incorrect Answers: " + incorrectTracker +
                "<br>" +
                "Unanswered: " + unansweredTracker +
                "</p>"
            );
        }

        //Displays next question if game is not over
        else {
            gameIsOver === false;
            addQuestion();
            addAnswers();
            timer();
        };
    };

    //Function for when user choses incorrect answer
    function incorrect() {
        $(".time-div").hide();
        $(".answer-div").hide();
        $(".question-div").html(
            "<h2 class='text-danger'> Wrong answer!" + "</h2>" +
            "<p> The correct answer was: " + triviaQuestions[questionIndex].c + "</p>" +
            "<img src='" + triviaQuestions[questionIndex].img + "' alt='LOSER' class='img-fluid'>"
        );

        //Timer for incorrect display
        incorrectCount = 3;
        incorrectCounter = setInterval(incorrectTimer, 1000);
        function incorrectTimer() {
            incorrectCount--;
            if (incorrectCount === 0) {
                clearInterval(incorrectCounter);
                isGameOver();
            }
            console.log("Incorrect display timer: " + incorrectCount);
        };
    };

    //Timer for questions
    function timer() {
        timeCount = 30;
        counter = setInterval(timerCount, 1000);
        $(".time-div").text("Time remaining: " + timeCount);
        function timerCount() {
            timeCount--;
            if (timeCount === 0) {
                unansweredTracker++;
                clearInterval(counter);
                incorrect();
            }
            $(".time-div").text("Time remaining: " + timeCount);
            console.log("Time remaining: " + timeCount);
        };

    };

    //On Click Events:

    //Start button on-click event
    $(".start-button").on("click", function () {
        questionIndex = 0;
        incorrectTracker = 0;
        correctTracker = 0;
        unansweredTracker = 0;
        $(".hide-button").hide();
        $(".time-div").show();
        addQuestion();
        addAnswers();
        $(".question-div").show();
        $(".answer-div").show();
        timer();
    })

    //On-click event when user chooses an answer
    $(".answer-button").on("click", function () {
        var userChoice = $(this).text();
        clearInterval(counter);

        //If user chooses correct answer
        if (userChoice === triviaQuestions[questionIndex].c) {
            correctTracker++;
            $(".time-div").hide();
            $(".answer-div").hide();
            $(".question-div").html(
                "<h2 class='text-danger'> Correct!" + "</h2>" +
                "<img src='https://media0.giphy.com/media/rTg5MCCGlpvMs/200.webp' alt='Correct' class='img-fluid'>"
            );

            //Timer for correct display
            correctCount = 2;
            correctCounter = setInterval(correctTimer, 1000);
            function correctTimer() {
                correctCount--;
                if (correctCount === 0) {
                    clearInterval(correctCounter);
                    isGameOver();
                };
                console.log("Correct display timer: " + correctCount);
            };
        }

        //If user chooses incorrect answer
        else {
            incorrectTracker++;
            incorrect();
        }
    });
});
