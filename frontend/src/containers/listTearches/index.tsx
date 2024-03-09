import { Header } from "../../components/header"
import { withAuth } from "../../hooks/withAuth"
import EMSmileImg from '../../assets/em-smille.svg'
import { Filters } from "./filters"

const ListTearches = () => {
  // if (isLoading)
  //   return <Loader />

  return (
    <div className="flex flex-col h-full w-full pb-3">
      <Header title="Estudar" goBackRoute="/home" />

      <div className="relative h-96 w-full flex justify-center items-center bg-violet-700">
        <div className="flex items-center justify-between gap-6 z-10 w-[45%] h-full">
          <strong className="text-3xl text-white w-72">Estes são os proffys disponíveis.</strong>

          <div className="flex items-center justify-between gap-6">
            <img src={EMSmileImg} className="size-10" />
            <span className="text-[14px] text-slate-400 w-32">Nós temos 32 professores.</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 z-10 w-[45%] mx-auto py-3 px-8">
        <Filters />

        <div className="mt-4">
          <span>teste</span>
        </div>
      </div>
    </div>
  )
}

export default withAuth(ListTearches)