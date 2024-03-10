import { Header } from "../../components/header"
import { withAuth } from "../../hooks/withAuth"
import EMSmileImg from '../../assets/em-smille.svg'
import { Filters } from "./filters"
import { useGetAllEducatorsQuery, useListEducatorsQuery } from "../../store/modules/user/api"
import { Loader } from "lucide-react"
import { useEffect } from "react"
import { toast } from "sonner"
import NoImageImg from '../../assets/no-image.svg'
import { CHOICES_MATTERS, CHOICE_DAY_WEEK, FORMAT_REF } from "../../utils/constants"
import { getQueryParams } from "../../utils"
import { useSearchParams } from "react-router-dom"
import { IFiltersListEducators, IUserResponse } from "../../store/modules/user/types"
import moment from "moment"

const ListTearches = () => {
  const filters = ['matter', 'dayWeek', 'valueByhours']
  const [searchParams,] = useSearchParams()

  const getRequestFilters = () => {
  const result: IFiltersListEducators = {
      ...getQueryParams(searchParams, filters),
    }

    return result
  }

  // console.log(getRequestFilters())

  const {
    data: dataCountAllEducators,
    isError: isErrorAllEducators,
    isLoading: isLoadingAllEducators
  } = useGetAllEducatorsQuery()
  const {
    data,
    isLoading: isLoadingListEducators,
    isError: isErrorListEducators,
  } = useListEducatorsQuery({ filters: getRequestFilters() })

  useEffect(() => {
    if (isLoadingAllEducators)
      return

    if (isErrorAllEducators) {
      toast.error('Erro ao tentar pegar a quantidade de educadores')
      return
    }
  }, [isErrorAllEducators, isLoadingAllEducators])

  useEffect(() => {
    if (isLoadingListEducators)
      return

    if (isErrorListEducators) {
      toast.error('Erro ao tentar buscar a lista de educadores')
      return
    }
  }, [isLoadingListEducators, isErrorListEducators])

  const renderDayWeek = (educator: IUserResponse) => {
    return (
      <div className="grid grid-cols-5 gap-4 auto-rows-[136px] my-6">
        {Object.entries(CHOICE_DAY_WEEK).map(([keyItem, { key, text }]) => {
          let isDisabled = false
          const dayWeek = educator.dayWeek.find(i => i.dayWeek === key)

          if (!dayWeek)
            isDisabled = true

          return (
            <div key={keyItem} className={`flex flex-col justify-between border border-gray-400 p-[15px] rounded-lg ${isDisabled && 'opacity-30'}`}>
              <div className="flex flex-col">
                <span className="text-gray-400">Dia</span>

                <strong className="text-violet-950">{text}</strong>
              </div>

              <div className="flex flex-col">
                <span className="text-gray-400">Horário</span>

                <div className="flex gap-1 text-violet-950">
                  {!isDisabled && (
                    dayWeek?.from ?
                      <strong>{moment(dayWeek?.from, FORMAT_REF).format('HH:mm')}</strong> :
                      <span>---</span>
                  )}
                  -
                  {!isDisabled && (
                    dayWeek?.to ?
                      <strong>{moment(dayWeek?.to, FORMAT_REF).format('HH:mm')}</strong> :
                      <span>---</span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderListEducators = () => {
    if (!data?.listEducators.length || !data.listEducators) {
      return (
        <div className="flex items-center justify-center">
          <strong>Nenhum professor encontrado!</strong>
        </div>
      )
    }

    return (
      data?.listEducators.map(educator => {
        return (
          <div key={educator.id} className="flex flex-col border border-gray-200 bg-white rounded-lg">
            <div className="flex flex-col px-[30px] pt-[30px] pb-2">
              <div className="flex gap-2">
                <img id="teste" className="inline-block size-20 border rounded-full" src={NoImageImg} />

                <div className="flex flex-col justify-center gap-1">
                  <strong className="text-[18px] text-slate-500">{educator.fullname || '---'}</strong>
                  <span className="text-[16px] text-gray-400">{CHOICES_MATTERS[educator?.matter]?.text || '---'}</span>
                </div>

              </div>
              <p className="mt-3 text-slate-500">{educator?.bio || '---'}</p>

              {renderDayWeek(educator)}
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 p-[30px]">

              <div className="flex gap-3">
                <span className="text-slate-500">Preço/hora</span>
                <strong className="text-violet-600">{
                  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(educator.valueByhours)}
                </strong>
              </div>

              <button
                type="button"
                className="px-14 h-14 rounded-xl text-white text-[16px] hover:bg-green-600 duration-200 bg-green-500">
                Entrar em contato
              </button>
            </div>
          </div>
        )
      })
    )
  }

  if (isLoadingAllEducators || isLoadingListEducators)
    return <Loader />

  return (
    <div className="flex flex-col h-full w-full pb-3">
      <Header title="Estudar" goBackRoute="/home" />

      <div className="relative h-[250px] w-full flex justify-center items-center bg-violet-700">
        <div className="flex items-center justify-between gap-6 z-10 w-[45%] h-full">
          <strong className="text-3xl text-white w-72">Estes são os proffys disponíveis.</strong>

          <div className="flex items-center justify-between gap-6">
            <img src={EMSmileImg} className="size-10" />
            <span className="text-[14px] text-slate-400 w-32">Nós temos {dataCountAllEducators?.count ?? 0} professores.</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 z-10 w-[45%] mx-auto py-3 px-8">
        <Filters />

        <div className="flex flex-col gap-3 mt-4">
          {renderListEducators()}
        </div>
      </div>
    </div>
  )
}

export default withAuth(ListTearches)