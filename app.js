// // Подключение необходимых модулей
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const User = require('./models/User');
// const PortfolioItem = require('./models/PortfolioItem');
// const { isAdmin } = require('./middleware/authMiddleware');
// const nodemailer = require('nodemailer');
// const axios = require('axios');
// const adminRoutes = require('./routes/adminRoutes');
// // Создание экземпляра приложения Express
// const app = express();
// const port = 3000;

// // Подключение к MongoDB
// mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.log("Connected to MongoDB");
// });

// // Middleware для отслеживания захода на сайт
// app.use((req, res, next) => {
//     console.log('User visited the site');
//     next();
// });

// // Middleware для парсинга данных формы
// app.use(express.urlencoded({ extended: true }));

// // Установка шаблонизатора EJS
// app.set('view engine', 'ejs');

// // Применяем middleware isAdmin к маршрутам администратора
// app.use('/admin', isAdmin, adminRoutes);

// // Маршрут для страницы регистрации (GET)
// app.get('/register', (req, res) => {
//     res.render('register');
// });

// // Маршрут для обработки регистрации (POST)
// app.post('/register', async(req, res) => {
//     try {
//         const { username, password, email } = req.body;
//         const user = new User({ username, password, email });
//         await user.save();

//         // Отправка приветственного сообщения
//         const subject = 'Welcome to Our Website!';
//         const text = `Hello, ${username}!\n Welcome to our website!`;
//         await sendEmail(email, subject, text);

//         res.redirect('/login');
//     } catch (error) {
//         console.log(error);
//         res.send('An error occurred during registration.');
//     }
// });

// // Функция для отправки электронной почты
// async function sendEmail(to, subject, text) {
//     try {
//         let transporter = nodemailer.createTransport({
//             host: 'smtp.mail.ru',
//             port: 465,
//             secure: true,
//             auth: {
//                 user: 'saida27102005@mail.ru',
//                 pass: 'DAGy7SeGz76caQLdzqwr'
//             },
//         });

//         let info = await transporter.sendMail({
//             from: 'saida27102005@mail.ru',
//             to: to,
//             subject: subject,
//             text: text,
//         });

//         console.log('Message sent: %s', info.messageId);
//     } catch (error) {
//         console.error('Error occurred:', error);
//     }
// }

// // Маршрут для страницы входа (GET)
// app.get('/login', (req, res) => {
//     res.render('login');
// });

// // Маршрут для обработки входа (POST)
// app.post('/login', async(req, res) => {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user) {
//         return res.status(400).send('Incorrect username or password');
//     }
//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) {
//         return res.status(400).send('Incorrect username or password');
//     }

//     if (username === 'saida') {
//         return res.redirect('/admin');
//     }

//     res.redirect('/');
// });

// // Маршрут для получения данных о котах
// app.get('/stocks', async(req, res) => {
//     try {
//         const response = await axios.get('https://catfact.ninja/fact');
//         const catFact = response.data.fact;
//         res.render('stocks', { data: catFact });
//     } catch (error) {
//         console.error('Error fetching cat fact:', error);
//         res.status(500).send('Error fetching cat fact');
//     }
// });

// // Маршрут для получения данных о новостях
// app.get('/news', async(req, res) => {
//     try {
//         const response = await axios.get('https://api.ipify.org?format=json');
//         const ipAddress = response.data.ip;
//         res.render('news', { data: ipAddress });
//     } catch (error) {
//         console.error('Error fetching public IP address:', error);
//         res.status(500).send('Error fetching public IP address');
//     }
// });

// // Маршрут для получения данных о шутках
// app.get('/catfacts', async(req, res) => {
//     try {
//         const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
//         const joke = response.data.setup + ' ' + response.data.punchline;
//         res.render('catfacts', { data: joke });
//     } catch (error) {
//         console.error('Error fetching random joke:', error);
//         res.status(500).send('Error fetching random joke');
//     }
// });

// // Маршрут для корневой страницы
// app.get('/', (req, res) => {
//     // Логика для отображения корневой страницы
//     res.render('index'); // Например, отображение страницы портфолио или страницы входа
// });

// // Запуск сервера
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });










































// Подключение необходимых модулей
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const PortfolioItem = require('./models/PortfolioItem');
const { isAdmin } = require('./middleware/authMiddleware');
const nodemailer = require('nodemailer');
const axios = require('axios');
const adminRoutes = require('./routes/adminRoutes');
// Создание экземпляра приложения Express
const app = express();
const port = 3000;

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to MongoDB");
});

// Middleware для отслеживания захода на сайт
app.use((req, res, next) => {
    console.log('User visited the site');
    next();
});

