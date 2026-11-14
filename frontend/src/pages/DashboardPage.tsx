import DashboardLayout from "../components/Dashboard/DashboardLayout"
import DashboardHeader from "../components/Dashboard/DashboardHeader"
import NewsWidget from "../components/Widgets/NewsWidget"
import { useAuth } from "../hooks/useAuth"
import { useAudience } from "../hooks/useAudience"
import WeatherWidget from "../components/Widgets/WeatherWidget"
import TransportWidget from "../components/Widgets/TransportWidget"

const DashboardPage = () => {
  const { user, isLoading } = useAuth()
  const { audience } = useAudience()

  if (isLoading) {
    return <p>Laddar dashboard...</p>
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayout
      header={<DashboardHeader firstName={user.firstName} profileImageUrl={user.profileImageUrl} />}
      mainWidget={<NewsWidget audience={audience} />}
      sideWidgets={
        <>
          <WeatherWidget />
          <TransportWidget />
        </>
      }
    />
  )
}

export default DashboardPage
