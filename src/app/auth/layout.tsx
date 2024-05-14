import { Template } from "@/components/UI/Template";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Template>
      {children}
    </Template>
  );
}
