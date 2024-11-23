import { Footer } from "@/app/_components/auth/Footer";
import { Header } from "@/app/_components/auth/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return(
    <>
      <Header />
      {children}
      <Footer />
    </>

  )
}