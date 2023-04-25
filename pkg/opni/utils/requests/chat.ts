import { LoremIpsum } from 'lorem-ipsum';
import axios from 'axios';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const NAMESPACE = 'opni';
const SERVICE_NAME = 'opni-chat';
const PORT = '80';
const PATH = '/';

export async function sendMessage(message: string): Promise<string> {
  try {
    return (await axios.post<string>(`/api/v1/namespaces/${NAMESPACE}/services/http:${SERVICE_NAME}:${PORT}/proxy${PATH}`, { message })).data;
  } catch (ex) {
    console.error(ex);
    return lorem.generateParagraphs(Math.floor((Math.random() * 2) + 1)).replace('\n', '\n\n');
  }
}
