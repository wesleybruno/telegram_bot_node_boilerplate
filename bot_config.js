
module.exports = function(token){

    const TelegramBot = require( `node-telegram-bot-api` )
    const http = require( `axios` )
    const cheerio = require( `cheerio` )

    const bot = new TelegramBot( token, { polling: true } )
    const URL_BASE = `https://www.google.com.br/search?q=`

    const log = ( msg ) => ( result ) =>   console.log( msg, result ) 

    const getURLFrom = ( elem, $ ) => $( elem ).attr( `href` ).replace( `/url?q=`, `` ).replace( /\&sa(.*)/, `` )

    const sendLinkFromGoogle = ( $, msg ) => ( i, a ) =>
    ( !i ) 
        ? bot.sendMessage( msg.chat.id, getURLFrom( a, $ ), { parse_mode: 'Markdown' } )
            .then( log( `${getURLFrom( a, $ )} delivered!` ) )
            .catch( log( `Error: ` ) )
        : false

    const sendLink = ( msg ) => ( response ) => {
    const $ = cheerio.load( response.data )
    return $( `.r a` ).each( sendLinkFromGoogle( $, msg ) )
    }

    const sendGoogle = ( msg, match ) => http.get( `${URL_BASE}${match[ 1 ]}` ).then( sendLink( msg ) ).catch( log( `Error: `) )

    bot.onText( /\/google (.*)/, sendGoogle )

    bot.on('new_chat_members', (msg) => {
        bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name}, bem vindo ao Devs SC!! Conte-nos um pouco sobre você, com o que trabalha e onde, se possivel é claro`)
    })

    bot.on('message', (msg) => {
        console.log(msg.chat.id);
        bot.sendMessage(msg.chat.id, `Olá ${msg.from.first_name}, bem vindo ao Devs SC!! Conte-nos um pouco sobre você, com o que trabalha e onde, se possivel é claro`)
    })

    return bot;
}