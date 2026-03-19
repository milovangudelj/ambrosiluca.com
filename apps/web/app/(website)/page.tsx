import { sanityFetch } from "@repo/sanity/live";
import { INFO_QUERY } from "@repo/sanity/queries";

export default async function Home() {
  const { data } = await sanityFetch({ query: INFO_QUERY });

  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="max-w-xl text-center">
        {data?.text ? (
          <p className="text-6xl font-display">{data.text}</p>
        ) : (
          <p className="text-gray-400">
            No info yet. Open the Studio and add some text.
          </p>
        )}
      </div>
    </main>
  );
}
