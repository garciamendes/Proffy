import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowLeft } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'

import { isObjectEmpty } from '../../../utils'
import LogoImg from '../../../assets/name-logo.svg'
import { useNavigate } from 'react-router-dom'

const loginUserSchema = z.object({
  fullName: z.string(),
  email: z.string().email({ message: 'Informe um email válido!' }),
  password: z.string(),
})
type ILoginUser = z.infer<typeof loginUserSchema>

export const Register = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ILoginUser>({ resolver: zodResolver(loginUserSchema) })

  useEffect(() => {
    if (isObjectEmpty(errors)) return

    Object.values(errors).forEach((error) => toast.error(error.message))
  }, [errors])

  const handleSendRegister = async (data: ILoginUser) => {

    console.log(data)
  }

  return (
    <div className='h-screen flex'>
      <div className='flex items-center justify-center w-1/2 h-full flex-col'>
        <div onClick={() => navigate('/')} className='flex w-1/2 mt-3 gap-2 cursor-pointer'>
          <ArrowLeft className='text-violet-500' />

          <span className='text-violet-300'>Voltar</span>
        </div>

        <div className='flex flex-col justify-center w-1/2 h-full'>

          <div className='flex flex-col gap-4 mb-16'>
            <h2 className='text-violet-950 text-4xl font-bold'>
              Cadastro
            </h2>

            <span className='text-gray-500 w-52'>Preencha os dados abaixo para começar</span>
          </div>

          <form onSubmit={handleSubmit(handleSendRegister)}>
            <div>
              <div className="relative">
                <input
                  {...register('fullName', { required: true })}
                  type="text"
                  required
                  id="floating_filled_fullname"
                  className="block rounded-t-lg px-4 pb-5 pt-6 w-full text-sm text-gray-900 bg-gray-50 border-b appearance-none focus:outline-none peer"
                  placeholder=" " />

                <label
                  htmlFor="floating_filled_fullname"
                  className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-violet-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  Nome Completo
                </label>
              </div>

              <div className="relative">
                <input
                  {...register('email', { required: true })}
                  type="text"
                  required
                  id="floating_filled_email"
                  className="block px-4 pb-5 pt-6 w-full text-sm text-gray-900 bg-gray-50 border-b appearance-none focus:outline-none peer"
                  placeholder=" " />

                <label
                  htmlFor="floating_filled_email"
                  className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-violet-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  Email
                </label>
              </div>

              <div className="relative">
                <input
                  {...register('password', { required: true })}
                  type="password"
                  required
                  id="floating_filled-pass"
                  className="block rounded-b-lg px-4 pb-5 pt-6 w-full text-sm text-gray-900 bg-gray-50 border-0 appearance-none focus:outline-none peer"
                  placeholder="" />

                <label
                  htmlFor="floating_filled-pass"
                  className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-violet-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  Senha
                </label>
              </div>
            </div>

            <button className='bg-green-500 w-full mt-8 py-4 rounded-lg text-white hover:opacity-80 transition-colors'>
              Concluir cadastro
            </button>
          </form>
        </div>
      </div>

      <div className='relative w-1/2 bg-violet-600 flex items-center justify-center'>
        <div className="absolute bg-image-personal bg-center bg-no-repeat h-[90%] w-full"></div>

        <div className='z-10 flex flex-col justify-start'>
          <img src={LogoImg} alt='Logo' />

          <h2 className='text-2xl w-52 text-violet-400'>Sua plataforma de estudos online.</h2>
        </div>
      </div>
    </div>
  )
}