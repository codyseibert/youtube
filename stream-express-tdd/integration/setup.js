const sleep = time =>
  new Promise(resolve => setTimeout(resolve, time));

module.exports = async function() {
  await sleep(1000);
};
