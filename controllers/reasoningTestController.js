const asyncHandler = require("express-async-handler");
const maria = require('../config/mariaconnect');

//save the users' result
const setUserScore = asyncHandler(async (req, res) => {
    const correctAnswers = req.body.correctAnswers;
    await maria.saveUserScore(correctAnswers);

    await getUsersResult(req, res);
});

//get test's questions
const getQuestions = asyncHandler(async (req, res) => {
    const questions = [
        {
            question: "아파트에서 한 아줌마가 뺑소니를 당하기 전, '노랑머리!!'라고 외쳤다. 그래서 경찰은 아줌마가 사는 아파트에서 염색한 사람들 중 범인을 잡았다. 노랑머리를 한 용의자는 총 4명. 이들 중 범인을 누구일까?",
            options: ["최근 이사 온 대학생", "아파트 단골 분식집 주인", "친한 부녀회장", "경비 아저씨"],
            answer: "최근 이사 온 대학생"
        },
        {
            question: "어제가 내일이었으면 좋겠다. 그럼 오늘이 금요일일 텐데... 그렇다면 오늘은 무슨 요일일까요?",
            options: ["토요일", "일요일", "월요일", "화요일"],
            answer: "일요일"
        },
        {
            question: "멈춘다는 것은 냄비와 같고, 살아있다는 것은 악마와도 같다. 그렇다면, 그물은 무엇과 같을까?",
            options: ["one", "water", "human", "ten"],
            answer: "ten"
        },
        {
            question: "불이 켜진 양초가 10개가 있었다. 그런데 바람이 불어서 2개가 꺼지고 말았다. 그리고 잠시 후에 보니 또 1개가 꺼져있었다. 그로부터 바람이 닿지 않도록 하고 그 후 1개도 꺼지지 않았다면 끝까지 남아있었던 양초는 몇개일까?",
            options: ["2", "3", "4", "5"],
            answer: "3"
        },
        {
            question: "당신의 눈은 가려졌고 빨간색, 파란색, 하얀색, 노란색 양말을 각각 같은 색의 가방에 넣어야 한다. 4개의 가방과 4개의 양말 색은 모두 하나씩 쌍을 이루고 있다. 4가지 중 3가지만 맞게 실행할 확률은 얼마일까?",
            options: ["1/4", "1/3", "1/2", "없다"],
            answer: "없다"
        }
    ];
    res.render("testPage", { questions: questions });
});

//get Intro Page
const getTestIntro = asyncHandler(async (req, res) => {
    res.render("testIntroPage");
});

//get all score result
const getUsersResult = asyncHandler(async (req, res) => {
    const scores = await maria.scoresToArray();
    res.render("rankingChart", { scores: scores });
});

module.exports = { setUserScore, getQuestions, getUsersResult, getTestIntro };
