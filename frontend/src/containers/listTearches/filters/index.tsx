import { zodResolver } from "@hookform/resolvers/zod"
import { filtersSchemas } from "../types"
import { Controller, useForm } from "react-hook-form"
import { DAY_WEEK_OPTIONS, MATTERS_OPTIONS } from "../../../utils/constants"
import { NumericFormat } from "react-number-format"
import { Filter } from "lucide-react"

export const Filters = () => {
  const {
    register,
    watch,
    setValue,
    control,
    handleSubmit,
    formState: { errors } } = useForm<filtersSchemas>(
      {
        resolver: zodResolver(filtersSchemas)
      }
    )

  return (
    <div className="flex justify-between flex-1 z-10 w-full -mt-16 rounded-2xl gap-5">
      <div className="flex flex-col flex-1">
        <label htmlFor="matter" className="mb-1 text-white">Matéria</label>

        <select
          id='matter'
          className="cursor-pointer h-[48px] py-3 px-2 text-[15px] bg-gray-50 border border-gray-300 outline-none rounded-md"
          {...register('matter')}>
          <option value="">Selecione uma matéria</option>

          {MATTERS_OPTIONS.map(option => {
            return <option
              key={option.value}
              value={option.value}>{option.label}</option>
          })}
        </select>
      </div>

      <div className="flex flex-col flex-1">
        <label htmlFor="matter" className="mb-1 text-white">Dia da semana</label>

        <select
          id='matter'
          className="cursor-pointer h-[48px] py-3 px-2 text-[15px] bg-gray-50 border border-gray-300 outline-none rounded-md"
          {...register('matter')}>
          <option value="">Selecione um dia</option>

          {DAY_WEEK_OPTIONS.map(option => {
            return <option
              key={option.value}
              value={option.value}>{option.label}</option>
          })}
        </select>
      </div>

      <div className="flex flex-col flex-1">
        <label htmlFor="matter" className="mb-1 text-white">Preço</label>

        <div className="flex items-center h-[48px] gap-3 py-3 px-2 text-[15px] bg-gray-50 border border-gray-300 outline-none rounded-md">
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


      <button
        className="flex self-end w-max h-[48px] gap-3 py-3 px-4 text-[15px] bg-gray-50 text-slate-700 border border-gray-300 outline-none rounded-md">
        <Filter />
      </button>
    </div>
  )
}