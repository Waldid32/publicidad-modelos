"use client";
import { useState } from "react";

import { BoxModel } from "@/components/BoxModel";
import { Navbar } from "@/components/Navbar";
import { SearchModels } from "@/components/SearchModels";

export default function Home() {
  const [dataModels, setDataModels] = useState([]);

  console.log(dataModels);

  return (
    <div>
      <Navbar />
      <div className="pt-32 pb-5 border-b border-gray-200 dark:border-gray-600 bg-primary">
        <SearchModels setDataModels={setDataModels} />
      </div>

      <div>
        <BoxModel dataModels={dataModels} />
      </div>
    </div>
  );
}
