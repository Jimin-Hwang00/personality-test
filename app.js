const express = require('express');
const app = express();

app.set('view engine', 'ejs');      // 뷰 템플릿 엔진 설정
app.set('views', "./views");        // 뷰 파일들이 위치한 디렉터리 설정

app.use(express.json());            // JSON 파싱 미들웨어 추가
app.use(express.urlencoded({extended: true}));  // URL-encoded 데이터 파싱 미들웨어 추가
app.use(express.static('./public'));    // 정적 파일 서비스 미들웨어


app.route("/")
.get((req, res) => {
    res.render("main");
});

app.use('/personality-test', require('./routes/animalRouter'));

app.listen(3000, () => {
    console.log('서버 실행 중')
});
