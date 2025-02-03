export default async function handler(req, res) {
  const { path } = req.query; // Capture API path from query params
  const API_URL = `https://swarfarm.com/api/v2/${path}`;

  try {
    const response = await fetch(API_URL, {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
