import { FC, ReactNode, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { StyledScreen } from "./styled"
import { useNameValidator } from "./validator"
import NewNameDialog from "./name.dialog"
//import { useNameStore } from "./provider"


interface IHome {
    username: string
    setUsername: (name: string) => void
}

const Home: FC<IHome> = (props) : ReactNode => {

  const [isNameDialogOpen, setIsNameDialogOpen] = useState(false)  

  const {errors, register, handleSubmit } = useNameValidator() 

  const { username, setUsername } = props //useState('')
  //const { username, setUsername } = useNameStore()

  useEffect(() => {
    if (!username || !username.length) {
        setIsNameDialogOpen(true)
    } else {
        setIsNameDialogOpen(false)
    }
  }, [username])

  const submitHandler = (data:any) => {
    setUsername(data.name)
  }  


  return (
      <StyledScreen>
        <ul className="card w-96 bg-base-100 shadow-xl p-4 flex items-center justify-center">
          <li className="p-2">
            <Link className="btn btn-secondary" to="/game1">Game 1</Link>
          </li>
          <li className="p-2">
            <Link className="btn btn-secondary" to="/game2">Game 2</Link>
          </li>
          <li className="p-2">
            <Link className="btn btn-secondary" to="/game3">Game 3</Link>
          </li>
        </ul>
        {/* <button className='btn btn-primary'>Hello world</button> */}
        <NewNameDialog
        errors={errors}
        handleSubmit={handleSubmit}
        register={register}
        isOpen={isNameDialogOpen}
        setIsOpen={setIsNameDialogOpen}
        submitHandler={submitHandler}
      />
      </StyledScreen>
  )
}

export default Home

