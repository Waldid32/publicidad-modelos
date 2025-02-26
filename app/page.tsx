'use client';

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { SearchModels } from '@/components/SearchModels';
import { TopModels } from '@/components/TopModels';
import { ModelList } from '@/components/ModelList';
import { ModelData } from '@/types/types';

export default function Home() {
  const [dataModels, setDataModels] = useState<ModelData[]>([]);

  return (
    <div>
      <Navbar />
      <div className="pt-32 pb-10 border-b border-gray-200 bg-transparent">
        <SearchModels setDataModels={setDataModels} />
      </div>
      <div>
        <h1 className="font-bold text-2xl text-center py-5 bg-segundary text-white">
          Top de Modelos
        </h1>
        {dataModels.length === 0 ? (
          <div className="flex justify-center items-center">
            <TopModels />
          </div>
        ) : (
          <div className="flex justify-center items-center">
            <ModelList dataModels={dataModels} />
          </div>
        )}
      </div>
    </div>
  );
}
