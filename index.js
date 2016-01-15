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

controller.hears(['call me (.*)'],'direct_message,direct_mention,mention',function(bot, message) {
  var matches = message.text.match(/call me (.*)/i);
  var name = matches[1];
  controller.storage.users.get(message.user,function(err, user) {
    if (!user) {
      user = {
        id: message.user,
      };
    }
    user.name = name;
    controller.storage.users.save(user,function(err, id) {
      bot.reply(message,'Got it. I will call you ' + user.name + ' from now on.');
    });
  });
});

controller.hears(['pi'],'direct_message,direct_mention,mention',function(bot, message) {
  controller.storage.users.get(message.user,function(err, user) {
    bot.reply(message,'Bom, o valor de pi é aproximadamente 3,14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912');
  });
});

controller.hears(['roll', '.d'],'direct_message,direct_mention,mention',function(bot, message) {
  controller.storage.users.get(message.user,function(err, user) {
    roll = Math.floor(Math.random() * 15 + 1);
    bot.reply(message, '' + roll + ' out of 15 [' + (roll*100/15).toPrecision(2) + '%].');
  });
});

controller.hears(['hey', 'oi'],'direct_message,direct_mention,mention',function(bot, message) {
  controller.storage.users.get(message.user,function(err, user) {
    bot.reply(message,'oi');
  });
});
