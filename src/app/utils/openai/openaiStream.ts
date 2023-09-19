import { createParser, ParsedEvent, ReconnectInterval } from 'eventsource-parser';

export async function OpenAIStream(content: string) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let counter = 0;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        method: 'POST',
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages: [
                {
                    role: 'system',
                    content: `유저가 음식명을 입력하면 해당 음식에 대한 레시피를 작성해준다.`,
                },
                { role: 'user', content: content },
            ],
            temperature: 0.6,
            top_p: 1.0,
            presence_penalty: 0.6,
            frequency_penalty: 0.6,
        }),
    });

    const stream = new ReadableStream({
        async start(controller) {
            function onParse(event: ParsedEvent | ReconnectInterval) {
                if (event.type === 'event') {
                    const data = event.data;

                    if (data === '[DONE]') {
                        controller.close();
                        return;
                    }
                    try {
                        const json = JSON.parse(data);
                        const text = json.choices[0].delta?.content || '';

                        if (counter < 2 && (text.match(/\n/) || []).length) {
                            return;
                        }
                        const queue = encoder.encode(text);
                        controller.enqueue(queue);
                        counter++;
                    } catch (e) {
                        controller.error(e);
                    }
                }
            }
            const parser = createParser(onParse);
            for await (const chunk of res.body as any) {
                parser.feed(decoder.decode(chunk));
            }
        },
    });

    return stream;
}
