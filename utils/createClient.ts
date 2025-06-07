import { Client } from '@twilio/conversations';

const createClient = async (token: string) => {
  const client = new Client(token);
  console.log('client', client);
  await client.initialize();
  return client;
};

export default createClient;
