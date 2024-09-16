import axios from 'axios'
import React, { useEffect } from 'react'
import { JOB_API_END_POINT } from '../utils/constant'

import { useDispatch } from 'react-redux'
import { setSingleJob } from '../redux/jobSlice'

const useGetSingleJobs = (jobId) => {
    const dispatch=useDispatch();

}

export default useGetSingleJobs