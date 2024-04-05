import OpenAI from 'openai'

export class OpenaiService {
  concurrencyAllowed = Number(process.env.OPENAI_CONCURRENCY_ALLOWED)

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }

  async #requestOpenai(messages, settings) {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages,
        ...settings,
      })
      return response.choices
    } catch (e) {
      console.log(e)
      return false
    }
  }

  async getNewJSON({ title, description }, language, maxTitleLength) {
    const openAiSettings = {
      model: 'gpt-3.5-turbo',
      temperature: 0.15,
      max_tokens: 630,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }
    const openAiMessages = [
      {
        role: 'system',
        content: `
You will be given a title and a description. Your task is to generate a revised title and description while adhering to the following criteria:
• Do not include the words 'Aliexpress' and 'China' in either the title or description.
• Specific years (e.g., 2022) must not be mentioned.
• The title should not start with a number.
• If the product title mentions a weight, position it at the end of the title.
• Ensure the title is optimized for search engines (SEO-friendly).
• The description must be structured into 5 paragraphs, with each paragraph containing 2-3 sentences. It should highlight a list of benefits and a list of technical specifications.
• Exclude information about size and material from the description.
• Use HTML to format the description.
• The entire content, both title and description, must be translated into ${language}.
It is ESSENTIAL that the title does not exceed the character limit specified by ${maxTitleLength}. Ensure that your translated title adheres to this character limit.
Your response should be in JSON format, like this example: {"title": "$\{your title}", "description": "$\{your description}", "keywords": "$\{your keywords}"}.
`,
      },
      {
        role: 'user',
        content: `title: ${title}, description:${description}`,
      },
    ]

    const openAiResponse = await this.#requestOpenai(openAiMessages, openAiSettings)
    return JSON.parse(openAiResponse[0].message.content)
  }

  async translateOptions(options, language) {
    const maxTokens = options.reduce((acc, item) => {
        let count = 0;

        for (const string of item) {
            count += string.length;
        }

        acc += count;

        return acc;
    }, 0);

    const openAiSettings = {
      model: 'gpt-3.5-turbo',
      temperature: 0.15,
      max_tokens: Math.round(maxTokens * 1.7),
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    }
    const openAiMessages = [
      {
        role: 'system',
        content: `
You received a JSON with strings.
- Translate all strings into ${language}.
- Return a JSON with translated strings in the same format as received
`,
      },
      {
        role: 'user',
        content: `${JSON.stringify(options)}`,
      },
    ]

    const openAiResponse = await this.#requestOpenai(openAiMessages, openAiSettings);

    return JSON.parse(openAiResponse[0].message.content)
  }
}
