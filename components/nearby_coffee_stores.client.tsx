"use client";

import { useEffect, useState } from "react";
import Banner from "./banner.client";
import useTrackLocation from "@/hooks/use_track_location";
import Card from "./card.server";
import { fetchCoffeeStores } from "@/lib/coffee_stores";

type CoffeeStoreType = {
  id: string;
  name: string;
  imgUrl: string;
  address: string;
};

export default function NearbyCoffeeStores() {
  const {
    handleTrackLocation,
    isFindingLocation,
    longLat,
    locationErrorMessage,
  } = useTrackLocation();

  const [coffeeStores, setCoffeeStores] = useState([]);

  const handleOnClick = () => {
    handleTrackLocation();
  };

  useEffect(() => {
    async function coffeeStoresByLocation() {
      if (longLat) {
        try {
          const limit = 10;
          const response = await fetch(
            `/api/getCoffeeStoresByLocation?longLat=${longLat}&limit=${limit}`
          );
          const coffeeStores = await response.json();
          setCoffeeStores(coffeeStores);
        } catch (error) {
          console.error(error);
        }
      }
    }

    coffeeStoresByLocation();
  }, [longLat]);

  return (
    <div>
      <Banner
        handleOnClick={handleOnClick}
        buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
      />
      {locationErrorMessage && <p>Error: {locationErrorMessage}</p>}

      <div className="mt-20">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {coffeeStores?.length > 0 &&
            coffeeStores.map((coffeeStore: CoffeeStoreType, idx: number) => (
              <Card
                key={`${coffeeStore.name}-${coffeeStore.id}`}
                name={coffeeStore.name}
                imgUrl={coffeeStore.imgUrl}
                href={`/coffee-store/${coffeeStore.id}?idx=${idx}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
