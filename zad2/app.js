const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const errorRoutes = require('./routes/error');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

app.use("/user", userRoutes);

app.use("/", bookRoutes);

app.use("*", errorRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
