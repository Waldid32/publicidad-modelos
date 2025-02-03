"use client";
import { useState } from "react";

import { Navbar } from "@/components/Navbar";
import { ModelData } from "@/types/types";
import { TopModels } from "@/components/TopModels";

export default function Home() {
  const [dataModels, setDataModels] = useState<ModelData[]>([]);

  return (
    <div>
      <Navbar />
      <div></div>
      <TopModels />
    </div>
  );
}
