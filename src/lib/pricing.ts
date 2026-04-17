export type PriceBreakdown = {
  netter: number;
  total: number;
  lines: { label: string; amount: number }[];
};

const PRIS_HVERDAG = 1200;  // man–tor
const PRIS_HELG = 1900;     // fre–søn
const PRIS_LANGHELG = 4800; // 3 netter flat
const PRIS_UKE = 8500;      // 7 netter flat

export function beregnPris(innsjekk: string, utsjekk: string): PriceBreakdown {
  const start = new Date(innsjekk);
  const end = new Date(utsjekk);
  const netter = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  if (netter <= 0) return { netter: 0, total: 0, lines: [] };

  const lines: { label: string; amount: number }[] = [];

  // Full uker
  const heleUker = Math.floor(netter / 7);
  const resterendeNetter = netter % 7;

  if (heleUker > 0) {
    lines.push({
      label: heleUker === 1 ? "1 uke (7 netter)" : `${heleUker} uker (${heleUker * 7} netter)`,
      amount: heleUker * PRIS_UKE,
    });
  }

  if (resterendeNetter === 3) {
    lines.push({ label: "Langhelg (3 netter)", amount: PRIS_LANGHELG });
  } else if (resterendeNetter > 0) {
    // Telle hverdager og helgedager i resterende netter
    const restStart = new Date(start);
    restStart.setDate(restStart.getDate() + heleUker * 7);
    const current = new Date(restStart);

    let hverdager = 0;
    let helgenetter = 0;

    for (let i = 0; i < resterendeNetter; i++) {
      const dag = current.getDay(); // 0=sø, 5=fr, 6=lø
      if (dag === 0 || dag === 5 || dag === 6) {
        helgenetter++;
      } else {
        hverdager++;
      }
      current.setDate(current.getDate() + 1);
    }

    if (hverdager > 0) {
      lines.push({
        label: `${hverdager} hverdag${hverdager > 1 ? "er" : ""} × ${PRIS_HVERDAG} kr`,
        amount: hverdager * PRIS_HVERDAG,
      });
    }
    if (helgenetter > 0) {
      lines.push({
        label: `${helgenetter} helgenatt${helgenetter > 1 ? "er" : ""} × ${PRIS_HELG} kr`,
        amount: helgenetter * PRIS_HELG,
      });
    }
  }

  const total = lines.reduce((sum, l) => sum + l.amount, 0);
  return { netter, total, lines };
}

export function formaterPris(kr: number): string {
  return kr.toLocaleString("nb-NO") + " kr";
}
