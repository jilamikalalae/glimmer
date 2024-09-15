"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
export default function Season() {
  const searchParams = useSearchParams();
  const season = searchParams.get("season");
  return (
    // <Suspense>
    <div>
      <p>highlight season {season ? season : "yo"}</p>
    </div>
    // </Suspense>
  );
}
