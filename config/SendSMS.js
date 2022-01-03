const credentials = {
    apiKey: '289de7f70ef417944098c4f80a96b3d24e5c1696b5a3c829411eb23da0deaa4d', 
    username: 'inthing'
};

const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;

const sendMessage = async (phonenumber, message) => {

    try {
         const response = await sms.send({ 
             "to": phonenumber, 
             "message": message, 
              enque: true 
        })

    } catch(err) {
        console.error(err.message)
    }
}

export default sendMessage;