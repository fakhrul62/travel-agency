import type { ActionFunctionArgs } from "react-router";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

// 🔧 Updated parser for Gemini output
function parseMarkdownToJson(markdown: string): any {
  try {
    const match = markdown.match(/```(?:json)?\n([\s\S]*?)```/i);
    const jsonStr = match ? match[1] : markdown;
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("❌ Failed to parse Gemini output:", err);
    return null;
  }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const { country, duration, travelStyle, interest, budget, groupType, user } =
    await request.json();

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY!);
  const unsplashApiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY!;
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const prompt = `Return ONLY a valid JSON object with this exact structure:
{
  "name": "A descriptive title for the trip",
  "description": "A brief description of the trip and its highlights not exceeding 100 words",
  "estimatedPrice": "Lowest average price for the trip in USD, e.g. $price",
  "duration": ${duration},
  "budget": "${budget}",
  "travelStyle": "${travelStyle}",
  "country": "${country}",
  "interests": "${interest}",
  "groupType": "${groupType}",
  "bestTimeToVisit": [
    "🌸 Spring (March to May): reason to visit",
    "☀️ Summer (June to August): reason to visit",
    "🍁 Fall (September to November): reason to visit",
    "❄️ Winter (December to February): reason to visit"
  ],
  "weatherInfo": [
    "☀️ Summer: 25–35°C (77–95°F)",
    "🌦️ Monsoon: 20–30°C (68–86°F)",
    "🌧️ Rainy: 18–28°C (64–82°F)",
    "❄️ Winter: 5–15°C (41–59°F)"
  ],
  "location": {
    "city": "Name of the main city or region",
    "coordinates": [latitude, longitude],
    "openStreetMap": "link to OpenStreetMap"
  },
  "itinerary": [
    {
      "day": 1,
      "location": "City/Region Name",
      "activities": [
        { "time": "Morning", "description": "🏰 Activity 1" },
        { "time": "Afternoon", "description": "🖼️ Activity 2" },
        { "time": "Evening", "description": "🍷 Activity 3" }
      ]
    }
    // Continue days up to duration
  ]
}
NO markdown, no explanation. Return only pure JSON.`;

    const textResult = await genAI
      .getGenerativeModel({ model: "gemini-2.0-flash" })
      .generateContent([prompt]);

    const raw = textResult.response.text();
    console.log("🔍 Gemini Raw Output:", raw);

    const trip = parseMarkdownToJson(raw);
    if (!trip || typeof trip !== "object") {
      throw new Error("Invalid trip format");
    }

    const imageResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${country}${interest}${travelStyle}&client_id=${unsplashApiKey}`
    );
    const imageData = await imageResponse.json();
    const imageUrls = imageData.results
      .slice(0, 3)
      .map((img: any) => img.urls?.regular)
      .filter(Boolean);

    const tripData = {
      ...trip,
      imageUrls,
      travelStyle,
      interest,
      groupType,
      budget,
      createdAt: new Date().toISOString(),
      userId: user?._id || null,
    };

    const response = await axios.post(`${API_URL}/trips`, tripData);
    return response.data;
  } catch (error) {
    console.error("❌ Error generating travel plan:", error);
    throw error;
  }
};

export const generateTrip = async (tripData: any) => {
  const { country, duration, travelStyle, interest, budget, groupType, user } =
    tripData;

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY!);
  const unsplashApiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY!;
  const API_URL = import.meta.env.VITE_API_URL;

  try {
    const prompt = `Return ONLY a valid JSON object with this exact structure:
{
  "name": "Trip Title",
  ...
} 
NO markdown. NO explanation.`;

    const textResult = await genAI
      .getGenerativeModel({ model: "gemini-2.0-flash" })
      .generateContent([prompt]);

    const raw = textResult.response.text();
    console.log("🔍 Gemini Raw Output:", raw);

    const trip = parseMarkdownToJson(raw);
    if (!trip || typeof trip !== "object") {
      throw new Error("Invalid trip format");
    }

    const imageResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${country}${interest}${travelStyle}&client_id=${unsplashApiKey}`
    );
    const imageData = await imageResponse.json();
    const imageUrls = imageData.results
      .slice(0, 3)
      .map((img: any) => img.urls?.regular)
      .filter(Boolean);

    const completeTripData = {
      ...trip,
      imageUrls,
      travelStyle,
      interest,
      groupType,
      budget,
      createdAt: new Date().toISOString(),
      userId: user?._id || null,
    };

    const response = await axios.post(`${API_URL}/trips`, completeTripData);
    return response.data;
  } catch (error) {
    console.error("❌ Error generating travel plan:", error);
    throw error;
  }
};
