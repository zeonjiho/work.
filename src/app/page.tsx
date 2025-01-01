import '../styles/Home.css'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <main className="main-content text-center">
        <div className="mb-8">
          <h2 className="welcome-text">
            Welcome to work.
          </h2>
          <p className="sub-text">
            Start with login.
          </p>
        </div>
        <div className="flex space-x-4">
          <a href="/auth/login" className="button-primary">
            Login
          </a>
          <a href="/auth/signup" className="button-secondary">
            Register
          </a>
        </div>
      </main>
    </div>
  )
}