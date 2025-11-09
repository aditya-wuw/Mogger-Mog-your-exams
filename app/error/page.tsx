import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div>
      Error try again later{" "}
      <Link className="hover:cursor-pointer underline" href={"/"}>
        Go back home
      </Link>
    </div>
  );
};

export default page;
