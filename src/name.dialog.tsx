import { FC, useRef, useEffect, useState, ChangeEvent } from 'react'


import {
    FieldErrors,
    FieldValues,
    SubmitHandler,
    UseFormRegister,
    UseFormHandleSubmit,
  } from 'react-hook-form'
import useGlobalOverflowHidden from './hooks/force-overflow'
  export interface FormProps {
    handleSubmit: UseFormHandleSubmit<FieldValues>
    submitHandler: SubmitHandler<FieldValues>
    register: UseFormRegister<FieldValues>
    errors: FieldErrors<FieldValues>
  }
  

interface DialogProps extends FormProps {
  isOpen: boolean
  setIsOpen: (status: boolean) => void
}

const NewNameDialog: FC<DialogProps> = (props) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const {
    submitHandler,
    register,
    errors,
    handleSubmit,
    isOpen,
  } = props

  /* body overflow: hidden style controller */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { setIsOverflowHidden } = useGlobalOverflowHidden()
  const onDialogClose = () => setIsOverflowHidden(false)

  useEffect(() => {
    if (!modalRef) return
    if (!modalRef.current) return
    const modal = modalRef.current
    isOpen ? modal.showModal() : modal.close()
  })

  const [fieldValue, setFieldValue] = useState('')
  const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
    setFieldValue(e.target.value)
  }

  return (
    <dialog className='modal' ref={modalRef} onClose={onDialogClose}>
      
     <form onSubmit={handleSubmit(submitHandler)}>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body w-full flex justify-center items-center">
            <h2 className="card-title w-full flex justify-center">Input your name</h2>
            {/* <FormField title="Name" register={register} errors={errors} /> */}
            <div>
                <input
                    {...register('name')}
                    type="text"
                    id='name'
                    value={fieldValue}
                    onChange={handleChange}
                    placeholder={`your name`}
                    className={`
                        ${errors['name'] && 'invalid '}
                        input input-secondary input-bordered w-full max-w-xs mt-4 p-4` }
                />
                 {errors['tag']?.message && (
                    <div role='alert' className='alert alert-error'>
                    <span>{errors['name']?.message?.toString()}</span>
                    </div>
                )}
                </div>
            <div className="card-actions justify-between pt-8">
              <input type='submit' className="btn btn-primary" value={'introduce'}/>
            </div>
          </div>
        </div>
    </form>
         
    </dialog>
  )
}
export default NewNameDialog