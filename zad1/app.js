const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const errorController = require('./controllers/error');

const app = express();
const PORT = process.env.PORT || 3000;

// Konfiguracja aplikacji Express
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({secret:"secret",resave:false,saveUninitialized:true,}));

// Konfiguracja sesji
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

// Routing dla obsługi błędów
const errorRoutes = require('./routes/error');
app.use("*", errorRoutes);

// Nasłuchiwanie na określonym porcie
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
