import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const profile = () => {
  const Router = useRouter();

  async function handleSignOut() {
    const res = await axios.post("/api/auth/Logout");
    if (res.data.success) {
      Router.push("/");
    } else {
      Router.push("/error");
    }
  }
  return (
    <div>
      <section className="absolute bottom-5 left-0 w-full justify-center flex">
        <button
          className="bg-red-500 p-3 rounded-2xl w-[90%] cursor-pointer"
          onClick={handleSignOut}
        >
          Log out
        </button>
      </section>
    </div>
  );
};

export default profile;
