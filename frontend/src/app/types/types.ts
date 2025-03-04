export interface IMessage {
  id: string
  session_id: string
  content: string
  like_status: "none" | "like" | "dislike"
  role: "user" | "assistant"
  response_time: number
  token_count: number
  created: string
  updated: string
}
