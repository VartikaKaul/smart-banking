
const {get} = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000, () => console.log('Webhook server is listening, port 3000'));

exports.callingFunction = async (req, res) => {
 
  console.log("Request Body"+ req.body.responseId);

  const actionName = req.body.queryResult.action;

    try {
    
    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
   
    
   if(actionName === "account.balance.check") {
     res.status(200).send(JSON.stringify({
  "fulfillmentText": "Your Balance is 50,000 USD"
      }))
     }  
    else if(actionName === "beneficiary.transfer") {
        const beneficiaryName = req.body.queryResult.parameters.givenName;
        const amount = req.body.queryResult.parameters.unitCurrency.amount;
      if(beneficiaryName === "Akash"|| beneficiaryName === "Balaji" || beneficiaryName === "Anju"){

 res.status(200).send(JSON.stringify({
  "fulfillmentText": amount + " USD transferred to " + beneficiaryName
      }))
      }
      else{
         res.status(200).send(JSON.stringify({
  "fulfillmentText": beneficiaryName + " is not listed as a beneficiary"
      }))
      }
    
     }  
 

 console.log("fulfilment sent") ;
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred! See logs for more details.');
  }
};
