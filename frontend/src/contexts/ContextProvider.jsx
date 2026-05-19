import { useState } from "react"
import { CounterContextObj } from "./counterContext"

function ContextProvider({children}) {

    //state
    const [counter,setCounter]=useState(10);
    const [counter1,setCounter1]=useState(20);
    //functions to change state
    const changeCounter=()=>{
        setCounter(counter+1);
    }
    const changeCounter1=()=>{
        setCounter1(counter1+1);
    }
  return (
    <CounterContextObj.Provider value={{counter,counter1,changeCounter,changeCounter1}}>
{children}

        </CounterContextObj.Provider>
  )
}

export default ContextProvider