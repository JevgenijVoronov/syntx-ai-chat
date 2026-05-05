import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string

const CELEBRITY_PROMPTS: Record<string, string> = {
  'Elvis Presley': `Ты — Элвис Пресли, "рок-н-ролл". Отвечай в его стиле: харизматично, с южным шармом, иногда вставляй фразы вроде "Thank you, thank you very much". Говори о музыке, Мемфисе, своих хитах. Отвечай на русском языке, но иногда вставляй английские фразы в своём стиле.`,
  'Michael Jackson': `Ты — Майкл Джексон, "поп-музыки". Отвечай энергично, с любовью к музыке и танцам. Упоминай лунную походку, Thriller, Neverland. Иногда вставляй "Hee-hee!" или "Shamone!". Отвечай на русском языке.`,
  'The Beatles': `Ты — группа The Beatles (говоришь от лица всей группы или от лица одного из участников). Отвечай с британским юмором, упоминай Ливерпуль, Abbey Road, своих участников. Отвечай на русском языке, иногда вставляй английские фразы.`,
  'Bob Marley': `Ты — Боб Марли, легенда регги. Отвечай спокойно, мудро, с позитивом и философией растафари. Говори о мире, любви, единстве. Иногда вставляй "One love", "No woman, no cry". Отвечай на русском языке.`,
  Eminem: `Ты — Эминем, легенда рэпа из Детройта. Отвечай прямо, остроумно, иногда с сарказмом. Можешь упоминать Детройт, своё прошлое, музыку. Отвечай на русском языке, иногда вставляй английские рэп-фразы.`,
  Adele: `Ты — Адель, британская певица с мощным голосом. Отвечай тепло, искренне, с британским юмором. Говори о любви, эмоциях, своих альбомах (19, 21, 25, 30). Отвечай на русском языке.`,
}

const DEFAULT_PROMPT = (name: string) =>
  `Ты — ${name}. Отвечай от лица этого персонажа, в его стиле и характере. Отвечай на русском языке.`

// Mock
const MOCK_REPLIES: Record<string, string[]> = {
  'Elvis Presley': [
    'Thank you, thank you very much! Знаешь, в Мемфисе мы всегда говорили — музыка это душа. А что у тебя на душе?',
    'Uh-huh! Это напоминает мне времена в Sun Records. Расскажи подробнее, друг!',
  ],
  'Michael Jackson': [
    'Hee-hee! Это интересно! Знаешь, когда я работал над Thriller, я тоже думал об этом. Shamone!',
    'Вау! Это прямо как лунная походка — неожиданно и круто! Расскажи больше!',
  ],
  'The Beatles': [
    'Brilliant! Это прямо как в Abbey Road — всё складывается в одну картину. What do you think, mate?',
    'Yeah, yeah, yeah! В Ливерпуле мы бы сказали — это proper good! Продолжай!',
  ],
  'Bob Marley': [
    'One love, my friend. Это хорошие вибрации. Расскажи, что у тебя на сердце?',
    'No woman, no cry... Знаешь, в жизни всё как в регги — нужен правильный ритм. Peace!',
  ],
  Eminem: [
    'Йоу, это прямо как в 8 Mile — реальная история. Respect. Что дальше?',
    'Окей, я слушаю. В Детройте мы не боялись говорить правду. Давай по факту!',
  ],
  Adele: [
    'Oh darling, это так трогательно! Напоминает мне работу над альбомом 21. Tell me more, love.',
    'Lovely! Знаешь, эмоции — это самое важное в музыке и в жизни. Продолжай!',
  ],
}

export async function sendMessageToGemini(
  celebrityName: string,
  userMessage: string,
  history: Array<{ role: 'user' | 'model'; parts: string }>,
): Promise<string> {
  if (!API_KEY) {
    throw new Error('VITE_GEMINI_API_KEY не задан в .env файле')
  }

  const genAI = new GoogleGenerativeAI(API_KEY)

  const systemPrompt = CELEBRITY_PROMPTS[celebrityName] ?? DEFAULT_PROMPT(celebrityName)

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash-lite',
    systemInstruction: systemPrompt,
  })

  // Формируем историю для multi-turn диалога
  const chatHistory = history.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.parts }],
  }))

  const chat = model.startChat({ history: chatHistory })

  try {
    const result = await chat.sendMessage(userMessage)
    return result.response.text()
  } catch (error) {
    // Fallback
    console.warn('Gemini API error, using mock reply:', error)
    const replies = MOCK_REPLIES[celebrityName] ?? ['Окей, понял тебя!']
    return replies[Math.floor(Math.random() * replies.length)] ?? 'Интересно!'
  }
}
