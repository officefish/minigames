import Grid from "@/components/grid"
import { StyledScreen } from "@/styled"
import { IGame, LampMode } from "@/types"
import { FC, ReactNode, useState, useEffect, useRef } from "react"
import Item from "./item"
import { useNavigate } from "react-router-dom"
import RulesDialog from "./dialog/rules"
import FinalDialog from "./dialog/final"
//import { Link } from "react-router-dom"

interface Items {
  index: number
}

const ITEMS_PATTERN = Array.from({ length: 16 }, (_, i) => ({ index: i }))
const shuffleItems = (items:Items[]) => {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items
  }

const Game2: FC<IGame> = (props) : ReactNode => {

  const {username} = props  
 
  const [newGame, setNewGame] = useState(false)
  const [items, setItems] = useState<Items[]>()
  const [currentIndex, setCurrentIndex] = useState(-1)
  //const [endGame, setEndGame] = useState(false)
  const [isRulesOpen, setIsRulesOpen] = useState(true)
  const [isFinalOpen, setIsFinalOpen] = useState(false)

  const [successClickCount, setSuccessClickCount] = useState(0)

  useEffect(()=> {

    let timer: number | undefined

    if (newGame) {
        setNewGame(false)
  
        const shuffled = shuffleItems(JSON.parse(JSON.stringify(ITEMS_PATTERN)))
        setItems([...shuffled])
  
        timer = setInterval(() => {
          const last = shuffled.pop()
          if (!last) {
            console.log("Игра завершена!")
            //setEndGame(true)
            clearInterval(timer)
            setIsFinalOpen(true)
          } else {
            const lastIndex = last.index
            setCurrentIndex(lastIndex)
            console.log('Показывается индекс: ' + lastIndex);
          }
        }, getRandomTime())
      }
      //return () => clearInterval(timer)
    }, [newGame])

  const handleSuccessClick = () => {
    setSuccessClickCount(successClickCount + 1)
  } 

  const onStartGame = () => {
    setItems([])
    setSuccessClickCount(0)
    setNewGame(true)
  }

  const navigate = useNavigate()
  const onBackMenu = () => {
    console.log("onBackMenu")
    return navigate("/")
  }


  return (
    <StyledScreen>
    <div className="bg-primary rounded-md font-bold text-success uppercase text-xl">
        <p className="w-56 text-center">
      {successClickCount} / {items?.length}
    </p>
    </div>
    <Grid>
      
     {items && items.map( (item, index) => (
       <Item key={index} mode={LampMode.wait} active={currentIndex === index} successClick={handleSuccessClick}/>
     ))}
    </Grid>
    <RulesDialog 
    isOpen={isRulesOpen} 
    setIsOpen={setIsRulesOpen} 
    onStartGame={onStartGame} 
    onBackMenu={onBackMenu} />
    <FinalDialog 
    username={username}
     isOpen={isFinalOpen} 
     setIsOpen={setIsFinalOpen} 
     onReStartGame={onStartGame} 
     onBackMenu={onBackMenu}
     score={`${successClickCount} / ${items?.length}`}
     />
  </StyledScreen>
  )
}

function getRandomTime(): number {
  return Math.floor(Math.random() * (7000 - 4000 + 1)) + 4000;
}

export default Game2

