import { NextResponse } from 'next/server';
import { summarizeWithAI, OutputType } from './chain';

// Update route segment config to use nodejs runtime for LangChain
export const runtime = 'nodejs'; // LangChain requires nodejs runtime
export const dynamic = 'force-dynamic';

interface ReadmeSummary {
  title: string;
  description: string;
  mainSections: string[];
}

// Helper function to extract owner and repo from GitHub URL
const parseGithubUrl = (githubUrl: string) => {
  const url = new URL(githubUrl);
  const [, owner, repo] = url.pathname.split('/');
  return { owner, repo };
};

// Helper function to try different README locations
const getPossibleReadmeUrls = (owner: string, repo: string): string[] => {
  const branches = ['main', 'master'];
  const filenames = ['README.md', 'Readme.md', 'readme.md'];
  
  return branches.flatMap(branch => 
    filenames.map(filename => 
      `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filename}`
    )
  );
};

// Helper function to create a basic structure summary of the README content
const extractStructure = (content: string): ReadmeSummary => {
  const lines = content.split('\n').filter(line => line.trim());
  
  const title = lines.find(line => line.startsWith('#'))?.replace(/#/g, '').trim() || 'No title found';
  
  const firstParagraph = lines.find(line => 
    !line.startsWith('#') && 
    !line.startsWith('-') && 
    line.trim().length > 0
  ) || 'No description found';
  
  const sections = lines
    .filter(line => line.startsWith('## '))
    .map(line => line.replace(/#/g, '').trim());

  return {
    title,
    description: firstParagraph,
    mainSections: sections,
  };
};

export async function POST(request: Request) {
  try {
    // Validate API key
    const apiKey = request.headers.get('api-key');
    
    if (!apiKey || apiKey.length < 10) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      );
    }

    // Parse request body
    const { githubUrl } = await request.json();

    if (!githubUrl) {
      return NextResponse.json(
        { error: 'GitHub URL is required' },
        { status: 400 }
      );
    }

    // Parse GitHub URL
    const { owner, repo } = parseGithubUrl(githubUrl);
    const possibleUrls = getPossibleReadmeUrls(owner, repo);

    // Try each possible README location
    let content = null;
    for (const url of possibleUrls) {
      const response = await fetch(url);
      if (response.ok) {
        content = await response.text();
        break;
      }
    }

    if (!content) {
      return NextResponse.json(
        { error: 'Failed to fetch README content' },
        { status: 404 }
      );
    }

    // Get both structure and AI summary
    const structure = extractStructure(content);
    const aiSummary = await summarizeWithAI(content);

    return NextResponse.json(
      { 
        structure,
        aiSummary,
        originalUrl: githubUrl
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
