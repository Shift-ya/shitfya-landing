import { getGitHubUser } from '@/lib/github';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json(
      { error: 'Username is required' },
      { status: 400 }
    );
  }

  try {
    const user = await getGitHubUser(username);
    
    // Return null user gracefully instead of 404
    return NextResponse.json(user);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub user' },
      { status: 500 }
    );
  }
}
