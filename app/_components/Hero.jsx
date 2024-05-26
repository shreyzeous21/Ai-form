import React from "react";

function Hero() {
  return (
    <section className=" h-[540px] bg-[url('/grid.svg')]">
      <div className="mx-auto max-w-screen-xl z-30 px-4 pt-32 lg:flex  ">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Create your Form
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              In Seconds Not in Hours{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-gray-500">
            Generate, publish and share your form right away with AI. Dive into
            insightful results, charts and analytics.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block bg-black text-white hover:text-black hover:bg-primary w-full rounded px-12 py-3 text-sm font-medium  shadow  focus:outline-none focus:ring  sm:w-auto"
              href="https://github.com/shreyzeous21"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
