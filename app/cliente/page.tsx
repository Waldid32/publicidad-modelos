"use client";

import { BoxModel } from "@/components/BoxModel";
import { SearchModels } from "@/components/SearchModels";
import { TopModels } from "@/components/TopModels";
import { ModelData } from "@/types/types";
import { useState } from "react";

export default function Cliente() {
  const [dataModels, setDataModels] = useState<ModelData[]>([]);

  return (
    <section>
      <div className="py-5 border-b border-gray-200 bg-transparent">
        <SearchModels setDataModels={setDataModels} />
      </div>
      {dataModels.length === 0 ? (
        <div>
          <TopModels />
        </div>
      ) : (
        <div>
          <BoxModel dataModels={dataModels} />
        </div>
      )}
    </section>
  );
}
