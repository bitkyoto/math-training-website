import { Footer } from '@/components/Footer'
import { OptionsCardForm } from '@/components/Settings/OptionsCardForm'
import { SettingsCard } from '@/components/Settings/SettingsCard'

export const MainPage = () => {
  return (
    <div className="flex flex-col">
      <div className="mt-10 px-10 flex justify-center gap-x-10">
        <OptionsCardForm />
        <SettingsCard />
      </div>
      {/* <Footer /> */}
    </div>
  )
}
