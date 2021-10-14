const generateRandomKey = () => {
    return (Math.random() + 1).toString(36).substring(4)
}

module.exports = generateRandomKey