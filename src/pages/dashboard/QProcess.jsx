import React, { useRef, useState } from 'react';
import { Stack, Typography, Button, Modal, Box, Paper, IconButton, InputBase, Divider, CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import { BookOutlined, FileTextOutlined, SendOutlined } from '@ant-design/icons';
import { sendMessage } from 'api/app';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  minHeight: 250,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const preDefinePrompt = ['Quiz Me', 'Answer all the question'];

export const QProcess = ({ user, session }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const scrollableContainerRef = useRef(null);

  // Step 3: Function to scroll to the bottom
  const scrollToBottom = () => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
    }
  };

  const handleViewQuestionPaper = () => {
    if (session?.question_paper?.document) {
      window.open(session.question_paper.document, '_blank');
    } else {
      toast.error('Unable to open question paper');
    }
  };

  const handleSendMessage = async (text) => {
    setLoading(true);
    const prompt = text || message;

    if (!prompt) {
      toast.error('Please type something');
      setLoading(false);
      return;
    }

    const payload = {
      qsession_id: session?.id,
      content: prompt
    };
    const request = await sendMessage(payload);
    if (request.ok) {
      setMessages(request.data);
      scrollToBottom();
      setLoading(false);
      return;
    }

    setLoading(false);
    const error = request.data?.detail || request.data?.message || 'Unable to complete the request please try again';
    toast.error(error);
  };

  console.log(messages);

  return (
    <>
      <Stack spacing={1} sx={{ minHeight: '75vh' }}>
        <Stack direction={'row'} spacing={1}>
          <Button onClick={handleViewQuestionPaper} variant="outlined" startIcon={<FileTextOutlined />}>
            View Question Paper
          </Button>
          <Button onClick={() => setIsModalOpen(true)} variant="outlined" startIcon={<BookOutlined />}>
            Course Detail
          </Button>
        </Stack>
        <Stack sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Stack ref={scrollableContainerRef} sx={{ flex: 1, overflowY: 'auto', flexBasis: 1, padding: 2 }}>
            {messages.map((message) => (
              <Stack key={message.id} spacing={1} my={1}>
                <Stack sx={{ bgcolor: 'ActiveCaption', padding: 1, color: 'white' }}>
                  <Typography sx={{ whiteSpace: 'pre-line' }}>{message?.content}</Typography>
                </Stack>
                <Stack sx={{ bgcolor: 'white', color: 'black', padding: 1 }}>
                  <Typography sx={{ whiteSpace: 'pre-line' }}>{`${message?.ai_response}`}</Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>

          <Stack spacing={1}>
            <Stack direction={'row'} spacing={1}>
              {preDefinePrompt.map((prompt) => (
                <Box
                  onClick={() => handleSendMessage(prompt)}
                  sx={{
                    cursor: 'pointer',
                    px: '15px',
                    py: '2px',
                    border: '1px solid gray',
                    borderRadius: '20px',
                    '&:hover': { backgroundColor: 'gray', color: 'white' }
                  }}
                  key={prompt}
                >
                  <Typography>{prompt}</Typography>
                </Box>
              ))}
            </Stack>
            <Paper component="form" sx={{ p: '4px 4px', display: 'flex', alignItems: 'center', borderRadius: '50px' }}>
              <InputBase
                disabled={loading}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Message..."
                inputProps={{ 'aria-label': 'chat with ai' }}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              {loading ? (
                <CircularProgress size={'20px'} />
              ) : (
                <IconButton onClick={() => handleSendMessage()} color="primary" sx={{ p: '10px' }} aria-label="directions">
                  <SendOutlined />
                </IconButton>
              )}
            </Paper>
          </Stack>
        </Stack>
      </Stack>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h4">Course Detail</Typography>
          <Stack mt={2} direction={'row'} justifyContent={'space-between'}>
            <Typography>Course name</Typography>
            <Typography fontWeight={'bold'}>{session?.question_paper?.course?.name}</Typography>
          </Stack>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography>Course code</Typography>
            <Typography fontWeight={'bold'}>{session?.question_paper?.course?.code}</Typography>
          </Stack>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography>Department</Typography>
            <Typography fontWeight={'bold'}>{session?.question_paper?.course?.department?.name}</Typography>
          </Stack>
          <Stack flex={1} mt={4}>
            <Button variant="contained" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
