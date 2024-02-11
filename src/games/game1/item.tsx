import { FC, ReactNode, MouseEvent } from "react"
//import { Link } from "react-router-dom"


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faComputerMouse, 
} from '@fortawesome/free-solid-svg-icons'
import { StyledClickButton } from "@/styled"


interface IClickerProps {
   onClick: () => void | null
}

const Item: FC<IClickerProps> = (props) : ReactNode => {
  const { onClick } = props

  const handleClick = (
  e: MouseEvent<HTMLButtonElement> & { target: HTMLButtonElement },
  ) => {
    e.preventDefault()
    onClick()

  }

  return (        
    <StyledClickButton
      onClick={handleClick}
      >
        <FontAwesomeIcon className="text-warning" size="7x" icon={faComputerMouse} />
    </StyledClickButton>
  )
}

export default Item

