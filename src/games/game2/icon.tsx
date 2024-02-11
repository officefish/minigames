import { FC, ReactNode } from "react"
//import { Link } from "react-router-dom"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faExclamation, 
    faFaceSmile,
    faFaceMeh,
    faLightbulb,

} from '@fortawesome/free-solid-svg-icons'

interface IIcon {
    mode: string
}

const Icon: FC<IIcon> = (props) : ReactNode => {
  const { mode } = props
  return (        
    <div className="text-base-content/50">
        <>
          {mode === 'success'.toUpperCase() && <FontAwesomeIcon size="3x" icon={faFaceSmile} />}
          {mode === 'error'.toUpperCase() && <FontAwesomeIcon size="3x" icon={faFaceMeh} />}
          {mode === 'wait'.toUpperCase() && <FontAwesomeIcon size="3x" icon={faExclamation} />}
          {mode === 'on'.toUpperCase() && <FontAwesomeIcon size="3x" icon={faLightbulb} />}
        </>
    </div>
  )
}

export default Icon

