import { FC, ReactNode, useState, useEffect } from "react"
import { StyledScreen } from "../../styled"
//import { Link } from "react-router-dom"
import Item from "./item"
import Grid from "../../components/grid"
import { IGame, IItem } from "../../types"
import RulesDialog from "./dialog/rules"

import { useNavigate } from "react-router-dom"
import FinalDialog from "./dialog/final"

const ITEMS_PATTERN = Array.from({ length: 16 }, (_, i) => ({ pair: Math.floor(i / 2) }))
const NO_GUESSED = Array.from({ length: 16 }, () => (false))

const shuffleItems = (items: IItem[]) :IItem[] => {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items
  }

const Game3: FC<IGame> = (props) : ReactNode => {
   const {username} = props 
  // state to store time
  const [time, setTime] = useState(0)
  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false)

  const [isRulesOpen, setIsRulesOpen] = useState(true)
  const [isFinalOpen, setIsFinalOpen] = useState(false)

  const navigate = useNavigate()

  

  const [items, setItems] = useState<IItem[]>([]) 
  const [guessed, setGuessed] = useState<boolean[]>([])

  const [pair, setPair] = useState(-1)
  const [newGame, setNewGame] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  
  const handleClick = (newIndex: number, newPair:number) => {
    
    if (pair == -1) {
        setPair(newPair)
        setActiveIndex(newIndex)
        return
    }

    setPair(-1)
    setActiveIndex(-1)

    if(pair != newPair) {
       return
    }

    if (activeIndex === newIndex) {
        return
    }

    guessed[activeIndex] = true
    guessed[newIndex] = true

    const continueGame = guessed.includes(false)
    if (!continueGame) {
        console.log('endGame')
        setIsRunning(false)
        setIsFinalOpen(true)
    }
    //console.log('pairs are equal')
  }

  useEffect(()=> {
    if(newGame) {
        setNewGame(false)
        const shuffled = shuffleItems(ITEMS_PATTERN)  
        setItems(shuffled)
        setGuessed([...NO_GUESSED])
        setIsRunning(true)
        setTime(0)
    }

    let intervalId: number | undefined
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId)

  }, [setItems, newGame, setNewGame, isRunning, time])


  // Hours calculation
  const hours = Math.floor(time / 360000);
  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);
  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);
  // Milliseconds calculation
  const milliseconds = time % 100;

  const onStartGame = () => {
    //console.log("onStartGame")
    setNewGame(true)
  }

  const onBackMenu = () => {
    console.log("onBackMenu")
    return navigate("/")
  }

  return (
      <StyledScreen>
        <div className="bg-primary rounded-md font-bold text-success uppercase text-xl">
            <p className="w-56 text-center">
          {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
          {milliseconds.toString().padStart(2, "0")}
        </p>
        </div>
        <Grid>
         {items && items.map( (item, index) => (
            <Item 
            key={index} 
            index={index} 
            pair={item.pair} 
            onClick={handleClick}
            active={index === activeIndex}
            block={guessed[index]}
            />
         ))}
        </Grid>
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
         time={time}
         username={username}
         />
      </StyledScreen>
  )
}

export default Game3

