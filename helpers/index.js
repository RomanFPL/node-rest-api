const Joi = require("joi");

const convertToSummaryData = (valueList) => {
    return [...new Set(valueList.map(row => row.category))]
    .map(unique => {
        const uniqueData = {
            name: unique,
            act: valueList.reduce((acc, val) => {return val.category === unique && val.status === 1 ? ++acc : acc},0),
            arc: valueList.reduce((acc, val) => {return val.category === unique && val.status === 0 ? ++acc : acc},0),
        }
        return uniqueData;
    })
}

const generateRandomKey = () => {
    return (Math.random() + 1).toString(36).substring(4)
}

const schemaPostRequest = {
    name: Joi.string().min(3).required(),
    date: Joi.string().required(),
    category: Joi.string().min(3).max(25).required(),
    content: Joi.string().min(3).required(),
    dates: Joi.string().empty(""),
    status: Joi.number().required()
  };

module.exports = {
    getStats: convertToSummaryData,
    generateKey: generateRandomKey,
    postScheme: schemaPostRequest
}