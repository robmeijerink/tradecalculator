export type TradeType = 'long' | 'short'

export interface TradeInput {
  account_balance: number
  risk: number
  type: TradeType
  order_price: number | null
  exit_price: number | null
  stop_loss: number | null
}

export interface TradeResults {
  loss?: string
  order_size?: string
  profit?: string | null
  profit_on_account_percentage?: string | null
  rrr?: string | null
}

export interface Order {
  order_price?: number
  qty?: number
  stop_loss?: number
  take_profit?: number | null
}
