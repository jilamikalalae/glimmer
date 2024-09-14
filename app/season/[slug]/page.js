"use client";

import { useRouter } from "next/navigation";

export default function Season({ params }) {
  const { slug } = params;
  return (
    <div>
      <p>highlight season {slug}</p>
    </div>
  );
}
