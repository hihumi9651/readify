import { ButtonProps } from '@/app/_types/button'

const Button = ({children, className='', onClick}: ButtonProps) => {
    const baseStyle = `
        px-4 
        py-2 
        rounded-lg
        bg-[#272727]
        text-gray-300
        text-sm
        shadow-[4px_4px_8px_0px_#1f1f1f,_-4px_-4px_8px_0px_#303030]
        hover:shadow-[2px_2px_4px_0px_#1f1f1f,_-2px_-2px_4px_0px_#303030]
        active:shadow-[inset_4px_4px_8px_0px_#1f1f1f,_inset_-4px_-4px_8px_0px_#303030]
        transition-all
        duration-300
    `

    return (
        <button
            className={`${baseStyle} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button
