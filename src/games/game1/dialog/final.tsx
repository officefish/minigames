import useGlobalOverflowHidden from '@/hooks/force-overflow'
import { FC, useRef, MouseEvent, useEffect } from 'react'

interface DialogProps {
  username: string
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  score: number
  onBackMenu: () => void
  onReStartGame: () => void
}

const FinalDialog: FC<DialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
    onReStartGame,
    onBackMenu,
    score,
    username,
  } = props

  /* body overflow: hidden style controller */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setIsOverflowHidden } = useGlobalOverflowHidden()
  const onDialogClose = () => setIsOverflowHidden(false)

  const handleStartGame = (e: MouseEvent<HTMLButtonElement>) => {
     e.preventDefault()
     setIsOpen(false)
     onReStartGame()
  }

  const handleBackMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsOpen(false)
    onBackMenu()
  }

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  return (
    <dialog ref={modalRef} onClose={onDialogClose} className='modal'>
      <div className="card w-[30%] bg-base-100 shadow-xl">
        <div className="card-body w-full flex justify-center items-center">
          <h2 className="card-title w-full flex justify-center">{`Congratulations, ${username}!`}</h2>
          <p>Your current time is:</p>
          <h1 className='font-bold text-3xl'>{score}</h1>
          <div className="card-actions justify-between pt-8">
            <button className="btn btn-primary" onClick={handleBackMenu}>Back to menu</button>
            <button className="btn btn-primary" onClick={handleStartGame}>Start game</button>
          </div>
        </div>
      </div>
     
    </dialog>
  )
}
export default FinalDialog