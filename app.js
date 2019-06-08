const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.get('/sum', (req, res) => {
    let firstNum = req.query.a;
    let secondNum = req.query.b;
    let result = Number(firstNum) + Number(secondNum);
    console.log(`Sum is ${result}`);
    res.send(`The Sum of ${firstNum} and ${secondNum} is ${result}`);
  });

  app.get('/cipher',(req,res)=>{
let textVal = req.query.text;
let shiftVal = Number(req.query.shift);
let resultArr = [];
for(let i=0;i<textVal.length;i++)
{
   let letterCode =  textVal.charCodeAt(i);
   if((letterCode + shiftVal) > 90 )
   {
       let codeData = letterCode + shiftVal - 26;
       resultArr.push(String.fromCharCode(codeData));

   }
   else
   {
       let codeData = letterCode + shiftVal;
       resultArr.push(String.fromCharCode(codeData));
   }
}

 res.send(`Result is ${resultArr.join('')}`);
  });


  app.get('/lotto',(req,res)=>{
    let winnNumArr = [];
    let numbers = req.query.arr;
    console.log(`User Numbers : ${numbers}`);
    let nbrCorrect = 0;
    //generate 6 random numbers between 1 and 20
    for(let i = 0 ; i<6;i++)
    {
        let randNum =  Math.floor((Math.random()*20) +1);
        winnNumArr.push(randNum);
    }
    console.log(`Winning Number List Is : ${winnNumArr}`);
    for(let i = 0; i<6; i++)
    {
        let numbrCheck = Number(numbers[i]);
        let winnNumBrIncludes = winnNumArr.includes(numbrCheck);
        if(winnNumBrIncludes)
        {
          nbrCorrect++;
        }

    }
    if(nbrCorrect < 4)
    {
      res.send(`Sorry, you lose`);
    }
    else if(nbrCorrect===4)
    {
      res.send(`Congratulations, you win a free ticket`);
    }
    else if(nbrCorrect===5)
    {
      res.send(`Congratulations! You win $100!`);
    }
    else if(nbrCorrect===6)
    {
      res.send(`Wow! Unbelievable! You could have won the mega millions!`);
    }
    
   
      
  });

  app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
  });