import React, { useState } from 'react';
import {
  Stack,
  Box,
  Typography,
  FormControlLabel,
  FormLabel,
  Card,
  Grid,
  Modal,
  FormControl,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputLabel,
  Paper,
  IconButton,
  InputBase,
  Divider
} from '@mui/material';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { startSessions } from 'api/app';
import { toast } from 'react-toastify';
import { GoLaw } from 'react-icons/go';
import { MdEngineering } from 'react-icons/md';
import { MdOutlineScience } from 'react-icons/md';
import { BiSolidBusiness } from 'react-icons/bi';
import { SearchOutlined } from '@ant-design/icons';

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

const icons = {
  law: <GoLaw style={{ fontSize: '40px' }} />,
  business: <BiSolidBusiness style={{ fontSize: '40px' }} />,
  science: <MdOutlineScience style={{ fontSize: '40px' }} />,
  engineering: <MdEngineering style={{ fontSize: '40px' }} />
};

const FacultyCard = ({ data, selected, onPress }) => (
  <Stack alignItems={'center'}>
    <Card
      sx={{
        p: 2,
        borderWidth: 1,
        minHeight: '100px',
        width: '100px',
        borderStyle: 'solid',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: '100%',
        color: '#720307',
        '&:hover': {
          bgcolor: '#720307',
          cursor: 'pointer',
          color: 'white'
        }
      }}
      onClick={onPress}
    >
      {icons[data?.icon]}
    </Card>
    <Typography variant="h4" textAlign={'center'} mt={'4px'}>
      {data?.name}
    </Typography>
  </Stack>
);

export const GetStartedProcess = ({ user, onCompleted }) => {
  const { faculties, departments, courses, years } = useSelector((state) => state.app);
  const [departmentFilter, setDepartmentFilter] = useState([]);
  const [courseFilter, setCourseFilter] = useState([]);

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [year, setYear] = useState('2024');
  const [yearOfStudy, setYearOfStudy] = useState('1');
  const [semester, setSemester] = useState(1);
  const [intake, setIntake] = useState('JAN');
  const [loading, setLoading] = useState(false);

  const handleSetFaculty = (faculty) => {
    setSelectedFaculty(faculty);

    const filteredDepartment = departments.filter((department) => department?.faculty?.id === faculty?.id);
    setDepartmentFilter(filteredDepartment);
    setIsModalOpen(true);
  };

  const handleSetDepartment = (department) => {
    setSelectedDepartment(department);
    const filteredCourses = courses.filter((course) => course?.department?.id === department?.id);
    setCourseFilter(filteredCourses);
  };

  const handleSetupAISession = async () => {
    setLoading(true);

    const payload = {
      course_id: selectedCourse?.id,
      year: year,
      semester: semester,
      intake: intake,
      year_of_study: yearOfStudy
    };

    const request = await startSessions(payload);
    if (request.ok) {
      onCompleted(request.data);
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.error('The selected course does not have any question paper');
  };

  return (
    <Stack spacing={1} sx={{ minHeight: '70vh' }}>
      <Box p={2} display={'flex'} justifyContent={'center'}>
        <Paper component="form" sx={{ p: '4px 6px', display: 'flex', alignItems: 'center', width: { xs: '100%', sm: '70%' } }}>
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search for faculties..." inputProps={{ 'aria-label': 'search google maps' }} />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
            <SearchOutlined />
          </IconButton>
        </Paper>
      </Box>

      <Typography textAlign={'center'} my={2} fontSize={20} px={20}>
        Access and solve past school questions using AI-powered solutions and get accurate answers in real-time.
      </Typography>

      <Grid container spacing={3} width={'100%'}>
        {faculties?.map((faculty) => (
          <Grid item key={faculty.id} xs={12} sm={3}>
            <FacultyCard data={faculty} selected={faculty?.id === selectedFaculty?.id} onPress={() => handleSetFaculty(faculty)} />
          </Grid>
        ))}
      </Grid>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Select Department and Course
          </Typography>
          <Typography id="modal-modal-subtitle" variant="body1">
            Please select the department and course you want to proceed with.
          </Typography>
          <Stack spacing={2} mt={2}>
            <FormControl disabled={loading}>
              <InputLabel id="select-department-label">Select Department</InputLabel>
              <Select
                value={selectedDepartment?.id || ''}
                onChange={(e) => {
                  const department = departments.find((dep) => dep.id === e.target.value);
                  handleSetDepartment(department);
                }}
                labelId="select-department-label"
                id="select-department"
                label="Select Department"
              >
                {departmentFilter.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl disabled={loading || !selectedDepartment}>
              <InputLabel id="select-course-label">Select Course</InputLabel>
              <Select
                value={selectedCourse?.id || ''}
                onChange={(e) => {
                  const course = courses.find((course) => course.id === e.target.value);
                  setSelectedCourse(course);
                }}
                labelId="select-course-label"
                id="select-course"
                label="Select Course"
              >
                {courseFilter.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <FormControl disabled={loading}>
              <InputLabel id="select-year-label">Select Year</InputLabel>
              <Select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                labelId="select-year-label"
                id="select-year"
                label="Select Year"
                defaultValue={'2013'}
              >
                {years?.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}

            {/* <FormControl disabled={loading}>
              <InputLabel id="select-year-label">Year of Study</InputLabel>
              <Select
                value={yearOfStudy}
                onChange={(e) => setYearOfStudy(e.target.value)}
                labelId="select-year-label"
                id="select-year"
                label="Year of Study"
                defaultValue={'1'}
              >
                <MenuItem value={'1'}>1</MenuItem>
                <MenuItem value={'2'}>2</MenuItem>
                <MenuItem value={'3'}>3</MenuItem>
                <MenuItem value={'4'}>4</MenuItem>
              </Select>
            </FormControl> */}

            {/* <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">INTAKE</FormLabel>
              <RadioGroup
                value={intake}
                onChange={(e) => setIntake(e.target.value)}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="JAN" control={<Radio />} label="JAN" />
                <FormControlLabel value="MAY" control={<Radio />} label="MAY" />
                <FormControlLabel value="AUG" control={<Radio />} label="AUG" />
              </RadioGroup>
            </FormControl>
            <FormControl disabled={loading}>
              <InputLabel id="select-semester-label">Select Semester</InputLabel>
              <Select
                labelId="select-semester-label"
                id="select-semester"
                label="Select Semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <MenuItem value={1}>First Semester</MenuItem>
                <MenuItem value={2}>Second Semester</MenuItem>
              </Select>
            </FormControl> */}
            <Stack direction={'row'} spacing={2}>
              <LoadingButton disabled={loading} fullWidth variant="outlined" onClick={() => setIsModalOpen(false)}>
                Cancel
              </LoadingButton>
              <LoadingButton
                loading={loading}
                disabled={loading || !selectedCourse}
                onClick={handleSetupAISession}
                fullWidth
                variant="contained"
              >
                Continue
              </LoadingButton>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Stack>
  );
};
