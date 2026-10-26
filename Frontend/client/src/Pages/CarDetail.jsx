import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

const money = (n) => "₹" + Number(n || 0).toLocaleString("en-IN");
const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

function CarDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100">
      <div className="mx-auto max-w-5xl p-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="h-5 w-28 animate-pulse rounded-lg bg-slate-200" />
          <div className="h-10 w-20 animate-pulse rounded-xl bg-slate-200" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="h-64 animate-pulse rounded-xl bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100" />
            <div className="mt-3 flex gap-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-12 w-16 animate-pulse rounded-lg bg-slate-200" />
              ))}
            </div>
          </div>
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="h-8 w-3/4 animate-pulse rounded-lg bg-slate-200" />
            <div className="h-9 w-1/2 animate-pulse rounded-lg bg-slate-200" />
            <div className="grid grid-cols-2 gap-4 pt-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                  <div className="h-4 w-28 animate-pulse rounded bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 h-28 animate-pulse rounded-2xl bg-slate-200" />
        <div className="mt-6 h-36 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [active, setActive] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/cars/${id}`)
      .then(({ data }) => setCar(data))
      .catch((err) => setError(err.response?.data?.message || "Car load nahi hui"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <CarDetailSkeleton />;

  if (error || !car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="mx-auto max-w-5xl animate-[fadeInUp_.45s_ease-out] rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
          <p className="mb-4 font-medium text-red-600">{error || "Car nahi mili"}</p>
          <Link
            to="/dashboard"
            className="inline-flex rounded-xl bg-blue-600 px-4 py-2.5 text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:translate-y-0 active:scale-95"
          >
            ← Dashboard
          </Link>
        </div>
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(14px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  let insTone = "";
  let insNote = "";
  if (car.insuranceExpiry) {
    const totalDays = Math.ceil(
      (new Date(car.insuranceExpiry) - Date.now()) / 86400000
    );
    if (totalDays < 0) {
      insTone = "text-red-600 font-medium";
      insNote = " ko Aap Ka Insurance Expire Ho Chuka Hai";
    } else if (totalDays < 30) {
      insTone = "text-red-600 font-medium";
      insNote = ` (Aap ke insurance Expire Hoga In ${totalDays || ""} Days)`;
    }
  } else {
    insNote = "Aap Ke Gadi Ka insurance Abhi khtm Nahi Hua take chill";
  }

  const details = [
    ["Year", car.year],
    ["Category", car.category],
    ["Fuel", car.fuelType],
    ["Transmission", car.transmission],
    ["KM Driven", Number(car.kmDriven || 0).toLocaleString("en-IN")],
    ["Color", car.color || "-"],
    ["Registration No.", car.registrationNumber || "-"],
    [
      "Owner",
      car.ownerCount
        ? `${car.ownerCount}${car.ownerCount === 1 ? "st" : car.ownerCount === 2 ? "nd" : car.ownerCount === 3 ? "rd" : "th"} owner`
        : "-",
    ],
    ["Listed On", fmtDate(car.listedDate || car.createdAt)],
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes softZoom {
          from { opacity: 0; transform: scale(.985); }
          to { opacity: 1; transform: scale(1); }
        }
        .car-detail-enter { animation: fadeInUp .5s ease-out both; }
        .car-detail-image-enter { animation: softZoom .55s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .car-detail-enter, .car-detail-image-enter { animation: none !important; }
          .car-detail-interactive { transition: none !important; }
        }
      `}</style>

      <div className="mx-auto max-w-5xl p-4 sm:p-6">
        <div className="car-detail-enter mb-5 flex items-center justify-between gap-3">
          <Link
            to="/dashboard"
            className="car-detail-interactive inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium text-blue-700 transition-all duration-200 hover:-translate-x-1 hover:bg-white hover:shadow-sm active:scale-95"
          >
            ← Dashboard
          </Link>
          <Link
            to={`/cars/${car._id}/edit`}
            className="car-detail-interactive inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md active:translate-y-0 active:scale-95"
          >
            Edit ✏️
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="car-detail-enter rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            {car.images?.length > 0 ? (
              <>
                <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                  <img
                    src={car.images[active]}
                    alt={car.model}
                    className="car-detail-image-enter h-64 w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {car.images.map((u, i) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show car image ${i + 1}`}
                      aria-pressed={i === active}
                      className={`car-detail-interactive overflow-hidden rounded-lg border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-95 ${
                        i === active
                          ? "scale-[1.03] border-blue-600 ring-2 ring-blue-100"
                          : "border-transparent opacity-75 hover:border-blue-300 hover:opacity-100"
                      }`}
                    >
                      <img src={u} alt={`Car thumbnail ${i + 1}`} className="h-12 w-16 object-cover" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex h-64 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-5xl transition-transform duration-300 hover:scale-[1.01]">
                🚗
              </div>
            )}
          </div>

          <div className="car-detail-enter rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm [animation-delay:100ms] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex items-start justify-between gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {car.brand} {car.model}
              </h1>
              <span
                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
                  car.status === "Sold"
                    ? "bg-red-100 text-red-800"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {car.status}
              </span>
            </div>
            <p className="mt-2 text-3xl font-extrabold tracking-tight text-blue-600">
              💸{money(car.price)}
            </p>
            <p className="text-xs text-slate-500">Listed price</p>

            <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
              {details.map(([k, v], i) => (
                <div
                  key={k}
                  className="rounded-lg p-1 transition-colors duration-200 hover:bg-slate-50"
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="mt-0.5 break-words font-semibold text-slate-800">{v}</dd>
                </div>
              ))}
              <div className="col-span-2 rounded-xl bg-slate-50 p-3">
                <dt className="text-slate-500">Insurance Expiry</dt>
                <dd className={`mt-1 ${insTone || "font-medium text-slate-800"}`}>
                  {fmtDate(car.insuranceExpiry)}{insNote}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {car.description && (
          <div className="car-detail-enter mt-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm [animation-delay:150ms] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
            <h2 className="mb-2 font-semibold text-slate-900">Car Ke Baare ⚡︎</h2>
            <p className="whitespace-pre-line leading-7 text-slate-700">{car.description}</p>
          </div>
        )}

        <div className="car-detail-enter mt-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm [animation-delay:200ms] transition-all duration-300 hover:shadow-lg">
          <h2 className="mb-3 font-semibold text-slate-900">Papers 𓆩😈𓆪</h2>
          {car.documents?.length > 0 ? (
            <ul className="divide-y divide-slate-100">
              {car.documents.map((d) => (
                <li key={d._id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                  <span className="font-medium text-slate-800">📄 {d.name}</span>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noreferrer"
                    className="car-detail-interactive inline-flex rounded-lg px-3 py-2 text-sm font-semibold text-blue-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-700 active:scale-95"
                  >
                    Dekho / Download ↗
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              Hm Pr Bharosa Karke Paper Daaldo Hamare Pass Ekdm Safe Hai 𓆩😈𓆪.
            </p>
          )}
        </div>

        {car.status === "Sold" && (
          <div className="car-detail-enter mt-6 rounded-2xl border border-red-100 border-l-4 border-l-red-400 bg-white p-5 shadow-sm [animation-delay:250ms] transition-all duration-300 hover:shadow-lg">
            <h2 className="mb-3 font-semibold text-slate-900">Sold Details</h2>
            <div className="flex flex-wrap items-center gap-5">
              {car.buyerPhoto ? (
                <a
                  href={car.buyerPhoto}
                  target="_blank"
                  rel="noreferrer"
                  className="car-detail-interactive overflow-hidden rounded-xl transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
                >
                  <img
                    src={car.buyerPhoto}
                    alt="customer"
                    className="h-24 w-24 border object-cover"
                  />
                </a>
              ) : (
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-slate-100 text-3xl">
                  👤
                </div>
              )}
              <dl className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div>
                  <dt className="text-slate-500">Customer</dt>
                  <dd className="font-semibold text-slate-800">{car.buyerName || "-"}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Mobile</dt>
                  <dd className="font-semibold">
                    {car.buyerPhone ? (
                      <a
                        href={`tel:${car.buyerPhone}`}
                        className="car-detail-interactive rounded transition-colors hover:text-blue-700 hover:underline"
                      >
                        {car.buyerPhone}
                      </a>
                    ) : (
                      "-"
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500">Sold Price</dt>
                  <dd className="font-semibold text-slate-800">{money(car.soldPrice)}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">Sold On</dt>
                  <dd className="font-semibold text-slate-800">{fmtDate(car.soldDate)}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
