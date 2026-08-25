import dynamic from 'next/dynamic';

export const dynamic = 'force-dynamic';

const LoginForm = dynamic(() => import('@/components/LoginForm'), { ssr: false });

export default function LoginPage() {
  return (
    <div className="animate-fade-in max-w-md mx-auto mt-12">
      <LoginForm />
    </div>
  );
}
