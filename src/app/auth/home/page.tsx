import { PageList } from "@/components/page/Home";
import { Time } from "@/components/page/Home/Time";
export type TPageLink = { name: string; createdAt: string; href: string; }

const pageContentMock: TPageLink[] = [
  { name: "AWS - Quick Start", createdAt: "2024-05-15T08:00:00Z", href: "/4352" },
  { name: "React Basics", createdAt: "2024-05-14T10:30:00Z", href: "/" },
  { name: "Node.js Fundamentals", createdAt: "2024-05-13T14:45:00Z", href: "/" },
  { name: "JavaScript Best Practices", createdAt: "2024-05-12T17:20:00Z", href: "/" },
  { name: "HTML5 Essentials", createdAt: "2024-05-11T09:10:00Z", href: "/" },
  { name: "CSS Mastery", createdAt: "2024-05-10T11:55:00Z", href: "/" },
  { name: "AWS Lambda - Getting Started", createdAt: "2024-05-09T16:30:00Z", href: "/" },
  { name: "Angular Framework", createdAt: "2024-05-08T12:20:00Z", href: "/" },
  { name: "Docker for Web Developers", createdAt: "2024-05-07T13:40:00Z", href: "/" },
  { name: "Vue.js Crash Course", createdAt: "2024-05-06T15:25:00Z", href: "/" },
  { name: "GraphQL Basics", createdAt: "2024-05-05T18:10:00Z", href: "/" },
  { name: "Responsive Web Design", createdAt: "2024-05-04T20:50:00Z", href: "/" },
];

export default function Home() {

  return (
    <div className='h-full flex flex-col p-4 gap-4'>
      <section className="my-4 flex justify-between items-center w-full">
        <article className="prose">
          <h1 className="w-full">Welcome back, Guilherme Coelho</h1>
        </article>
        <Time />
      </section>

      <PageList list={pageContentMock} />
    </div>
  )
}
