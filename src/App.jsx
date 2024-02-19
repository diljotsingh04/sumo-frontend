import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [finalData, setFinalData] = useState({});
  const [result, setResult] = useState({});

  // debouncing
  let setTime;
  useEffect(()=>{
    clearTimeout(setTime);
    if(a.length > 0 && b.length > 0){
      setTime = setTimeout(() => {
        setFinalData({
          a, b
        })
      }, 500);
    }
    return () => clearTimeout(setTime);
  }, [a, b])

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://sumo-backend.onrender.com/sum",
          {
            a: parseInt(a),
            b: parseInt(b)
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        console.log('fetch request called');
        setResult(response.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [finalData]);

  return (
    <>
      Enter the value of A <input type="text" onChange={(e)=>setA(e.target.value)} value={a} placeholder='Enter the value of a'/><br/>
      Enter the value of B <input type="text" onChange={(e)=>setB(e.target.value)} value={b} placeholder='Enter the value of b'/>
      <h4>The result is:- {result.message}</h4>
      <h4>The result is:- {result.result}</h4>
    </>
  )
}

export default App