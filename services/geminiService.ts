import { GoogleGenAI, Type } from "@google/genai";
import type { TestQuestion, UserAnswer } from '../types';
import { EDUCATIONAL_TOPICS, MOCK_TEST_QUESTIONS } from '../constants';


const API_KEY = process.env.API_KEY;

// Initialize ai only if API_KEY is available to prevent the app from crashing.
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

if (!ai) {
  console.error("API_KEY environment variable not set. AI features will be disabled.");
}

export const getChatbotResponse = async (prompt: string): Promise<string> => {
  if (!ai) {
    return "Lo siento, la función de IA no está disponible en este momento debido a un problema de configuración.";
  }

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            systemInstruction: "You are a friendly and helpful financial assistant for GANESHA Capital. You provide clear, concise, and encouraging answers to questions about personal finance, financial planning, and the services offered by GANESHA Capital. Always maintain a professional and trustworthy tone. Do not provide personalized financial advice. Answer in Spanish.",
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error fetching response from Gemini API:", error);
    return "Lo siento, estoy teniendo problemas para conectarme en este momento. Por favor, inténtalo de nuevo más tarde.";
  }
};

export const generateTestQuestions = async (level: 'Basic' | 'Intermediate' | 'Advanced' = 'Basic'): Promise<TestQuestion[]> => {
    // If AI is not configured, fall back to mock questions immediately.
    if (!ai) {
        console.warn(`Gemini API not configured. Falling back to mock test questions for level: ${level}`);
        return Promise.resolve(MOCK_TEST_QUESTIONS[level]);
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate 5 multiple-choice questions in Spanish about ${level} personal finance. Topics should include budgeting, saving, debt, and basic investing. For each question, provide the question text, four unique options, and the text of the correct answer.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            id: { type: Type.INTEGER },
                            question: { type: Type.STRING },
                            options: {
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            },
                            correctAnswer: { type: Type.STRING }
                        },
                        required: ['id', 'question', 'options', 'correctAnswer']
                    }
                }
            }
        });
        
        const jsonText = response.text.trim();
        const questions = JSON.parse(jsonText);
        // Ensure options are shuffled and IDs are sequential
        return questions.map((q: Omit<TestQuestion, 'id'>, index: number) => ({
            ...q,
            id: index + 1,
            options: q.options.sort(() => Math.random() - 0.5)
        }));

    } catch (error) {
        console.error("Error generating test questions via Gemini, falling back to mock data:", error);
        // Fallback to mock data on any API error
        return Promise.resolve(MOCK_TEST_QUESTIONS[level]);
    }
};

export const evaluateTestAnswers = async (answers: UserAnswer[]) => {
    if (!ai) {
        throw new Error("API key is not configured.");
    }
    const topicTitles = EDUCATIONAL_TOPICS.map(t => t.title).join(', ');

    const prompt = `A user has completed a financial knowledge test. Here are their answers:
    ${JSON.stringify(answers, null, 2)}

    Based on their incorrect answers, provide the following in Spanish:
    1.  Personalized, encouraging feedback (2-3 sentences) on their performance, highlighting areas for improvement.
    2.  Recommend exactly two relevant educational topics from the following list to help them improve: ${topicTitles}.

    Return the result as a JSON object.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        feedback: { type: Type.STRING },
                        recommendations: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    },
                    required: ['feedback', 'recommendations']
                }
            }
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error evaluating test answers:", error);
        throw new Error("Failed to evaluate test answers.");
    }
};