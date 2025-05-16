import { Link } from "react-router"
import { sidebarItems } from "~/constants"

const NavItems = () => {
  return (
    <section className="nav-items">
        <Link to="/" className="link-logo">
            <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]"/>
            <h1>ToureChol</h1>
        </Link>
        <div className="container">
          <nav>
            {sidebarItems.map((item) => (
              <Link to={item.href} key={item.id} className="nav-item">
                <img src={item.icon} alt={item.label} className="icon" />
                <span className="text">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

    </section>
  )
}

export default NavItems