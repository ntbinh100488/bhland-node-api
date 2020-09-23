
let runningJobs = [];

const triggerEveryMinute = () => {
    console.log('called waitingTimeExceptionHandling at ' + JSON.stringify(new Date()));
}

const createAndStartJob = (options) => {
    const {onTickFn, crontab} = options;
    var CronJob = require('cron').CronJob;
    return new CronJob(crontab, onTickFn, null, true, 'Asia/Ho_Chi_Minh');
  }

const startJobs = () => {
    console.log('startJobs');
    const jobs = [{ onTickFn: triggerEveryMinute, crontab: '* * * * * *' }];
    // const wrappedJobs = jobs.map(
    // ({ onTickFn, crontab }) => ({ onTickFn: onTickFn, crontab })
    // );

    // then start them
    runningJobs = jobs.map(createAndStartJob);
};

/**
 * For testing, so we can load app and stop jobs
 */
const stopAll = () => {
  runningJobs.forEach(job => job.stop())
}

const startAll = () => {
    runningJobs.forEach(job => job.start())
}

const setTimeAll = (cronTime) => {
    runningJobs.forEach(job => job.setTime(cronTime))
}

module.exports = {
  stopAll,
  startAll,
  startJobs,
  setTimeAll
}