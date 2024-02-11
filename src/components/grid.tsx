import { FC, PropsWithChildren, Children, ReactNode } from "react"
//import { Link } from "react-router-dom"

const Grid: FC<PropsWithChildren> = ({children}) : ReactNode => {
  
  const arrayChildren = Children.toArray(children)  
  
  return (        
    <div className="w-[80%] h-[80%] grid grid-cols-4 grid-rows-4 gap-4">

       {Children.map(arrayChildren, (child, index) => (
         <div key={index} className="flex items-center justify-center">
           {child}
        </div>  
       ))}
      
    </div>
  )
}

export default Grid

