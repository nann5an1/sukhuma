import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

function buildPrompt(skinData) {
  const {
    type,
    sensitivity,
    skincare_exp,
    age,
    acnetype,
    skinConcerns,
    allergies,
    preferences,
    diet,
    lifestyle,
    budget
  } = skinData;

  return `You are an expert dermatologist and skincare specialist. Based on the following customer profile, create a comprehensive personalized skincare routine.

CUSTOMER PROFILE:
- Skin Type: ${type}
- Sensitivity Level: ${sensitivity}
- Skincare Experience: ${skincare_exp}
- Age: ${age}
- Acne Type: ${acnetype || "None"}
- Skin Concerns: ${skinConcerns.join(", ") || "None"}
- Allergies/Sensitivities: ${allergies.join(", ") || "None"}
- Product Preferences: ${preferences.join(", ") || "None"}
- Diet: ${diet.join(", ") || "Not specified"}
- Lifestyle: ${lifestyle.join(", ") || "Not specified"}
- Budget: ${budget}

CRITICAL: Respond with ONLY valid JSON. No markdown, no code blocks, no extra text. Just the raw JSON object.
IMPORTANT: Each routine step must have exactly 3 product recommendations. Keep info fields under 50 words.

Provide the skincare routine in this exact JSON format:

{
  "data": [
    {
      "time": "Morning",
      "routine": [
        {
          "id": 1,
          "title": "step name",
          "products": ["product1", "product2", "product3"],
          "info": "application instructions and benefits"
        }
      ]
    },
    {
      "time": "Evening",
      "routine": [
        {
          "id": 1,
          "title": "step name",
          "products": ["product1", "product2", "product3"],
          "info": "application instructions and benefits"
        }
      ]
    }
  ],
  "treatments": {
    "weekelytreatments": [
      {
        "id": 1,
        "treatment": "treatment name",
        "info": "treatment description",
        "times": "frequency"
      }
    ],
    "tips": [
      {
        "id": 1,
        "info": "lifestyle tip"
      }
    ]
  },
  "precautions": "important precautions based on profile"
}`;
}

app.use(cors({
  origin: "*",
}));
app.use(express.json());

app.post("/skincareroutine", async (req, res) => {
  try {
    const skindata = req.body;
    console.log("received skincard information");
    const prompt = buildPrompt(skindata);

    // Increased max_tokens and added temperature for more consistent output
    const message = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 4096, // Increased from 2000
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that responds only in valid JSON format. Never include markdown formatting or code blocks."
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" }, // Enable JSON mode if supported
    });

    let responseText = message.choices[0]?.message?.content || '';
    
    if (!responseText) {
      throw new Error("Empty response from model");
    }

    // Clean up the response
    responseText = responseText.trim();

    // Remove markdown code fences if present
    if (responseText.startsWith("```")) {
      responseText = responseText.replace(/```(json)?/g, "").trim();
    }

    // Remove any leading/trailing whitespace or newlines
    responseText = responseText.replace(/^\s+|\s+$/g, '');

    // Validate JSON structure before parsing
    let parsedData;
    try {
      parsedData = JSON.parse(responseText);
      
      // Validate required structure
      if (!parsedData.data || !parsedData.treatments || !parsedData.precautions) {
        throw new Error("Invalid JSON structure: missing required fields");
      }

      res.json(parsedData);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError.message);
      console.error("Response length:", responseText.length);
      console.error("First 500 chars:", responseText.substring(0, 500));
      console.error("Last 500 chars:", responseText.substring(responseText.length - 500));
      
      res.status(500).json({ 
        error: "Invalid JSON from model", 
        details: parseError.message,
        responseLength: responseText.length,
        preview: responseText.substring(0, 200) + "..."
      });
    }
  } catch (error) {
    console.error("Error in /skincareroutine:", error);
    res.status(500).json({ 
      error: "Failed to generate skincare routine", 
      details: error.message 
    });
  }
});

// app.listen(process.env.PORT || 3000, () => {
//   console.log(`Server is running on port ${process.env.PORT || 3000}`);
// });

export default app;