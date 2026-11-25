import { useState } from "react";
import { Pencil, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AffiliateTable, affiliateCell } from "./AffiliateTable";

export interface AffiliateManagedOffer { id: string; name: string; rate?: number; }

export function CreatorAffiliateManagement({ offers, onEditOffer }: { offers: readonly AffiliateManagedOffer[]; onEditOffer?: (id: string) => void }) {
  const [instructions, setInstructions] = useState("");
  return <div className="space-y-10 py-6">
    <section aria-labelledby="affiliate-instructions-title">
      <h2 id="affiliate-instructions-title" className="flex items-center gap-2 text-base font-semibold"><FileText className="size-4" /> Instructions</h2>
      <p className="mt-2 text-sm text-muted-foreground">Ajoute des instructions claires pour guider les affiliés dans la promotion de ton offre.</p>
      <label htmlFor="affiliate-instructions" className="sr-only">Instructions pour les affiliés</label>
      <textarea id="affiliate-instructions" value={instructions} onChange={(event) => setInstructions(event.target.value)} rows={5} placeholder="Messages à partager, arguments clés, pratiques à éviter…" className="mt-4 w-full resize-y rounded-lg border border-input bg-background p-4 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-ring" />
      <p className="mt-2 text-xs text-muted-foreground" role="status">Brouillon non publié — l’enregistrement des instructions n’est pas encore disponible.</p>
    </section>
    <section aria-labelledby="affiliate-commissions-title">
      <h2 id="affiliate-commissions-title" className="mb-4 text-base font-semibold">Commission</h2>
      <AffiliateTable columns={["Offre", "Taux d’affiliation", "% sur le produit"]} empty={offers.length ? undefined : "Aucune offre dans cette entreprise."}>
        {offers.map((offer) => <tr key={offer.id}>
          <td className={`${affiliateCell} font-medium`}>{offer.name}</td>
          <td className={affiliateCell}><span className={offer.rate && offer.rate > 0 ? "text-success-foreground" : "text-muted-foreground"}>{offer.rate === undefined ? "Non configuré" : offer.rate > 0 ? "Activé" : "Désactivé"}</span></td>
          <td className={affiliateCell}><div className="flex flex-wrap items-center gap-3"><span>{offer.rate === undefined ? "—" : `${offer.rate} %`}</span><Button variant="ghost" size="icon" className="min-h-11 min-w-11" disabled={!onEditOffer} title={`Modifier la commission de ${offer.name}`} aria-label={`Modifier la commission de ${offer.name}`} onClick={() => onEditOffer?.(offer.id)}><Pencil /></Button></div></td>
        </tr>)}
      </AffiliateTable>
    </section>
  </div>;
}