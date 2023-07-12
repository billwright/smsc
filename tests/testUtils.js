let latestRandom;
function generateNewRandom() {
    latestRandom = Math.floor(Math.random() * 10000);
    return latestRandom;
}

module.exports = generateNewRandom;