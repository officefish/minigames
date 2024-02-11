import { FC, ReactNode } from "react"
//import { Link } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faSun, 
    faGear, 
    faPen,
    faMarker,
    faShield,
    faPalette,
    faMoon,
    faTrash,
} from '@fortawesome/free-solid-svg-icons'

interface IIcon {
    pair: number | undefined
    active: boolean
}

const Icon: FC<IIcon> = (props) : ReactNode => {
  const { pair, active } = props
  return (        
    <div className="text-success">
     { active && (
        <>
          {pair === 0 && <FontAwesomeIcon size="3x" icon={faSun} />}
          {pair === 1 && <FontAwesomeIcon size="3x" icon={faPen} />}
          {pair === 2 && <FontAwesomeIcon size="3x" icon={faGear} />}
          {pair === 3 && <FontAwesomeIcon size="3x" icon={faMarker} />}
          {pair === 4 && <FontAwesomeIcon size="3x" icon={faShield} />}
          {pair === 5 && <FontAwesomeIcon size="3x" icon={faPalette} />}
          {pair === 6 && <FontAwesomeIcon size="3x" icon={faMoon} />}
          {pair === 7 && <FontAwesomeIcon size="3x" icon={faTrash} />}
        </>
     )}   
   
    </div>
  )
}

export default Icon

