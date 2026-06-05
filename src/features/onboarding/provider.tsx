import { useEffect, useState } from "react"

import { Onboarding } from "./onboarding"
import { isOnboarded, setOnboarded } from "./storage"

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [value, setValue] = useState<boolean>()

  useEffect(() => {
    void (async () => {
      const onboarded = await isOnboarded()
      setValue(onboarded)
    })()
  }, [])

  const handleDone = async () => {
    setValue(true)

    await setOnboarded()
  }

  if (typeof value === "undefined") {
    return <></>
  }

  if (value) {
    return children
  }

  return <Onboarding onDone={handleDone} />
}
