import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductAffiliateSharePage } from "@/mansa/components/dashboard/ProductAffiliateSharePage";

describe("ProductAffiliateSharePage", () => {
  it("affiche le nouveau texte et partage le lien affilié du produit", () => {
    const onBack = vi.fn();
    render(
      <ProductAffiliateSharePage
        productName="Cours photo"
        affiliateUrl="https://mansa.example/affiliate/ABC123"
        onBack={onBack}
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Deviens affilié et gagne l’argent sur ta commission.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Partager sur WhatsApp" })).toHaveAttribute(
      "href",
      expect.stringContaining(encodeURIComponent("https://mansa.example/affiliate/ABC123")),
    );
    expect(screen.getByRole("button", { name: "Partager le lien affilié" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Retour à la fiche produit" }));
    expect(onBack).toHaveBeenCalledOnce();
  });
});
