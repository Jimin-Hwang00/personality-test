const asyncHandler = require('express-async-handler')
const conn = require('../config/dbconnect');
const { param } = require('../routes/animalRouter');

// Get all questions
// GET /personality-test
const getAnimalQuestionList = asyncHandler(async (req, res) => {
    conn.query("SELECT * FROM animal_question", (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render("animalQuestion", {qList: result})
    })
})

// Update animal quantity 
// POST /personality-test
const updateAnimalQuantity = asyncHandler(async (req, res) => {
    const answer = req.body.q0 + req.body.q1 + req.body.q2 + req.body.q3;
    conn.query(`UPDATE animal SET quantity = quantity + 1 WHERE answer = '${answer}'`, (err, result) => {
        if (err) {
            console.log(err);
        }

        res.redirect(`/personality-test/result/${answer}`);
    });
});

// Get animal name by answer
// GET /personality-test/result/:answer
const getAnimalByAnswer = asyncHandler(async (req, res) => {
    const answer = req.params.answer;
    conn.query(`SELECT * FROM animal WHERE answer = ${answer}`, (err, result) => {
        if (err) {
            console.log(err);
        }
        res.render("animalResult", {animal: result[0]})
    });
});

// Get animal list
// GET /personality-test/ratio
const getAnimalRatio = asyncHandler(async (req, res) => {
    conn.query("SELECT * FROM animal", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Server Error");
            return;
        }
        
        // 각 동물의 총 수량을 계산
        const totalQuantity = result.reduce((acc, curr) => acc + curr.quantity, 0);
        
        // 각 동물의 비율과 이름을 담을 배열 생성
        const animalRatio = result.map(animal => ({
            name: animal.name,
            ratio: (animal.quantity / totalQuantity) * 100 // 비율 계산
        }));
        
        // animalRatio.ejs로 렌더링하여 전송
        res.render("animalRatio", { animalRatio: animalRatio });
    });
});

module.exports = { getAnimalQuestionList, updateAnimalQuantity, getAnimalByAnswer, getAnimalRatio };