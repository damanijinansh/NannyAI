import { GoogleGenAI, Type } from "@google/genai";
import { FamilyInputs, NannyAdvice } from "../lib/types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateNannyMatch(inputs: FamilyInputs): Promise<NannyAdvice> {
  const prompt = `
    Process the following family requirements and generate highly compatible nanny profiles and a customized daily care plan.

    LOGISTICAL REQUIREMENTS:
    - Child Age Category: ${inputs.childAge} (Strictly follow developmental stage for this category)
    - Requested Start Date: ${inputs.date}
    - Requested Start Time: ${inputs.time}
    - Requested End Time: ${inputs.endTime}
    - Safety/Experience non-negotiables: ${inputs.safetyRequirements}

    CULTURAL & INDIAN LINGUISTIC CRITERIA:
    - Desired Indian Languages: ${inputs.languages} (Exclusively from the Indian subcontinent: Hindi, Tamil, Telugu, Bengali, Malayalam, Kannada, Marathi, Gujarati, Punjabi, Odia, Assamese, Urdu)
    - Dietary habits/restrictions: ${inputs.dietaryHabits}
    - Caregiving philosophy: ${inputs.caregivingStyle}
    - Heritage Values/Specific skills: ${inputs.coreValuesSkills}

    CRITICAL INSTRUCTIONS:
    1. Calibrate all nanny experience and bios to the specific developmental stage of the "${inputs.childAge}" category.
    2. Authentically reflect fluency and cultural connection to the specific Indian regions associated with the requested languages.
    3. Ensure generated profiles acknowledge the exact start date (${inputs.date}) and time (${inputs.time}).
    4. Generate between 3 and 10 realistic nanny profiles. Introduce realistic trade-offs.

    You MUST follow this exact Chain of Thought process:
    Step 1: Analyze the Non-Negotiables: Identify the absolute baseline requirements.
    Step 2: Map Cultural & Value Alignments: Analyze language, dietary, and caregiving preferences.
    Step 3: Construct the Personas: Generate between 3 and 10 realistic nanny profiles.
        - Every profile must include: Name, Years of Experience, Cultural/Language Alignment, Core Competencies, and Why They Are a Match.
        - REALISM & TRADE-OFFS: DO NOT make every nanny a 100% perfect match.
    Step 4: Draft the Aligned Care Plan: Formulate a daily routine integrating cultural practices.

    Return the final response as a JSON object with these fields:
    - profiles: An array of objects, each with 'name', 'experience', 'alignment', 'competencies', 'whyMatch', 'bio' fields.
    - carePlan: An array of objects, each with 'time', 'activity', 'culturalNote' fields.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            profiles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  experience: { type: Type.STRING },
                  alignment: { type: Type.STRING },
                  competencies: { type: Type.STRING },
                  whyMatch: { type: Type.STRING },
                  bio: { type: Type.STRING },
                },
                required: ["name", "experience", "alignment", "competencies", "whyMatch", "bio"],
              },
            },
            carePlan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  activity: { type: Type.STRING },
                  culturalNote: { type: Type.STRING },
                },
                required: ["time", "activity", "culturalNote"],
              },
            },
          },
          required: ["profiles", "carePlan"],
        },
      },
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(response.text) as NannyAdvice;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}
