import fs from 'fs';
import path from 'path';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import DividendYield from '@/components/DividendYield';

type DividendInfo = {
  cumRegNeg: string;
  exRegNeg: string;
  cumCash: string;
  exCash: string;
  recordingDate: string;
  paymentDate: string;
  dgtSubmission: string;
};

type Stock = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  dividendPerShare: number;
  dividend: DividendInfo;
};

async function getStocks(): Promise<Stock[]> {
  const filePath = path.join(process.cwd(), 'data', 'stocks.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export default async function HomePage() {
  const stocks = await getStocks();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">📊 Daftar Saham & Dividen</h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {stocks.map((stock) => {
          const isPositive = stock.change > 0;
          const isNegative = stock.change < 0;
          const trendIcon = isPositive ? <ArrowUpRight size={18} /> :
                             isNegative ? <ArrowDownRight size={18} /> :
                             <Minus size={18} />;

          const changeColor = isPositive
            ? 'text-green-600 bg-green-100'
            : isNegative
            ? 'text-red-600 bg-red-100'
            : 'text-gray-600 bg-gray-100';

          return (
            <div
              key={stock.symbol}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition duration-200 p-6 flex flex-col justify-between border border-gray-100"
            >
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{stock.name}</h2>
                  <p className="text-sm text-gray-500">{stock.symbol}</p>
                </div>

                <div className="mb-4">
                  <p className="text-lg font-bold text-gray-900">Rp {stock.price.toLocaleString()}</p>
                  <span
                    className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${changeColor}`}
                  >
                    {trendIcon}
                    {stock.change > 0 ? '+' : ''}
                    {stock.change}%
                  </span>
                </div>

                <DividendYield price={stock.price} dividendPerShare={stock.dividendPerShare} />

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700 mt-6">
                  <div>
                    <p className="text-gray-500 text-xs">Cum Reg/Neg</p>
                    <p>{stock.dividend.cumRegNeg}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Ex Reg/Neg</p>
                    <p>{stock.dividend.exRegNeg}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Cum Tunai</p>
                    <p>{stock.dividend.cumCash}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Ex Tunai</p>
                    <p>{stock.dividend.exCash}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Recording Date</p>
                    <p>{stock.dividend.recordingDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Pembayaran</p>
                    <p>{stock.dividend.paymentDate}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-500 text-xs">Penyerahan SKD/DGT</p>
                    <p>{stock.dividend.dgtSubmission}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
