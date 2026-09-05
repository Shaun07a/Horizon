import HeaderBox from '@/components/HeaderBox'


const Home = () => {
  const loggedIN = { firstName: 'Shaun'};

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user={loggedIN?.firstName || 'Guest'}
            subtext="Access and manage your account and transactions efficiently."
          />
        </header>
      </div>
    </section>
  )
}

export default Home