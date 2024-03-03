import Checkimg from '../../assets/check.svg'
import { useNavigate } from 'react-router-dom'

interface IScreenSuccess {
  title: string
  subTitle: string
  titleAction: string
}

export const ScreenSuccess = ({ title, subTitle, titleAction }: IScreenSuccess) => {
  const navigate = useNavigate()

  return (
    <div className='h-screen flex'>
      <div className='relative w-full bg-violet-600 flex items-center justify-center'>
        <div className="absolute bg-image-personal-big bg-center bg-no-repeat h-full w-full"></div>

        <div className='z-10 flex flex-col justify-center items-center'>
          <img className='w-28' src={Checkimg} alt='Check' />

          <h1 className='text-5xl text-white my-10'>{title}</h1>

          <h2 className='text-2xl w-2/3 text-center text-violet-400'>{subTitle}</h2>

          <button
            onClick={() => navigate('/')}
            className='bg-green-500 w-2/5 mt-8 py-4 rounded-lg text-white hover:opacity-80 transition-colors'>
            {titleAction}
          </button>
        </div>
      </div>
    </div>
  )
}