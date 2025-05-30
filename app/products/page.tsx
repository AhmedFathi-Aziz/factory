import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductsList } from "@/components/sections/products-list";

export default function ProductsPage() {
  return (
    <>
      <Header />
      <div className="mt-8 sm:mt-12">
        <ProductsList />
      </div>
      <Footer />
    </>
  );
} 