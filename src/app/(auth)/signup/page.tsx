import CardFormWrapper from "../components/cardFormWrapper";
import RegisterForm from "../components/registerForm";

export default function SignUpPage() {
  return (
    <CardFormWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
    >
      <RegisterForm />
    </CardFormWrapper>
  );
}
