import { RegisterBlock } from '@/components/blocks/register/register-block'

export default function RegisterPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm py-16 md:max-w-3xl">
        <RegisterBlock />
      </div>
    </div>
  )
}
