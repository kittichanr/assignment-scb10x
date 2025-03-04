import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()

  const flaskApiUrl = "http://127.0.0.1:5000/chat/regenerate"

  const response = await fetch(flaskApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("Authorization") ?? "",
    },
    body: JSON.stringify(body),
  })

  return new NextResponse(response.body, {
    status: response.status,
    headers: { "Content-Type": "text/event-stream" },
  })
}
