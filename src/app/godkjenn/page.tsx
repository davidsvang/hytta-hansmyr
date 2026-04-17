import Link from "next/link";

export default function GodkjennPage({
  searchParams,
}: {
  searchParams: { status?: string; navn?: string };
}) {
  const { status, navn } = searchParams;

  if (status === "ok") {
    return (
      <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-6">
        <div className="bg-white rounded-sm border border-[#2C2A1E]/10 p-10 max-w-md text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="font-playfair text-2xl text-[#2C2A1E] mb-3">
            Booking godkjent!
          </h1>
          <p className="text-[#5F5E5A] font-lato font-light leading-relaxed mb-6">
            {navn ? `${decodeURIComponent(navn)} har` : "Gjesten har"} fått en bekreftelsesmail, og kalenderen er oppdatert automatisk.
          </p>
          <Link
            href="/"
            className="label-caps text-[#3B5E2B] border border-[#3B5E2B] px-5 py-2 rounded hover:bg-[#EAF3DE] transition-colors text-sm"
          >
            Tilbake til forsiden
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-6">
      <div className="bg-white rounded-sm border border-[#2C2A1E]/10 p-10 max-w-md text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="font-playfair text-2xl text-[#2C2A1E] mb-3">
          Lenken er ugyldig
        </h1>
        <p className="text-[#5F5E5A] font-lato font-light leading-relaxed">
          Denne godkjenningslenken er allerede brukt eller har utløpt.
        </p>
      </div>
    </div>
  );
}
