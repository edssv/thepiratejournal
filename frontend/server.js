const express = require('express');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

require('dotenv').config();

const app = express();

app.use(compression());

app.use(express.static('build'));

const pathToIndex = path.join(__dirname, 'build', 'index.html');

const getUser = async (username) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/users/${username}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    });

    if (res.ok) {
        const data = await res.json();

        return data;
    }
};

const getArticle = async (articleId) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/articles/${articleId}`, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        },
    });

    if (res.ok) {
        const data = await res.json();

        return data;
    }
};

app.get('/@:username', function (req, res) {
    fs.readFile(pathToIndex, 'utf8', async (err, htmlData) => {
        const username = req.params.username;
        const user = getUser(username);

        // inject meta tags
        htmlData = htmlData
            .replace('<title>The Pirate Journal</title>', `<title>${username} - The Pirate Journal</title>`)
            .replace('__META_OG_TITLE__', `${username} - The Pirate Journal`)
            .replace('__META_TWITTER_TITLE__', `${username} - The Pirate Journal`)
            .replace('__META_DESCRIPTION__', ``)
            .replace('__META_OG_DESCRIPTION__', '')
            .replace('__META_TWITTER_DESCRIPTION__', '')
            .replace('__META_OG_IMAGE__', `${user.avatar}`)
            .replace('__META_TWITTER_IMAGE__', `${user.avatar}`)
            .replace('__META_OG_TYPE__', 'website')
            .replace('__META_OG_URL__', `https://thepirate.press/@${username}`)
            .replace('__META_TWITTER_URL__', `https://thepirate.press/@${username}`);

        res.send(htmlData);
    });
});

app.get('/articles/:id', function (req, res) {
    fs.readFile(pathToIndex, 'utf8', async (err, htmlData) => {
        const articleId = req.params.id;
        const article = await getArticle(articleId);

        // inject meta tags
        htmlData = htmlData
            .replace('<title>The Pirate Journal</title>', `<title>${article.title} - The Pirate Journal</title>`)
            .replace('__META_OG_TITLE__', `${article.title} - The Pirate Journal`)
            .replace('__META_TWITTER_TITLE__', `${article.title} - The Pirate Journal`)
            .replace('__META_DESCRIPTION__', article.description)
            .replace('__META_OG_DESCRIPTION__', article.description)
            .replace('__META_TWITTER_DESCRIPTION__', article.description)
            .replace('__META_OG_IMAGE__', `${article.cover}`)
            .replace('__META_TWITTER_IMAGE__', `${article.cover}`)
            .replace('__META_OG_TYPE__', 'article')
            .replace('__META_OG_URL__', `https://thepirate.press/articles/${article.id}`)
            .replace('__META_TWITTER_URL__', `https://thepirate.press/articles/${article.id}`);

        res.send(htmlData);
    });
});

app.get('/', function (req, res) {
    fs.readFile(pathToIndex, 'utf8', async (err, htmlData) => {
        // inject meta tags
        htmlData = htmlData
            .replace('__META_OG_TITLE__', 'Самые свежие игровые статьи')
            .replace('__META_TWITTER_TITLE__', 'Самые свежие игровые статьи')
            .replace(
                '__META_DESCRIPTION__',
                'The Pirate Journal — сайт, где ты можешь найти самые свежие и интересные игровые статьи.'
            )
            .replace('__META_OG_DESCRIPTION__', 'Самые свежие и интересные игровые статьи.')
            .replace('__META_TWITTER_DESCRIPTION__', 'Самые свежие и интересные игровые статьи.')
            .replace('__META_OG_IMAGE__', 'https://thepirate.press/static/media/logotype.25b315577d9cfc394f4b.png')
            .replace('__META_TWITTER_IMAGE__', 'https://thepirate.press/static/media/logotype.25b315577d9cfc394f4b.png')
            .replace('__META_OG_TYPE__', 'website')
            .replace('__META_OG_URL__', 'https://thepirate.press')
            .replace('__META_TWITTER_URL__', 'https://thepirate.press');

        res.send(htmlData);
    });
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 3000, () => console.log(`Server started on PORT = ${process.env.PORT || 3000}`));
