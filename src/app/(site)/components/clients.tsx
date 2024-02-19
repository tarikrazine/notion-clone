import Image from "next/image";

import { CLIENTS } from "@/lib/constants";

function ClientSection() {
  return (
    <div
      className="after:content['']
        after:dark:from-brand-dark
        before:content['']
        before:dark:from-brand-dark
        flex
        overflow-hidden
        before:absolute
        before:bottom-0
        before:left-0
        before:top-0
        before:z-10
        before:w-20
        before:bg-gradient-to-r
        before:from-background
        before:to-transparent

        after:absolute
        after:bottom-0
        after:right-0
        after:top-0
        after:z-10
        after:w-20
        after:bg-gradient-to-l
        after:from-background
        after:to-transparent
      "
    >
      {[...Array(2)].map((arr) => (
        <div
          key={arr}
          className="animate-slide
              flex
              flex-nowrap
        "
        >
          {CLIENTS.map((client) => (
            <div
              key={client.alt}
              className=" relative
                  m-20
                  flex
                  w-[200px]
                  shrink-0
                  items-center
                "
            >
              <Image
                src={client.logo}
                alt={client.alt}
                width={200}
                className="max-w-none object-contain"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ClientSection;
