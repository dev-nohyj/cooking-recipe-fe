import { OpenAIStream } from '@/app/utils/openai/openaiStream';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
    const body: { content: string } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: '에러 발생 키가 없음' }, { status: 500 });
    }

    if (body.content.length === 0 || body.content.trim().length === 0) {
        return NextResponse.json({ error: '내용을 입력해주세요.' }, { status: 500 });
    }

    try {
        const stream = await OpenAIStream(body.content);

        return new Response(stream);
    } catch (err: any) {
        if (err.response) {
            return NextResponse.json({ error: err.response.data }, { status: 500 });
        } else {
            return NextResponse.json({ error: '에러가 발생했습니다 잠시 후 다시 시도해 주세요.' }, { status: 500 });
        }
    }
}
