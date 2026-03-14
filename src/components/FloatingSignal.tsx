import { motion } from 'framer-motion'
import { ArrowUpRight, TrendingUp } from 'lucide-react'

interface FloatingSignalProps {
  asset: string
  signalType: 'LONG' | 'SHORT'
  entry: string
  target: string
  profit: string
  delay?: number
  duration?: number
  position: { top?: string; bottom?: string; left?: string; right?: string }
}

export default function FloatingSignal({
  asset,
  signalType,
  entry,
  target,
  profit,
  delay = 0,
  duration = 6,
  position,
}: FloatingSignalProps) {
  const isLong = signalType === 'LONG'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: 'easeOut' }}
      className="absolute hidden md:block z-10 pointer-events-none"
      style={{ ...position }}
    >
      <motion.div
        animate={{
          y: ['0%', '-3%', '0%'],
          rotate: ['0deg', '1deg', '-1deg', '0deg'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
          delay,
        }}
        className="glassmorphism-card p-4 min-w-[200px]"
      >
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-white tracking-wide">{asset}</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-bold tracking-wider ${
                isLong
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}
            >
              {signalType}
            </span>
          </div>
          <ArrowUpRight
            size={16}
            className={isLong ? 'text-green-400' : 'text-red-400'}
            style={{ transform: isLong ? 'none' : 'rotate(90deg)' }}
          />
        </div>

        <div className="space-y-1 mb-3 text-xs font-sans text-vanta-200">
          <div className="flex justify-between">
            <span className="text-vanta-400">Entry</span>
            <span>{entry}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-vanta-400">Target</span>
            <span className="text-luxury-gold">{target}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-luxury-gold text-sm font-semibold">
            <TrendingUp size={14} />
            {profit}
          </div>
          <span className="text-[9px] text-vanta-400 uppercase tracking-widest">Filled</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
