import { LoginForm } from '@/components/login-form';

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center py-12">
      <LoginForm />
    </div>
  );
}
