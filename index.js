const CONFIG = require('./config');
const BOT = require('./bot_config')(CONFIG.TELEGRAM_TOKEN);

require('./node_router')(BOT, CONFIG.TELEGRAM_CHAT_ID);



