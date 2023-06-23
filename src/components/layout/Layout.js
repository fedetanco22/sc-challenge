import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import RoverTabs from '../rover-tabs/RoverTabs'
import SEO from '../seo/SEO'

const Layout = ({ children, title, description, keywords }) => {
  return (
    <div>
      <SEO title={title} description={description} keywords={keywords} />
      <Navbar />
      <RoverTabs />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
