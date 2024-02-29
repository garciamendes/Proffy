import Checkimg from '../../../assets/check.svg'
import { useNavigate } from 'react-router-dom'

export const SucessRegister = () => {
  const navigate = useNavigate()

  return (
    <div className='h-screen flex'>
      <div className='relative w-full bg-violet-600 flex items-center justify-center'>
        <div className="absolute bg-image-personal-big bg-center bg-no-repeat h-full w-full"></div>

        <div className='z-10 flex flex-col justify-center items-center'>
          <img className='w-28' src={Checkimg} alt='Check' />

          <h1 className='text-5xl text-white my-10'>
            Cadastro concluído
          </h1>

          <h2 className='text-2xl w-2/3 text-center text-violet-400'>
            Agora você faz parte da plataforma da Proffy. Tenha uma ótima experiência.
          </h2>

          <button
            onClick={() => navigate('/')}
            className='bg-green-500 w-2/5 mt-8 py-4 rounded-lg text-white hover:opacity-80 transition-colors'>
            Fazer login
          </button>
        </div>
      </div>
    </div>
  )
}