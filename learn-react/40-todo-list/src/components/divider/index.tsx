import { tw } from '@/utils'

export default function Divider({ className }: { className?: string }) {
  return <hr className={tw('my-15 border-slate-50/50 w-9/10', className)} />
}
