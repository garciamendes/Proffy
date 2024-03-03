import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Check, Heart, Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'

import { isObjectEmpty } from '../../../utils'
import LogoImg from '../../../assets/name-logo.svg'
import { useNavigate } from 'react-router-dom'
import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { api } from '../../../services/api'
import { useCookies } from 'react-cookie'
import { withAuth } from '../../../hooks/withAuth'

const loginUserSchema = z.object({
  email: z.string().email({ message: 'Informe um email válido!' }),
  password: z.string(),
  remember: z.boolean().default(false)
})
type ILoginUser = z.infer<typeof loginUserSchema>

const Login = () => {
  const [, setCookie] = useCookies()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ILoginUser>({ resolver: zodResolver(loginUserSchema) })

  const { mutateAsync: loginMutationAsync, isPending } = useMutation({
    mutationFn: async (data: ILoginUser): Promise<any> => {
      const response = await api.post('/user/login', data)

      return response
    },
    onSuccess: (response) => {
      setCookie('sessionId', response.data, {
        path: '/',
        sameSite: true,
      })
      navigate('/home')
    },
    onError: (error: AxiosError) => {
      toast.error('Email ou senha então incorretas')
    },
  })

  useEffect(() => {
    if (isObjectEmpty(errors)) return

    Object.values(errors).forEach((error) => toast.error(error.message))
  }, [errors])

  const handleSendLogin = async (data: ILoginUser) => {

    await loginMutationAsync(data)
  }

  return (
    <div className='h-screen flex'>
      <div className='relative w-1/2 bg-violet-600 flex items-center justify-center'>
        <div className="absolute bg-image-personal bg-center bg-no-repeat h-[90%] w-full"></div>

        <div className='z-10 flex flex-col justify-start'>
          <img src={LogoImg} alt='Logo' />

          <h2 className='text-2xl w-52 text-violet-400'>Sua plataforma de estudos online.</h2>
        </div>
      </div>


      <div className='flex items-center justify-center w-1/2 h-full flex-col'>
        <div className='flex flex-col justify-center w-1/2 h-full'>
          <h2 className='text-violet-950 text-4xl font-bold mb-4'>Fazer Login</h2>

          <form onSubmit={handleSubmit(handleSendLogin)}>
            <div>
              <div className="relative">
                <input
                  {...register('email', { required: true })}
                  type="text"
                  required
                  id="floating_filled_email"
                  className="block rounded-t-lg px-4 pb-5 pt-6 w-full text-sm text-gray-900 bg-gray-50 border-b appearance-none focus:outline-none peer"
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

            <div className='flex items-center justify-between mt-6'>
              <div className='flex items-center gap-2'>
                <div className='size-7 relative'>
                  <input
                    {...register('remember')}
                    type="checkbox"
                    id='remember-check'
                    className='peer shrink-0 appearance-none relative size-7 cursor-pointer border rounded-lg bg-white checked:bg-green-500 focus:outline-none' />

                  <Check className='absolute size-7 top-0 hidden peer-checked:block peer-checked:text-white text-[12px] pointer-events-none transition-color' />
                </div>

                <label htmlFor='remember-check' className='text-base text-gray-500'>Lembrar-me</label>
              </div>

              <span
                onClick={() => navigate('/forgot-password')}
                className='cursor-pointer hover:underline text-base text-gray-500'>
                  Esqueci minha senha
                </span>
            </div>

            <button
              disabled={isPending}
              className='flex items-center justify-center bg-slate-300 w-full mt-8 py-4 rounded-lg text-gray-500 hover:opacity-80 transition-colors'>
                {isPending ? <Loader2 className='animate-spin' /> : 'Entrar'}
              </button>
          </form>
        </div>

        <div className='flex flex-col w-1/2 justify-center items-center mb-20'>
          <div className='flex items-center w-full justify-between'>
            <span className='text-gray-400'>Não tem conta?</span>

            <span className='flex items-center gap-2 text-gray-400'>E de graça <Heart className='fill-violet-300 stroke-violet-300' /></span>
          </div>

          <strong
            onClick={() => navigate('/register')}
            className='text-violet-700 self-start underline text-[18px] cursor-pointer'>
              Cadastre-se
            </strong>
        </div>
      </div>
    </div>
  )
}

export default withAuth(Login, false)