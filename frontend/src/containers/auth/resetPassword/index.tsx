import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { z } from 'zod'
import { isObjectEmpty } from '../../../utils'
import LogoImg from '../../../assets/name-logo.svg'
import { useNavigate, useSearchParams } from 'react-router-dom'
import {
  useLazyValidateSessionResetPasswordQuery,
  useResetPasswordMutation
} from '../../../store/modules/auth/api'

const loginUserSchema = z.object({
  newPassword: z.string(),
})
type IForgotPasswordUser = z.infer<typeof loginUserSchema>

export const ResetPassword = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const u = searchParams.get('u') || ''
  const t = searchParams.get('t') || ''

  const [dataIsSessionValidate, setDataIsSessionValidate] = useState(false)

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IForgotPasswordUser>({ resolver: zodResolver(loginUserSchema) })

  const [triggerValidateSessionReset] = useLazyValidateSessionResetPasswordQuery()

  const [sendNewPasswordMudation, { isLoading }] = useResetPasswordMutation()

  useEffect(() => {
    const validateSessionReset = async () => {
      triggerValidateSessionReset({ t, u })
        .unwrap()
        .then(() => setDataIsSessionValidate(true))
        .catch(() => {
          setDataIsSessionValidate(false)
          goBackIntialRoute()
        })
    }

    validateSessionReset()
  }, [u, t])

  useEffect(() => {
    if (isObjectEmpty(errors)) return

    Object.values(errors).forEach((error) => toast.error(error.message))
  }, [errors])

  function goBackIntialRoute() {
    toast.error('Houver um error na session de resete de senha, tente reiniciar enviando o email novamente!',
      { duration: 4000 })

    toast.info('Em 5s você será redirecionado para a tela de login',
      { position: 'top-right', duration: 4000 })

    setTimeout(() => {
      navigate('/')
    }, 5000)
  }

  const handleSendRegister = async ({ newPassword }: IForgotPasswordUser) => {
    sendNewPasswordMudation({ newPassword, t, u })
      .unwrap()
      .then(() => {
        toast.success('Sua senha foi redefinida com sucesso!')
        navigate('/')
      })
      .catch(() => toast.error('Erro ao tentar definir a nova senha'))
  }

  return (
    <div className={`h-screen flex ${!dataIsSessionValidate && 'pointer-events-none'}`}>
      <div className='flex items-center justify-center w-1/2 h-full flex-col'>
        <div onClick={() => navigate('/')} className='flex w-1/2 mt-3 gap-2 cursor-pointer'>
          <ArrowLeft className='text-violet-500' />

          <span className='text-violet-300'>Voltar</span>
        </div>

        <div className='flex flex-col justify-center w-1/2 h-full'>

          <div className='flex flex-col gap-4 mb-16'>
            <h2 className='text-violet-950 text-4xl w-[260px] font-bold'>
              Nova Senha
            </h2>

            <span className='text-gray-500'>Guarde a nova senha em um lugar seguro.</span>
          </div>

          <form onSubmit={handleSubmit(handleSendRegister)}>
            <div>
              <div className="relative">
                <input
                  {...register('newPassword', { required: true })}
                  type="password"
                  required
                  id="floating_filled_email"
                  className="block px-4 pb-5 pt-6 w-full rounded-lg text-sm text-gray-900 bg-gray-50 appearance-none focus:outline-none peer"
                  placeholder=" " />

                <label
                  htmlFor="floating_filled_email"
                  className="absolute text-base text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-violet-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                  Nova Senha
                </label>
              </div>

            </div>

            <button
              disabled={isLoading}
              className='flex items-center justify-center bg-gray-400 w-full mt-8 py-4 rounded-lg text-white hover:bg-violet-900 transition-colors'>
              {isLoading ? <Loader2 className='animate-spin' /> : 'Resetar senha'}
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