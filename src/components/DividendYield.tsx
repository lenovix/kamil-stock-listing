'use client';
import { useState } from 'react';

type DividendYieldProps = {
  price: number;
  dividendPerShare: number;
};

export default function DividendYield({ price, dividendPerShare }: DividendYieldProps) {
  const [modal, setModal] = useState<number>(5000000); // default modal 5 juta

  const yieldPercentage = ((dividendPerShare / price) * 100).toFixed(2);
  const shares = Math.floor(modal / price);
  const totalDividend = shares * dividendPerShare;

  return (
    <div className="mt-4 text-sm text-gray-700">
      <p className="text-gray-500 text-xs">Dividen per Lembar</p>
      <p className="font-medium">Rp {dividendPerShare.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>

      <p className="text-gray-500 text-xs mt-2">Dividen Yield</p>
      <p className="font-semibold text-indigo-600">{yieldPercentage}%</p>

      <div className="mt-4">
        <label htmlFor="modalInput" className="block text-gray-500 text-xs mb-1">Modal Investasi (Rp)</label>
        <input
          id="modalInput"
          type="number"
          value={modal}
          onChange={(e) => setModal(Number(e.target.value))}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          min={0}
          step={10000}
        />
      </div>

      <div className="mt-3 bg-indigo-50 rounded-md p-3">
        <p>
          Dengan modal <span className="font-semibold">Rp {modal.toLocaleString()}</span>, kamu dapat membeli <span className="font-semibold">{shares.toLocaleString()}</span> lembar saham.
        </p>
        <p>
          Total dividen yang kamu dapatkan adalah <span className="font-semibold">Rp {totalDividend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>.
        </p>
      </div>
    </div>
  );
}
