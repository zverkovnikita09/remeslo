export interface CreateChat {
  good_id: string
  seller_id: string
  buyer_id: string
}

export interface ChatMessage {
  store_chat_id: string
  message: string
}