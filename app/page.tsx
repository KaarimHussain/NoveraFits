import { Hero } from "@/components/home/Hero";
import { CategoryStrip } from "@/components/home/CategoryStrip";
import { NewArrivals } from "@/components/home/NewArrivals";
import { PromoSplit } from "@/components/home/PromoSplit";
import { EditorialGrid } from "@/components/home/EditorialGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryStrip />
      <NewArrivals />
      <PromoSplit />
      <EditorialGrid />
    </>
  );
}
