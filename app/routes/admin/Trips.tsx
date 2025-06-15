import { Header } from "components"

const Trips = () => {
  return (
    <main className="wrapper">
      <Header
        title={`AI Trips`}
        subtitle={`Create and Edit AI-generated trips`}
        ctaText="Create Trip"
        ctaLink={`/trips/create`}
      />
    </main>
  )
}

export default Trips