import { FC, ReactNode, MouseEvent, useState } from "react"
import { IItem } from "../../types"
import Icon from "./icon"
import { StyledActiveModeButton } from "@/styled"
//import { Link } from "react-router-dom"

interface ItemProps extends IItem {
   onClick: (index: number, pair: number) => void | null
   active: boolean
   block: boolean
}

const Item: FC<ItemProps> = (props) : ReactNode => {
  const { index, pair, active, block, onClick } = props
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseDown = (
    e: MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement },
  ) => {
    e.preventDefault()
    if (block) return
    setIsVisible(true)
  }

//   const handleMouseUp = (
//     e: MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement },
//   ) => {
//     e.preventDefault()
//     if (block) return
//     setIsVisible(false)
//   }


  const handleClick = (
  e: MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement },
  ) => {
    e.preventDefault()
    if (block) return
    setIsVisible(false)
    onClick(index || 0, pair)

  }


  return (        
    <StyledActiveModeButton 
      disabled={block} 
      $active={active} 
      onMouseDown={handleMouseDown}
      //onMouseUp={handleMouseUp}
      onClick={handleClick}
      >
        <Icon pair={pair} active={active || isVisible || block}/>
    </StyledActiveModeButton>
  )
}

export default Item

