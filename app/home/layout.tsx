import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Sidebar from "@/components/home/Sidebar";
import Mainbodynav from "@/components/home/BodyNav";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookie = await cookies();
  const session = cookie.get("session_token")?.value;
  if (!session) {
    redirect("/");
  }
  return (
    <div className="w-full h-screen flex">
      <Sidebar />
      <main className="w-full h-full px-4 mb-5">
        <Mainbodynav />
        {children}
      </main>
    </div>
  );
}
