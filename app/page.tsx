import Link from "next/link";
import { ArrowRight, Shirt, ShoppingBag as BagIcon, Footprints, CircleDot, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import HeroCarousel from "@/components/home/HeroCarousel";

// Mock Data for "Featured Pieces" (prices in PKR)
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Silk Evening Gown",
    price: 45999,
    category: "Dresses",
    images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1966&auto=format&fit=crop"]
  },
  {
    id: "2",
    name: "Cashmere Sweater",
    price: 22999,
    category: "Tops",
    images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=2005&auto=format&fit=crop"]
  },
  {
    id: "3",
    name: "Pleated Midi Skirt",
    price: 18499,
    category: "Bottoms",
    images: ["https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1974&auto=format&fit=crop"]
  },
  {
    id: "4",
    name: "Leather Tote Bag",
    price: 52999,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2138&auto=format&fit=crop"]
  }
];

const CATEGORIES = [
  { name: "Dresses", icon: Shirt, color: "bg-blue-50 dark:bg-blue-950", iconColor: "text-blue-500" },
  { name: "Tops", icon: Sparkles, color: "bg-pink-50 dark:bg-pink-950", iconColor: "text-pink-500" },
  { name: "Bottoms", icon: CircleDot, color: "bg-indigo-50 dark:bg-indigo-950", iconColor: "text-indigo-500" },
  { name: "Outerwear", icon: BagIcon, color: "bg-amber-50 dark:bg-amber-950", iconColor: "text-amber-500" },
  { name: "Accessories", icon: Footprints, color: "bg-emerald-50 dark:bg-emerald-950", iconColor: "text-emerald-500" },
];

export default function Home() {
  return (
    <div className="flex flex-col">

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Shop by Category */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-semibold text-center mb-10">Shop by Category</h2>
        <div className="flex justify-center gap-8 md:gap-12 flex-wrap">
          {CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/shop?category=${cat.name}`}
                className="flex flex-col items-center gap-3 group"
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${cat.color} flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-lg`}>
                  <IconComponent className={`h-7 w-7 md:h-8 md:w-8 ${cat.iconColor}`} />
                </div>
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{cat.name}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Pieces */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Featured Pieces</h2>
          <Link href="/shop" className="text-primary hover:underline flex items-center gap-1 text-sm font-medium">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-secondary/50 dark:bg-secondary/20 py-16 mt-12">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Join the NoveraFits Community</h2>
          <p className="text-muted-foreground mb-8">
            Be the first to know about new arrivals, exclusive offers, and styling tips.
          </p>
          <form className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full px-5 bg-background"
            />
            <Button type="submit" className="rounded-full px-6">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

    </div>
  );
}
