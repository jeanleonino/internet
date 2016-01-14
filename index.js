var Botkit = require('botkit');
var controller = Botkit.slackbot();
var bot = controller.spawn({
    token: 'xoxb-18542343603-Tv3KeJ9LEGfNYMMImK7lQVDI'
});

bot.startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error('Could not connect to Slack');
  }
});

controller.hears(['hello','hi'],'direct_message,direct_mention,mention',function(bot, message) {
  bot.api.reactions.add({
    timestamp: message.ts,
    channel: message.channel,
    name: 'robot_face',
  },function(err, res) {
    if (err) {
      bot.botkit.log('Failed to add emoji reaction :(',err);
    }
  });

  controller.storage.users.get(message.user,function(err, user) {
    if (user && user.name) {
      bot.reply(message,'Hello ' + user.name + '!!');
    } else {
      bot.reply(message,'Hello.');
    }
  });
});
