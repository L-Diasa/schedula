const BASE_URL = "http://localhost:3000/events";

export async function getEvents() {
  const res = await fetch(`${BASE_URL}/events`);

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
}

export async function createEvent(newEvent) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEvent),
  });

  if (!res.ok) {
    throw new Error("Failed to create event");
  }

  return res.json();
}
