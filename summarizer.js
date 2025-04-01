
const createSummarizer = () => {
    const CloudmersiveNlpApiClient = require("cloudmersive-validate-api-client")
    const defaultClient = CloudmersiveNlpApiClient.ApiClient.instance;
    const Apikey = defaultClient.authentications['Apikey'];

    const methods = {
        build : function (confKey) {
            Apikey.apiKey = confKey;
        },
        summarize : function (text) {
            const apiInstance = new CloudmersiveNlpApiClient.RephraseApi();
            const input = new CloudmersiveNlpApiClient.RephraseRequest(text); // RephraseRequest | Input rephrase request
            const callback = function(error, data, response) {
                if (error) {
                    console.error(error);
                } else {
                    console.log('API called successfully. Returned data: ' + data);
                }
            };
            console.log(apiInstance.rephraseTranslateDeuToEng(input, callback));

        }
    }
    return methods
}

module.exports = { createSummarizer }






