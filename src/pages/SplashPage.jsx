import logo from '../assets/logo.png'
const SplashPage = () => {
  return (
    <div>
        <img src={logo} alt="" />
        <label>Username:
            <input type="text" />
        </label>
        <label>Password:
            <input type="password" />
        </label>
        <button>Login</button>
    </div>
  )
}
export default SplashPage