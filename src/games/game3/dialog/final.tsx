import useGlobalOverflowHidden from '@/hooks/force-overflow'
import { FC, useRef, MouseEvent, useEffect } from 'react'

interface DialogProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
  time: number
  onBackMenu: () => void
  onReStartGame: () => void
  username: string
}

const FinalDialog: FC<DialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    setIsOpen,
    isOpen,
    onReStartGame,
    onBackMenu,
    time,
    username,
  } = props

  const hours = Math.floor(time / 360000);
  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);
  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);
  // Milliseconds calculation
  const milliseconds = time % 100;

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
          <h1 className='font-bold text-3xl'> 
          {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
          {milliseconds.toString().padStart(2, "0")}</h1>
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