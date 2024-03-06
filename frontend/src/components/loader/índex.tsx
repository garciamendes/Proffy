import { Loader2 } from "lucide-react"

export const Loader = ({ size='16' }: { size?: string }) => {
  return (
    <div className='flex item-center justify-center mt-10'>
      <Loader2 className={`animate-spin text-violet-700 size-${size}`} />
    </div>
  )
}