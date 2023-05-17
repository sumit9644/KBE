import "./app.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./components/Start";
import Timer from "./components/Timer";
import Trivia from "./components/Trivia";
import axios from 'axios'
// import { data } from "./data";

function App() {
  const [data,setData]=useState([]);
  const [apidata,setapiData]=useState([]);
  const [username, setUsername] = useState(null);
  useEffect(()=>{
    const getData=async()=>{
      try{
     const res=await axios.get('https://opentdb.com/api.php?amount=15');
     console.log(res.data.results);
      let arr=[];
      setapiData(res.data.results);
      // console.log(apidata);
      arr=apidata.map((ele,idx)=>{
        let obj={};
        obj.id=idx;
        obj.question=ele.question;
        let answers=[];
        answers=ele.incorrect_answers.map((d,i)=>{
          let o1={};
          o1.text=d;
          o1.correct=false;
          return o1;
        });
        answers.push({"text":ele.correct_answer,"correct":true});
        answers.sort(() => Math.random() - 0.5);
        obj.answers=answers;
        return obj;
      })
      setData(arr);
      console.log(data);
      }catch(err){
        console.log(err);
      }
    }
   if(!username && data.length===0){
     getData();
   } 
    
  })
  const [stop, setstop] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("$ 0");


  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "5 Points" },
        { id: 2, amount: "10 Points" },
        { id: 3, amount: "20 Points" },
        { id: 4, amount: "30 Points" },
        { id: 5, amount: "50 Points" },
        { id: 6, amount: "60 Points" },
        { id: 7, amount: "75 Points" },
        { id: 8, amount: "100 Points" },
        { id: 9, amount: "150 Points" },
        { id: 10, amount: "200 Points" },
        { id: 11, amount: "250 Points" },
        { id: 12, amount: "300 Points" },
        { id: 13, amount: "350 Points" },
        { id: 14, amount: "400 Points" },
        { id: 15, amount: "500 Points" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {username ? (
        <>
                  <div className="main">
            {stop ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setstop={setstop}
                      questionNumber={questionNumber}
                      key={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setstop={setstop}
                    key={questionNumber}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ):<Start setUsername={setUsername}/>}
        
    </div>
  );
}

export default App;