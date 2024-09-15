"use client";

import { useSearchParams } from "next/navigation";

export default function Season() {
  const searchParams = useSearchParams();
  const season = searchParams.get("season");
  return (
    <div>
      <p>highlight season {season ? season : "yo"}</p>
    </div>
  );
}
