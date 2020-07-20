// Cron is a tool that allows you to execute something on a schedule.

var CronJob = require('cron').CronJob;
const fetchGithub = require('./tasks/fetch-github')

// fetch github Jobs
new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');


