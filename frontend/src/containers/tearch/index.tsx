import { ChangeEvent, useEffect, useState } from "react"
import { Header } from "../../components/header"
import { withAuth } from "../../hooks/withAuth"
import { useCurrentUserQuery, useSaveProfileMutation } from "../../store/modules/user/api"
import NoImageImg from '../../assets/no-image.svg'
import RocketImg from '../../assets/rocket.svg'
import { AlertOctagon, Loader2, Plus } from "lucide-react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { formProfileSchema, profileSchema } from "./types"
import { formatMaskPhone, isObjectEmpty } from "../../utils"
import { IDayWeekSaveProfile, ISaveProfileRequest, IUserResponse } from "../../store/modules/user/types"
import { NumericFormat } from 'react-number-format';
import { CHOICES_MATTERS, DAY_WEEK_OPTIONS, FORMAT_REF, MATTERS_OPTIONS } from "../../utils/constants"
import { Loader } from "../../components/loader/índex"
import moment from 'moment'
import { toast } from "sonner"
import { CHOICES_MATTERS_ENUM, CHOICE_DAY_WEEK_ENUM } from "../../utils/types"

const Tearch = () => {
  const { data: currentUser, isLoading, refetch } =
    useCurrentUserQuery()
  const [handleSaveProfile, { isLoading: isLoadingSaveProfile }] = useSaveProfileMutation()

  const [dayWeeksToDelete, setDayWeeksToDelete] = useState<Array<string>>([])
  const {
    register,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors } } = useForm<profileSchema>(
      {
        resolver: zodResolver(formProfileSchema),
        defaultValues: {
          email: currentUser?.email || '',
          fullname: currentUser?.fullname || '',
          whatsapp: formatMaskPhone(currentUser?.whatsapp as string) || '',
          bio: currentUser?.bio as string || '',
          dayWeek: currentUser?.dayWeek || []
        },
      }
    )
  const { fields: dayWeekField, remove, append } = useFieldArray({
    control,
    name: 'dayWeek'
  })

  useEffect(() => {
    if (isObjectEmpty(errors)) return

    Object.values(errors).forEach((error) => toast.error(error.message))
  }, [errors])

  useEffect(() => {
    if (!watch('whatsapp'))
      return

    const value = formatMaskPhone(watch('whatsapp'))
    setValue('whatsapp', value as string)
  }, [watch('whatsapp')])

  useEffect(() => {
    if (!currentUser)
      refetch()

    if (isObjectEmpty(currentUser as IUserResponse) || !currentUser)
      return

    Object.entries(currentUser as IUserResponse).forEach((row) => {
      const [key, value] = row

      if (key === 'avatar')
        return

      setValue(key as any, value)
    })
  }, [isLoading])

  const handleChange = (event: ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    const { value: inputValue } = event.target

    const parsedTime = moment(inputValue, 'HH:mm').toISOString()
    onChange(parsedTime)
  }

  const handleSave = (data: profileSchema) => {
    const createsDayWeek: Array<Omit<IDayWeekSaveProfile, 'id'>> = []
    const updatesDayWeek: Array<IDayWeekSaveProfile> = []

    data.dayWeek.forEach(item => {
      if (!item.id) {
        createsDayWeek.push({
          dayWeek: item.dayWeek as CHOICE_DAY_WEEK_ENUM,
          from: item.from,
          to: item.to,
          userId: currentUser?.id as string
        })
      } else {
        updatesDayWeek.push({
          dayWeek: item.dayWeek as CHOICE_DAY_WEEK_ENUM,
          from: item.from,
          to: item.to,
          id: item.id as string,
          userId: currentUser?.id as string
        })
      }
    })

    const valueByHourFormated = parseInt(data.valueByhours.replace(/[,\.]/g, ''))
    const valeuByhour = valueByHourFormated !== Number(currentUser?.valueByhours) ?
      Math.floor(parseInt(data.valueByhours.replace(/[,\.]/g, '')) / 100).toString() :
      valueByHourFormated.toString()

    const dataToSave: ISaveProfileRequest = {
      id: currentUser?.id as string,
      bio: data.bio,
      dayWeek: {
        creates: createsDayWeek,
        deletes: dayWeeksToDelete,
        updates: updatesDayWeek
      },
      email: data.email,
      fullname: data.fullname,
      matter: data.matter as CHOICES_MATTERS_ENUM,
      valueByhours: valeuByhour,
      whatsapp: data.whatsapp,
      isEducator: true
    }

    handleSaveProfile(dataToSave)
      .unwrap()
      .then(() => toast.success('Informações atualizadas com sucesso'))
      .catch(() => toast.error('Erro ao tentar atualizar as informações'))
  }

  const removeDayWeek = (index: number, isNew = false) => {
    if (!isNew) {
      const item = currentUser?.dayWeek[index]
      setDayWeeksToDelete([...dayWeeksToDelete, item?.id as string])
    }
    remove(index)
  }

  const renderInfoHours = () => {
    if (!dayWeekField.length) {
      return (
        <div className="flex w-full justify-center items-center mt-3">
          <strong>Nenhum cadastro ainda!</strong>
        </div>
      )
    }

    return dayWeekField.map((item, index) => {
      return (
        <div key={item.id} className="flex flex-col mt-6">
          <div className="w-full flex items-center justify-between gap-3">
            <div className="flex flex-col flex-1">
              <label htmlFor="dayWeek" className="mb-1">Dia da semana</label>

              <select
                id='dayWeek'
                className="cursor-pointer py-2 px-2 text-[15px] bg-gray-50 border border-gray-300 outline-none rounded-md"
                {...register(`dayWeek.${index}.dayWeek`)}>
                <option value="">Selecione o dia da semana</option>

                {DAY_WEEK_OPTIONS.map(option => {
                  return <option
                    key={option.value}
                    value={option.value}>{option.label}</option>
                })}
              </select>
            </div>

            <div className="flex flex-col w-[20%]">
              <label htmlFor="from" className="mb-1">Das</label>

              <Controller
                name={`dayWeek.${index}.from`}
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <input
                      id='from'
                      type='time'
                      onChange={(e) => handleChange(e, onChange)}
                      value={moment(value, FORMAT_REF).format('HH:mm') || ''}
                      className="py-2 px-2 text-[15px] bg-gray-50 border border-gray-300 outline-none rounded-md appearance-none"
                    />
                  )
                }}
              />
            </div>

            <div className="flex flex-col w-[20%]">
              <label htmlFor="to" className="mb-1">Até</label>

              <Controller
                name={`dayWeek.${index}.to`}
                control={control}
                render={({ field: { value, onChange } }) => {
                  return (
                    <input
                      id='to'
                      type='time'
                      onChange={(e) => handleChange(e, onChange)}
                      value={moment(value, FORMAT_REF).format('HH:mm') || ''}
                      className="py-2 px-2 text-[15px] bg-gray-50 border border-gray-300 outline-none rounded-md appearance-none"
                    />
                  )
                }}
              />

            </div>
          </div>

          <div className="relative flex justify-center items-center my-5">
            <button
              type='button'
              onClick={() => removeDayWeek(index, item.isNew)}
              className="z-10 bg-white px-5 text-red-500 font-semibold">Excluir horário</button>
            <span className="w-full absolute h-[2px] rounded-full bg-gray-300"></span>
          </div>
        </div>
      )
    })
  }

  if (isLoading)
    return <Loader />

  return (
    <div className="flex flex-col h-full w-full pb-3">
      <Header title="Dar aula" goBackRoute="/home" />

      <div className="relative h-96 w-full flex justify-center items-center bg-violet-700">
        <div className="flex flex-col justify-center gap-6 z-10 w-[45%] h-full">
          <strong className="text-3xl text-white w-80">Que incrível que você quer dar aulas.</strong>

          <div className="flex items-center justify-between">
            <span className="text-1xl text-slate-400 w-80">O primeiro passo, é preencher esse formulário de inscrição.</span>

            <div className="flex items-center justify-between gap-6">
              <img src={RocketImg} className="size-10" />
              <span className="text-[14px] text-slate-400 w-32">Preparare-se! vai ser o máximo.</span>
            </div>
          </div>
        </div>
      </div>

      <form className="z-10" onSubmit={handleSubmit(handleSave)}>
        <div className="flex flex-col flex-1 z-10 w-[45%] mx-auto -mt-8 bg-white rounded-2xl py-3 px-8">
          <div className="flex flex-col">
            <div className="border-b border-gray-400 pb-2">
              <strong className="text-[24px] text-gray-600">Seus dados</strong>
            </div>

            <div className="flex justify-between mt-4 gap-4">
              <div className="flex items-center gap-5 flex-1">
                <img id="teste" className="inline-block size-14 border rounded-full" src={NoImageImg} />
                <strong className="text-[24px] text-violet-950">{currentUser?.fullname || '---'}</strong>
              </div>

              <div className="flex flex-col w-[30%]">
                <label htmlFor="phone" className="mb-1">Whatsapp</label>
                <input
                  {...register('whatsapp')}
                  type="text"
                  id='phone'
                  maxLength={15}
                  placeholder="(__) _ ____ ____"
                  className='py-2 px-2 text-[15px] bg-gray-50 border border-gray-300 outline-none rounded-md' />
              </div>
            </div>

            <div className="flex justify-between mt-4 gap-4">
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-5">
                  <label htmlFor="bio" className="mb-1">Biografia</label>
                  <span className="text-gray-400 text-[12px]">(Máximo 300 Caracteres)</span>
                </div>
                <textarea
                  {...register('bio')}
                  id='bio'
                  className='py-2 px-2 text-[15px] min-h-32 resize-none bg-gray-50 border border-gray-300 outline-none rounded-md' />
              </div>
            </div>
          </div>

          <div className="flex flex-col my-7">
            <div className="border-b border-gray-400 pb-2">
              <strong className="text-[24px] text-gray-600">Sobre a aula</strong>
            </div>

            <div className="flex justify-between mt-4 gap-4">
              <div className="flex flex-col flex-1">
                <label htmlFor="matter" className="mb-1">Matéria</label>

                <select
                  id='matter'
                  className="cursor-pointer py-2 px-2 text-[15px] bg-gray-50 border border-gray-300 outline-none rounded-md"
                  {...register('matter')}>
                  <option value="">Selecione uma matéria</option>

                  {MATTERS_OPTIONS.map(option => {
                    return <option
                      key={option.value}
                      value={option.value}>{option.label}</option>
                  })}
                </select>
              </div>

              <div className="flex flex-col w-[30%]">
                <label htmlFor="valueByHours" className="mb-1">Nome completo</label>
                <div className="flex items-center gap-3 py-2 px-2 text-[15px] bg-gray-50 border border-gray-300 outline-none rounded-md">
                  <strong className="text-gray-400">R$</strong>

                  <Controller
                    name='valueByhours'
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <NumericFormat
                        decimalScale={2}
                        decimalSeparator=","
                        fixedDecimalScale
                        placeholder="0,00"
                        thousandSeparator="."
                        value={value}
                        className="flex-1 outline-none bg-transparent"
                        onChange={onChange} />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col mb-7">
            <div className="flex justify-between border-b border-gray-400 pb-2">
              <strong className="text-[24px] text-gray-600">Horários disponíveis</strong>

              <button
                type="button"
                onClick={() => append({ dayWeek: '', from: new Date(0), to: new Date(0), isNew: true })}
                className="bg-none border-none flex items-center gap-2 text-violet-700 hover:text-violet-800">
                <Plus />
                <strong>Novo horário</strong>
              </button>
            </div>

            {renderInfoHours()}
          </div>

          <div className="w-full border-t flex justify-between py-4">
            <div className="flex items-start gap-3">
              <AlertOctagon className="size-7 text-violet-600" />

              <div className="flex flex-col">
                <strong className="text-[15px] text-violet-600">Importante!</strong>
                <p className="w-52">Preencha todos os dados corretamente.</p>
              </div>
            </div>

            <button
              type="submit"
              className="px-14 h-14 rounded-xl text-white text-[16px] hover:bg-green-600 duration-200 bg-green-500">
              {isLoadingSaveProfile ? <div className="px-14">
                <Loader2 className="animate-spin text-white" />
              </div> : 'Salvar cadastro'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default withAuth(Tearch)