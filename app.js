const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route("/")
.get((req, res) => {
    res.render("main");
});
 
  app.use("/reasoningTest", require("./routes/resoningTestRouter"));

  app.listen(3000, ()=>{
      console.log(`Server is running! `);
  })