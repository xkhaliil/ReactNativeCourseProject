import { useCurrentRouteInfo, useRouter } from "expo-router"
import { useEffect, useState } from "react"

import { isOnboarded, setOnboarded } from "./storage"

export function useOnboarding(): boolean | undefined {
  const router = useRouter()
  const route = useCurrentRouteInfo()

  const [value, setValue] = useState<boolean>()

  useEffect(() => {
    void (async () => {
      const onboarded = await isOnboarded()
      setValue(onboarded)

      if (!onboarded) {
        router.replace(`/onboarding?return=${route?.pathnameWithParams}`)
      }
    })()
  }, [router, route])

  return value
}

export function useOnboardingDone(): () => Promise<void> {
  const router = useRouter()
  const route = useCurrentRouteInfo()

  return async () => {
    const onboarded = await isOnboarded()
    if (onboarded) {
      return router.back()
    }

    await setOnboarded()

    router.replace(route?.searchParams.get("return") ?? "/")
  }
}
