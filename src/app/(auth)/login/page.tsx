import CardFormWrapper from "../components/cardFormWrapper";
import LoginForm from "../components/loginForm";

export default function LoginPage() {
  return (
    <CardFormWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
    >
      <LoginForm />
    </CardFormWrapper>
  );
}
