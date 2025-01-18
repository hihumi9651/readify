import { Header } from "@/app/_components/layout/header/page";
import { Footer } from "@/app/_components/layout/footer/page";

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