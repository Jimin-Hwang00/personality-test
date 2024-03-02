const mariadb = require('mariadb');
require("dotenv").config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    connectionLimit: 3
});

async function getTestResult(){
    let conn, rows;
    try{
        conn = await pool.getConnection();
        conn.query('USE reasoning_test');
        rows = await conn.query('SELECT * FROM test_result');
    }
    catch(err){
        throw err;
    }
    finally{
        if (conn) conn.end();
        return rows;
    }
};

// 가져온 데이터를 배열로 변환하는 함수
async function scoresToArray() {
    try {
        const rows = await getTestResult(); // 데이터 가져오기
        // 총 참가자 수
        const totalParticipants = rows.reduce((total, row) => total + row.correct_total, 0);

        const scoresArray = rows.map(row => ({
            score: row.score,
            correct_total:row.correct_total,
            percentage: `${Math.round((row.correct_total / totalParticipants) * 100)}%`
        }));
        return scoresArray; // 배열 반환
    } catch (err) {
        throw err;
    }
}

//유저 점수 저장
async function saveUserScore(score) {
    let conn;
    console.log(score);
    try {
        conn = await pool.getConnection();
        conn.query('USE reasoning_test');
        const query = "UPDATE test_result SET correct_total = correct_total + 1 WHERE score = ?";
        await conn.query(query, [score]);
        console.log("User score saved successfully!");
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.end();
    }
}

module.exports = {
    scoresToArray: scoresToArray,
    saveUserScore: saveUserScore
};