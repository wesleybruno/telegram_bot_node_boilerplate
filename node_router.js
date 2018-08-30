const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const port = 8000;

module.exports = function(bot, chatID) {
    app.get('/', (req, res) => {
        bot.sendMessage(chatID, `Olá, bem vindo ao Devs SC!! Conte-nos um pouco sobre você, com o que trabalha e onde, se possivel é claro`)
        res.send('Hello')
      });

      app.listen(port, () => {
        console.log('We are live on ' + port);
      });
};