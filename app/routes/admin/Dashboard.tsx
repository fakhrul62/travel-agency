import { Header } from "components"

const Dashboard = () => {

  const user = {
    name: "Fakhrul Alam",
    image: "/assets/images/david.webp",
    email: "david@tourechol.com"
  }
  return (
    <main className="dashboard wrapper">
      <Header title={`Welcome ${user? user.name : 'Guest'}!`} subtitle={`Organize activities and famous destinations now`} />
      Dashboard page content
    </main>
  )
}

export default Dashboard