"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

// Client-side browse/search over the careers index. Receives a slim list from
// the server component — search happens entirely on-device.

export interface CareerIndexEntry {
  slug: string;
  title: string;
  cluster: string;
}

interface Props {
  careers: CareerIndexEntry[];
}

export default function CareerBrowser({ careers }: Props) {
  const [query, setQuery] = useState("");
  const [cluster, setCluster] = useState<string | null>(null);

  const clusters = useMemo(
    () => [...new Set(careers.map((c) => c.cluster))].sort(),
    [careers]
  );

  const shown = careers.filter((c) => {
    if (cluster && c.cluster !== cluster) return false;
    if (query && !c.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a career… (searches only on this page, sends nothing)"
          className="flex-1"
          aria-label="Search careers"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setCluster(null)}
          className={`btn text-xs px-4 py-2 ${cluster === null ? "btn-primary" : "btn-ghost"}`}
        >
          All worlds
        </button>
        {clusters.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCluster(cluster === c ? null : c)}
            className={`btn text-xs px-4 py-2 ${cluster === c ? "btn-primary" : "btn-ghost"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="text-text-secondary evidence">
          Nothing on the shelf by that name yet — the catalog grows as we map
          more of the working world. Try another word, or another world.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shown.map((c) => (
            <Link
              key={c.slug}
              href={`/career-cards/${c.slug}`}
              className="card blueprint p-6 flex flex-col group"
            >
              <span className="font-mono text-[10px] uppercase tracking-[2px] text-gold mb-2">
                {c.cluster}
              </span>
              <h3 className="text-xl group-hover:text-gold transition-colors">
                {c.title}
              </h3>
              <span className="mt-4 text-sm font-semibold text-gold">
                Make this card →
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
