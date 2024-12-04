import { z } from "zod";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";

// Define the schema for the expected output
export const outputSchema = z.object({
  summary: z.string().describe("A concise summary of the README content"),
  cool_facts: z.array(z.string()).describe("A list of interesting facts from the README")
});

export type OutputType = z.infer<typeof outputSchema>;

const parser = StructuredOutputParser.fromZodSchema(outputSchema);
const formatInstructions = parser.getFormatInstructions();

const prompt = new PromptTemplate({
  template: `You are a technical documentation expert who excels at summarizing GitHub repositories.
  
Below is the content of a GitHub repository's README file. Please analyze it and provide:
1. A clear and concise summary of what this repository is about
2. A list of cool/interesting facts from the README

README Content:
{content}

{format_instructions}`,
  inputVariables: ["content"],
  partialVariables: { format_instructions: formatInstructions }
});

const model = new ChatOpenAI({
  temperature: 0,
  modelName: "gpt-3.5-turbo",
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const chain = prompt.pipe(model).pipe(parser);

// Function to summarize content using the schema
export async function summarizeWithAI(content: string): Promise<OutputType> {
  try {
    const result = await chain.invoke({ content });
    return result;
  } catch (error) {
    console.error("Error summarizing content:", error);
    throw error;
  }
} 