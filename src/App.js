import React, { useState } from 'react';
import './App.css';

import useFetchJobs from './useFetchJobs';

// Bootstrap
import { Container } from 'react-bootstrap';

// Component
import Job from './Job'
import JobsPagination from './JobsPagination';

function App() {

  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);

  const { jobs, loading, error } = useFetchJobs(params, page);

  return (
    <Container className="my-4">
      <h1 className="mb-4">Github Jobs</h1>
      <JobsPagination page={ page } setPage={ setPage } />
      { loading && <h1>Loading...</h1> }
      { error && <h1>Error.. Try Refreshing.</h1> }
      {
        jobs.map(job => {
          return (
            <Job key={ job.id } job={ job } />
          )
        })
      }
    </Container>
  );
}

export default App;
