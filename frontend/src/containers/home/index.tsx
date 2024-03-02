import { useMutation } from "@tanstack/react-query"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { withAuth } from "../../hooks/withAuth"
import { useCookies } from "react-cookie"

const Home = () => {
  const [, setCookie] = useCookies()
  const navigate = useNavigate()

  const { mutateAsync: loginMutationAsync, isPending } = useMutation({
    mutationFn: async (): Promise<any> => {
      await api.get('/user/logout')
    },
    onSuccess: () => {
      setCookie('sessionId', '', {
        path: '/',
        maxAge: 0,
        sameSite: true,
      })
      navigate('/')
    },
    onError: (error: AxiosError) => {
      toast.error('Erro ao tentar deslogar')
    },
  })

  return (
    <div className="h-full flex items-center justify-center">
      <button onClick={async () => await loginMutationAsync()}>logout</button>
    </div>
  )
}

export default withAuth(Home)