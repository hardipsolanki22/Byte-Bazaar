import React from "react";
import { Button } from "../lightswind/button";

const Hero: React.FC = () => {

  type CategoriesType = {
    name: string;
    slug: string;
  }

  const categories: CategoriesType[] = [
    { name: "Electronics", slug: "electronics" },
    { name: "Fashion", slug: "fashion" },
    { name: "Home & Kitchen", slug: "home-kitchen" },
    { name: "Books", slug: "books" },
    { name: "Toys & Games", slug: "toys-games" },
    { name: "Sports", slug: "sports" },
    { name: "Beauty", slug: "beauty" },
    { name: "Automotive", slug: "automotive" },
    { name: "Grocery", slug: "grocery" },
    { name: "Health", slug: "health" },
    { name: "Garden", slug: "garden" },
    { name: "Music", slug: "music" },
    { name: "Office Supplies", slug: "office-supplies" },
    { name: "Pet Supplies", slug: "pet-supplies" },
    { name: "Baby Products", slug: "baby-products" },




  ]

  return (
    <section className="w-full items-center justify-center flex flex-col ">

      <div className="flex w-full text-center items-center justify-center
       space-x-2 overflow-x-auto p-2  border-b border-gray-200">
        {categories.map((category, idx) => (
          <Button
            variant="link"
            key={idx}
            className="cursor-pointer"
          >
            {category.name}
          </Button>
        ))}
      </div>

    </section>
  );
};

export default Hero;
