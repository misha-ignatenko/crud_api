import React from 'react';
import CreateReport from './CreateReport.jsx';
import ReadReports from './ReadAndEditReports.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.js';

const App = () => (
  <div>
      <AccountsUIWrapper />
    <h1>Welcome to Reports!</h1>
    <CreateReport />
    <ReadReports />
  </div>
);

export default App;
