import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-red-100">
      <Link className="btn btn-primary" href='/auth/home'>Profile</Link>
    </div>
  );
}
