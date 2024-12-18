import { Cryptocurrency, Category } from './types';

export const categories: Category[] = [
  { id: 'all', label: 'All' },
  { id: 'defi', label: '🔥 DeFi' },
  { id: 'nft', label: 'NFTs' },
  { id: 'gaming', label: '🎮 Gaming' },
  { id: 'ai', label: '🤖 AI' }
];

export const cryptoData: Cryptocurrency[] = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '$98,029.35',
    change1h: '+0.05%',
    change24h: '-1.76%',
    change7d: '+2.39%',
    marketCap: '$1,940.36B',
    volume: '$113.95B',
    supply: '19.79M BTC',
    isPositive1h: true,
    isPositive24h: false,
    isPositive7d: true,
    logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: '$3,677.88',
    change1h: '-1.17%',
    change24h: '-6.10%',
    change7d: '+2.30%',
    marketCap: '$442.98B',
    volume: '$65.74B',
    supply: '120.44M ETH',
    isPositive1h: false,
    isPositive24h: false,
    isPositive7d: true,
    logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
  },
  {
    id: 3,
    name: 'Solana',
    symbol: 'SOL',
    price: '$147.25',
    change1h: '+2.34%',
    change24h: '+5.67%',
    change7d: '+15.89%',
    marketCap: '$64.32B',
    volume: '$8.91B',
    supply: '437.2M SOL',
    isPositive1h: true,
    isPositive24h: true,
    isPositive7d: true,
    logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png'
  },
  {
    id: 4,
    name: 'BNB',
    symbol: 'BNB',
    price: '$456.78',
    change1h: '-0.45%',
    change24h: '+1.23%',
    change7d: '-2.78%',
    marketCap: '$69.85B',
    volume: '$12.34B',
    supply: '153.8M BNB',
    isPositive1h: false,
    isPositive24h: true,
    isPositive7d: false,
    logo: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png'
  },
  {
    id: 5,
    name: 'Cardano',
    symbol: 'ADA',
    price: '$0.89',
    change1h: '+1.12%',
    change24h: '+3.45%',
    change7d: '+8.90%',
    marketCap: '$31.45B',
    volume: '$4.56B',
    supply: '35.28B ADA',
    isPositive1h: true,
    isPositive24h: true,
    isPositive7d: true,
    logo: 'https://assets.coingecko.com/coins/images/975/small/cardano.png'
  },
  {
    id: 6,
    name: 'XRP',
    symbol: 'XRP',
    price: '$0.67',
    change1h: '-0.89%',
    change24h: '-2.34%',
    change7d: '+4.56%',
    marketCap: '$36.78B',
    volume: '$5.67B',
    supply: '54.89B XRP',
    isPositive1h: false,
    isPositive24h: false,
    isPositive7d: true,
    logo: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png'
  },
  {
    id: 7,
    name: 'Avalanche',
    symbol: 'AVAX',
    price: '$45.67',
    change1h: '+3.21%',
    change24h: '+7.89%',
    change7d: '+21.34%',
    marketCap: '$16.78B',
    volume: '$3.45B',
    supply: '367.8M AVAX',
    isPositive1h: true,
    isPositive24h: true,
    isPositive7d: true,
    logo: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png'
  },
  {
    id: 8,
    name: 'Polkadot',
    symbol: 'DOT',
    price: '$9.45',
    change1h: '-1.23%',
    change24h: '-4.56%',
    change7d: '+1.23%',
    marketCap: '$12.34B',
    volume: '$2.34B',
    supply: '1.31B DOT',
    isPositive1h: false,
    isPositive24h: false,
    isPositive7d: true,
    logo: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png'
  },
  {
    id: 9,
    name: 'Chainlink',
    symbol: 'LINK',
    price: '$18.92',
    change1h: '+2.15%',
    change24h: '+8.34%',
    change7d: '+15.67%',
    marketCap: '$11.23B',
    volume: '$1.89B',
    supply: '589.2M LINK',
    isPositive1h: true,
    isPositive24h: true,
    isPositive7d: true,
    logo: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png'
  },
  {
    id: 10,
    name: 'Polygon',
    symbol: 'MATIC',
    price: '$1.23',
    change1h: '-0.78%',
    change24h: '+4.56%',
    change7d: '+9.87%',
    marketCap: '$9.87B',
    volume: '$1.45B',
    supply: '8.02B MATIC',
    isPositive1h: false,
    isPositive24h: true,
    isPositive7d: true,
    logo: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png'
  },
  {
    id: 11,
    name: 'Uniswap',
    symbol: 'UNI',
    price: '$7.84',
    change1h: '+1.45%',
    change24h: '-2.34%',
    change7d: '+5.67%',
    marketCap: '$5.89B',
    volume: '$892.3M',
    supply: '752.4M UNI',
    isPositive1h: true,
    isPositive24h: false,
    isPositive7d: true,
    logo: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png'
  },
  {
    id: 12,
    name: 'Cosmos',
    symbol: 'ATOM',
    price: '$11.56',
    change1h: '-1.23%',
    change24h: '+3.45%',
    change7d: '+7.89%',
    marketCap: '$4.32B',
    volume: '$567.8M',
    supply: '374.2M ATOM',
    isPositive1h: false,
    isPositive24h: true,
    isPositive7d: true,
    logo: 'https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png'
  },
  {
    id: 13,
    name: 'Algorand',
    symbol: 'ALGO',
    price: '$0.45',
    change1h: '+0.89%',
    change24h: '-1.23%',
    change7d: '+4.56%',
    marketCap: '$3.45B',
    volume: '$234.5M',
    supply: '7.67B ALGO',
    isPositive1h: true,
    isPositive24h: false,
    isPositive7d: true,
    logo: 'https://assets.coingecko.com/coins/images/4380/small/download.png'
  },
  {
    id: 14,
    name: 'VeChain',
    symbol: 'VET',
    price: '$0.034',
    change1h: '+2.34%',
    change24h: '+6.78%',
    change7d: '+12.34%',
    marketCap: '$2.78B',
    volume: '$189.4M',
    supply: '81.5B VET',
    isPositive1h: true,
    isPositive24h: true,
    isPositive7d: true,
    logo: 'https://assets.coingecko.com/coins/images/1167/small/VeChain-Logo-768x725.png'
  },
  {
    id: 15,
    name: 'Stellar',
    symbol: 'XLM',
    price: '$0.12',
    change1h: '-0.67%',
    change24h: '+2.34%',
    change7d: '+5.67%',
    marketCap: '$3.21B',
    volume: '$278.9M',
    supply: '26.7B XLM',
    isPositive1h: false,
    isPositive24h: true,
    isPositive7d: true,
    logo: 'https://assets.coingecko.com/coins/images/100/small/Stellar_symbol_black_RGB.png'
  }
];