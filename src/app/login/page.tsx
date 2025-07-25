import { LoginBlock } from '@/components/blocks/login/login-block'

export default function LoginPage() {
  return (
    <div className="flex w-full flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm py-16 md:max-w-3xl">
        <LoginBlock />
      </div>
    </div>
  )
}
