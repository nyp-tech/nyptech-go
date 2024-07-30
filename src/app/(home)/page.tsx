import { db } from "@/lib/db";
import Link from "next/link";

export default async function Page() {
  const events = await db.event.findMany()
  return (
    <main className={"h-full flex items-center justify-center"}>
      <div
        className={
          "text-center flex flex-col container break-words w-96 m-5 md:w-full"
        }
      >
        <img
          className={"mb-4 size-[200px] mx-auto"}
          src={"/assets/logo.png"}
          alt={"Icon"}
        />
        <h1 className={"text-2xl font-bold break-words m-5"}>
          NYP Technopreneurship Club
        </h1>
        <p className={"mx-auto max-w-[50%] max-lg:max-w-[90%] text-base"}>
          Develop an entrepreneurial mindset across the SIT student body through
          engagements and real-world problem solving with the application of
          technology.
        </p>
        <div className={"mt-6"}>
          <Link
            className={"btn btn-primary"}
            href={"https://nyptech.vercel.app"}
          >
            Learn more!
          </Link>
          <Link
            className={"btn btn-primary"}
            href={"/create-event"}
          >
            Create Event
          </Link>
          
        </div>
        <div className="carousel carousel-center bg-neutral rounded-box max-w-md space-x-4 p-4">

  {events.map((events)=>(
  <div className="carousel-item" key={events.id}>
<div className="card bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={events.img}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{events.title}</h2>
    <p>{events.location}</p>
    <p>{events.description}</p>
    
    <div className="card-actions justify-end">
    <div className="badge badge-outline">{events.club}</div>

      <Link href={events.signup} className="btn btn-primary">Sign Up</Link>
    </div>
  </div>
</div>
</div>
          ))}
</div>

      </div>
    </main>
  );
}