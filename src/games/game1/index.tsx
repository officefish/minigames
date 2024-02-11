import { FC, ReactNode, useState, useEffect } from "react"
import Item from "./item"
import { useNavigate } from "react-router-dom"
import FinalDialog from "./dialog/final"
import RulesDialog from "./dialog/rules"
import { IGame } from "@/types"
//import { Link } from "react-router-dom"


const Game1: FC<IGame> = (props) : ReactNode => {

   const { username } = props

  const handleClick = () => {
    if(isRunning) {
        setCount(count + 1)
    }
  }

  const [isRunning, setIsRunning] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  
  const [isRulesOpen, setIsRulesOpen] = useState(true)
  const [isFinalOpen, setIsFinalOpen] = useState(false)
  const [count, setCount] = useState(0)

  const [newGame, setNewGame] = useState(false)

  useEffect(()=> {

    if (newGame) {
      setNewGame(false)
      setIsRunning(true)
      setCurrentTime(0)
      setCount(0)
    }

    if(currentTime >= 3000) {
        setIsRunning(false)
        setIsFinalOpen(true)
    } 

    let intervalId: number | undefined
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setCurrentTime(currentTime + 1), 10)
    }
    return () => clearInterval(intervalId)

  }, [isRunning, currentTime, newGame])

   const time = 3000 - currentTime
   // Hours calculation
   const hours = Math.floor(time / 360000)
   // Minutes calculation
   const minutes = Math.floor((time % 360000) / 6000)
   // Seconds calculation
   const seconds = Math.floor((time % 6000) / 100)
   // Milliseconds calculation
   const milliseconds = time % 100

   const onStartGame = () => {
    console.log("onStartGame")
    setCurrentTime(0)
    setNewGame(true)
  }
  const navigate = useNavigate()
  const onBackMenu = () => {
    return navigate("/")
  }

  return (
      <div className='flex w-screen h-screen items-center justify-center flex-col gap-4'>
        <div className="bg-primary rounded-md font-bold text-success uppercase text-xl">
            <p className="w-56 text-center">
          {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
          {milliseconds.toString().padStart(2, "0")}
        </p>
        </div>
        <h1 className="text-5xl text-primary font-black">{count}</h1>
       <Item onClick={handleClick} />
       <RulesDialog 
        isOpen={isRulesOpen} 
        setIsOpen={setIsRulesOpen} 
        onStartGame={onStartGame} 
        onBackMenu={onBackMenu} />
       <FinalDialog 
         isOpen={isFinalOpen} 
         setIsOpen={setIsFinalOpen} 
         onReStartGame={onStartGame} 
         onBackMenu={onBackMenu}
         score={count}
         username={username}
         />
      </div>
  )
}

export default Game1

