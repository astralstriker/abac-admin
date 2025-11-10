"use client";

import { ABACProvider, PolicyList } from "@devcraft-ts/abac-admin-react-ui";
import "@devcraft-ts/abac-admin-react-ui/styles.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PoliciesPage() {
  const router = useRouter();
  const [baseURL, setBaseURL] = useState("");

  useEffect(() => {
    // Set baseURL only on client side
    setBaseURL(`${window.location.origin}/api/abac`);
  }, []);

  if (!baseURL) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ABACProvider config={{ baseURL }}>
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <PolicyList
            onCreate={() => router.push("/policies/create")}
            onEdit={(id) => router.push(`/policies/edit/${id}`)}
            onDelete={(id) => console.log("Policy deleted:", id)}
            onView={(id) => router.push(`/policies/view/${id}`)}
          />
        </div>
      </div>
    </ABACProvider>
  );
}
