import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { CalculusSettingsForm } from '../Calculus/CalculusSettingsForm'
import { MemorySettingsForm } from '../Memory/MemorySettingsForm'

export function SettingsCard() {
  const mode = useSelector((state: RootState) => state.typeModeSlice.mode)
  if (mode === 'calculus') {
    return <CalculusSettingsForm />
  } else if (mode === 'memory') {
    return <MemorySettingsForm />
  }
}
