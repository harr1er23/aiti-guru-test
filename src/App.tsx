import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryProvider } from "./app/providers/QueryProvider"
import { AppRouter } from "./app/providers/RouterProvider"
import { NProgressBar } from "./shared/ui/NProgressBar"

const App = () => {
  return (
    <MantineProvider>
      <Notifications position="top-right" />
      <QueryProvider>
        <NProgressBar />
        <AppRouter />
      </QueryProvider>
    </MantineProvider>
  )
}

export default App
