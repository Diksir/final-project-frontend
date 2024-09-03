// Import necessary modules and components
import { CloseOutlined, CloudUploadOutlined, FilePdfTwoTone, FileWordTwoTone } from '@ant-design/icons';
import { Stack, Button, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

// ==============================|| SAMPLE PAGE ||============================== //

export default function SamplePage() {
  const [files, setFiles] = useState([]);
  const [conversionStatus, setConversionStatus] = useState(null);
  const [convertedFile, setConvertedFile] = useState(null);

  // Callback function to handle file drop
  const onDrop = useCallback((acceptedFiles) => {
    // Handle the uploaded files here
    setFiles(acceptedFiles);
    setConversionStatus(null);
  }, []);

  // Configuration for the dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    }
  });

  const handleConversion = async () => {
    setConvertedFile(null);
    if (files.length === 0) return;

    const formData = new FormData();
    formData.append('file', files[0]);

    try {
      setConversionStatus('Converting...');
      let response;
      if (files[0].type === 'application/pdf') {
        response = await axios.post('http://127.0.0.1:8000/api/convert/pdf-to-doc/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        response = await axios.post('http://127.0.0.1:8000/api/convert/doc-to-pdf/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      const downloadUrl = response.data.file_url;
      console.log(downloadUrl);
      setConversionStatus('Done');
      setConvertedFile(downloadUrl);
    } catch (error) {
      setConversionStatus('Error');
      console.error('Conversion error:', error);
    }
  };

  const handleDownloadFile = () => {
    if (convertedFile) {
      window.open(convertedFile, '_blank');
    }
  };

  return (
    <MainCard>
      <Stack alignItems={'center'} pb={'100px'} pt={'30px'}>
        <Typography variant={'h3'} fontWeight={'400'}>
          Cloud Document Converter
        </Typography>
        <Typography textAlign={'center'} variant="body1" mt={'10px'}>
          online file converter that supports nearly all document formats. To get started, use the button below and select files to convert
          from your computer.
        </Typography>
        {files.length < 1 && (
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            minWidth={'90%'}
            minHeight={300}
            mt={'50px'}
            sx={{ borderWidth: 2, borderColor: '#6690FF', borderStyle: 'dashed', borderRadius: '20px', backgroundColor: '#F0F4FF' }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <CloudUploadOutlined style={{ fontSize: '50px', color: '#3366FF', fontWeight: '400' }} />
            {isDragActive ? (
              <Typography mt={'10px'} variant="h4" fontWeight={'600'} color={'#3366FF'}>
                Drop the files here ...
              </Typography>
            ) : (
              <Typography mt={'10px'} variant="h4" fontWeight={'600'} color={'#3366FF'}>
                Click or drop your file here
              </Typography>
            )}
          </Stack>
        )}

        {files.length > 0 && (
          <Stack mt={'50px'} width={'100%'} px={'100px'}>
            {files.map((file, index) => (
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                key={index}
                spacing={2}
                sx={{ border: '1px solid #E0E0E0', padding: 2, borderRadius: '10px' }}
              >
                {file.type === 'application/pdf' ? (
                  <FilePdfTwoTone style={{ fontSize: '18px' }} />
                ) : (
                  <FileWordTwoTone style={{ fontSize: '18px' }} />
                )}
                <Typography sx={{ flex: 1 }}>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </Typography>

                <Stack direction={'row'} spacing={1}>
                  <Typography>Status:</Typography>
                  <Typography color="green">{conversionStatus || 'Pending'}</Typography>
                </Stack>
                <IconButton sx={{ borderRadius: '40px' }} onClick={() => setFiles([])}>
                  <CloseOutlined />
                </IconButton>
              </Stack>
            ))}
            <Stack spacing={1} sx={{ mt: 3 }} direction={'row'} justifyContent={'center'}>
              <Button variant="contained" color="primary" onClick={handleConversion}>
                Convert
              </Button>
              {convertedFile && (
                <Button variant="contained" color={'primary'} onClick={handleDownloadFile}>
                  Download
                </Button>
              )}
            </Stack>
          </Stack>
        )}
      </Stack>
    </MainCard>
  );
}