// Middleware для парсинга данных формы
app.use(express.urlencoded({ extended: true }));

// Установка шаблонизатора EJS
app.set('view engine', 'ejs');

// Маршрут для страницы регистрации (GET)
app.get('/register', (req, res) => {
    res.render('register');
});

// Маршрут для обработки регистрации (POST)
app.post('/register', async(req, res) => {
    try {
        const { username, password, email } = req.body;
        const user = new User({ username, password, email });
        await user.save();

        // Отправка приветственного сообщения
        const subject = 'Welcome to Our Website!';
        const text = `Hello, ${username}!\n Welcome to our website!`;
        await sendEmail(email, subject, text);

        res.redirect('/login');
    } catch (error) {
        console.log(error);
        res.send('An error occurred during registration.');
    }
});

// Функция для отправки электронной почты
async function sendEmail(to, subject, text) {
    try {
        let transporter = nodemailer.createTransport({
            host: 'smtp.mail.ru',
            port: 465,
            secure: true,
            auth: {
                user: 'saida27102005@mail.ru',
                pass: 'DAGy7SeGz76caQLdzqwr'
            },
        });

        let info = await transporter.sendMail({
            from: 'saida27102005@mail.ru',
            to: to,
            subject: subject,
            text: text,
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

// Маршрут для страницы входа (GET)
app.get('/login', (req, res) => {
    res.render('login');
});

// Маршрут для обработки входа (POST)
app.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).send('Incorrect username or password');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect username or password');
    }

    if (username === 'saida') {
        //return res.redirect('/admin');
    }

    res.redirect('/');
});

// Маршрут для страницы администратора
app.get('/admin', isAdmin, (req, res) => {
    res.render('admin');
});

// Маршрут для добавления нового элемента портфолио
app.post('/admin/portfolio/add', isAdmin, async(req, res) => {
    // Обработка отправки формы для добавления нового элемента портфолио
});

// Маршрут для редактирования элемента портфолио
app.post('/admin/portfolio/edit/:id', isAdmin, async(req, res) => {
    // Обработка отправки формы для редактирования элемента портфолио
});

// Маршрут для удаления элемента портфолио
app.post('/admin/portfolio/delete/:id', isAdmin, async(req, res) => {
    // Обработка отправки формы для удаления элемента портфолио
});

// Маршрут для получения данных о котах
app.get('/stocks', async(req, res) => {
    try {
        const response = await axios.get('https://catfact.ninja/fact');
        const catFact = response.data.fact;
        res.render('stocks', { data: catFact });
    } catch (error) {
        console.error('Error fetching cat fact:', error);
        res.status(500).send('Error fetching cat fact');
    }
});

// Маршрут для получения данных о новостях
app.get('/news', async(req, res) => {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        const ipAddress = response.data.ip;
        res.render('news', { data: ipAddress });
    } catch (error) {
        console.error('Error fetching public IP address:', error);
        res.status(500).send('Error fetching public IP address');
    }
});

// Маршрут для получения данных о шутках
app.get('/catfacts', async(req, res) => {
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        const joke = response.data.setup + ' ' + response.data.punchline;
        res.render('catfacts', { data: joke });
    } catch (error) {
        console.error('Error fetching random joke:', error);
        res.status(500).send('Error fetching random joke');
    }
});
// Маршрут для корневой страницы
app.get('/', (req, res) => {
    // Логика для отображения корневой страницы
    res.render('index'); // Например, отображение страницы портфолио или страницы входа
});

app.get('/portfolio', (req, res) => {
    // Логика для отображения страницы портфолио
    res.render('portfolio');
});

app.get('/admin', isAdmin, (req, res) => {
    // Логика для отображения страницы администратора
    res.render('admin');
});

app.use('/admin', adminRoutes);

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





// async function sendEmail(to, subject, text) {
//     try {
//         // Create a Nodemailer transporter using SMTP
//         let transporter = nodemailer.createTransport({
//             host: 'smtp.mail.ru', // Your SMTP host
//             port: 465, // Your SMTP port
//             secure: true, // true for 465, false for other ports
//             auth: {
//                 user: 'saida27102005@mail.ru', // Your email address
//                 pass: 'DAGy7SeGz76caQLdzqwr' // Your password
//             },
//         });

//         // Send mail with defined transport object
//         let info = await transporter.sendMail({
//             from: 'saida27102005@mail.ru', // sender address
//             to: to, // list of receivers
//             subject: subject, // Subject line
//             text: text, // plain text body
//         });

//         console.log('Message sent: %s', info.messageId);
//     } catch (error) {
//         console.error('Error occurred:', error);
//     }
// }