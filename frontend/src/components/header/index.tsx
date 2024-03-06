import { ArrowLeft } from "lucide-react"
import LogoNameSmall from '../../assets/logo-name-small.svg'
import { useNavigate } from "react-router-dom"

export interface IHeaderProps {
  title: string
  goBackRoute: string
}

export const Header = ({ title, goBackRoute }: IHeaderProps) => {
  const navigate = useNavigate()

  return (
    <div className="h-[65px] flex items-center justify-around bg-violet-800">
      <ArrowLeft
        onClick={() => navigate(goBackRoute)}
        className="text-white text-[16px] cursor-pointer" />

      <span className="text-white text-[16px]">{title}</span>

      <img src={LogoNameSmall} alt="Logo small" />
    </div>
  )
}