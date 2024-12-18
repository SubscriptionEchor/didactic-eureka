import { motion } from 'framer-motion'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { SOCKET_API } from "@/services/wsServices"

const WatermarkPattern: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex items-center gap-3 text-3xl font-bold tracking-widest opacity-[0.04] transform-rotate-12">

          <img src="/assets/favicons/apple-touch-icon.png" alt="Logo" className="h-9" />
          Pistol Signals
        </div>
      </div>
    </div>
  )
}

function CoinRow({ data }) {
  const symbol = data.s.replace("USDT", "").toLowerCase()
  return (
    <motion.div
      animate={{ opacity: 1, x: 0 }}
      className="flex h-100 items-center justify-between py-1 hover:bg-white/5 px-3 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 p-1.5">
          <img src={`https://d2mmqc3v0skn2o.cloudfront.net/coin/${symbol}.png`} alt={symbol} className="w-full h-full" />
        </div>
        <span className="font-medium">{symbol?.toUpperCase()}</span>
      </div>
      <div className="text-right">
        <div className="font-medium ">${data?.c}</div>
        <div className={`flex justify-end gap-1 text-sm ${data?.P > 0 ? 'text-emerald-500' : 'text-red-500'}`}>
          {data?.P > 0 ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownRight className="w-4 h-4" />
          )}
          {data?.P}%
        </div>
      </div>
    </motion.div>
  )
}

interface GainersLosersProps {
  type: 'gainers' | 'losers'
  data: any[]
}

export function GainersLosers({ data, type }: GainersLosersProps) {
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div className="absolute -inset-[1px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />

      <div className="relative rounded-xl p-5 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">{type === 'gainers' ? 'Top Gainers' : 'Top Losers'}</h3>
        </div>
        <div className="space-y-2">
          {data.map((coin, index) => (
            <CoinRow key={index} data={coin} />
          ))}
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="relative bg-[#111] rounded-xl">
      <WatermarkPattern />
      <div className="relative z-10">
        {cardContent}
      </div>
    </div>
  )
}

export default GainersLosers