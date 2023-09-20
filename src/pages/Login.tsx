function Login() {
  return (
    <form>
      <input
        placeholder="E-Mail"
        data-testid="email-input"
      />
      <input
        placeholder="Password"
        data-testid="password-input"
      />
      <button data-testid="login-submit-btn">Enter</button>
    </form>
  );
}

export default Login;
