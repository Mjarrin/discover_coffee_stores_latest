import Image from "next/image";
import Banner from "@/components/banner.client";
import Card from "@/components/card.server";
import NearbyCoffeeStores from "@/components/nearby_coffee_stores.client";
import { getDomain } from "@/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coffee Connoisseur",
  description: "Allows you to discover your local coffee shops near you",
  metadataBase: getDomain(),
  alternates: {
    canonical: "/",
  },
};


export default function Home() {
  const coffeeStoreId = "dark-horse-coffee";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NearbyCoffeeStores />
      <Card
        name={coffeeStoreId}
        imgUrl="https://plus.unsplash.com/premium_photo-1673545518947-ddf3240090b1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        href={`/coffee-store/${coffeeStoreId}`}
      />
    </main>
  );
}
