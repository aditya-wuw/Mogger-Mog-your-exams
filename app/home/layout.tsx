import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const cookie = await cookies()
  const session = cookie.get('session_token')?.value;
  if (!session) {
    redirect('/');
  }
  return <>
  {children}
  </>;
}
