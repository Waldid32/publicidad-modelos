"use client";
import { useState } from "react";

import { BoxModel } from "@/components/BoxModel";
import { Navbar } from "@/components/Navbar";
import { SearchModels } from "@/components/SearchModels";
import { ModelData } from "@/utils/types";

export default function Home() {
  const [dataModels, setDataModels] = useState<ModelData[]>([]);

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
