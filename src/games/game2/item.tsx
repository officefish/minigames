import { FC, ReactNode, useState, useEffect, MouseEvent } from "react"

import { StyledLampModeButton } from "@/styled"
import Icon from "./icon"
import { LampMode } from "@/types"
//import { Link } from "react-router-dom"

interface ItemProps {
  mode: string
  active: boolean
  successClick: () => void
}

const Item: FC<ItemProps> = (props) : ReactNode => {
   const { mode, active, successClick } = props

   const [currentMode, setCurrentMode] = useState(mode)
   const [lucky, setLucky] = useState(false) 
   const [clickNow, setClickNow] = useState(false)

   const [startTimer, setStartTimer] = useState(false)

   const [successClicked, setSuccessClicked] = useState(false)

   useEffect(() => {

    if (active) {
        if (startTimer) return
        setStartTimer(true)
        
        setCurrentMode(LampMode.on)
        setClickNow(true)

        const timer = setInterval(() =>{
            if (lucky) return
            
            setClickNow(false)
            setCurrentMode(LampMode.error)
        }, 1000)

        return () => clearInterval(timer)
    }
   }, [active, lucky, setClickNow, setCurrentMode])


  const handleClick = (
  e: MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement },
  ) => {
    e.preventDefault()
    if(successClicked) {
        return
    }

    if(clickNow) {
        setLucky(true)
        setCurrentMode(LampMode.success)        
        successClick()
        setSuccessClicked(true)
    }
  }


  return (        
    <StyledLampModeButton 
      $mode={currentMode} 
      onClick={handleClick}
      >
        <Icon mode={currentMode} />
    </StyledLampModeButton>
  )
}

export default Item


