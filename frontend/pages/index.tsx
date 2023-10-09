import { useEffect, useState } from 'react';
import { Box, Button, Input, VStack, HStack, Text } from '@chakra-ui/react';

type WebSocketMessageEvent = MessageEvent<string>;

export default function Home() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onopen = () => {
      console.log('Connected to the WS server');
    };

    ws.onmessage = (event: WebSocketMessageEvent) => {
      setReceivedMessages((prev) => [...prev, event.data]);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.send(message);
      setMessage('');
    }
  };

  return (
    <VStack padding="5" spacing="5" width="100%" maxW="md" margin="auto">
      <Box flex="1" overflowY="auto">
        {receivedMessages.map((msg, index) => (
          <Text key={index} bg="gray.100" p="2" borderRadius="md" mb={4}>
            {msg}
          </Text>
        ))}
      </Box>
      <HStack width="100%">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <Button onClick={sendMessage} colorScheme="blue">
          Send
        </Button>
      </HStack>
    </VStack>
  );
}
