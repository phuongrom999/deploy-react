import './App.css';
import Summary from './components/Summary'
import HighLight from './components/HighLight'
import CountrySelector from './components/CountrySelector'
import { useEffect, useState } from 'react';
import { getCountries, getReportByCountry } from './components/apis';
import { sortBy } from 'lodash';
import { Container, Typography } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/vi'

moment.locale('vi');
function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      const countries = sortBy(res.data, 'Country');
      setCountries(countries);

      setSelectedCountryId('vn');
    })
  }, [])
  const handleOnchange = (e) => {
    //call api
    setSelectedCountryId(e.target.value);
  }
  // const handleOnchange = React.useCallback((e) => {
  //   setSelectedCountryId(e.target.value);
  // }, []);
  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find((country) => country.ISO2.toLowerCase() === selectedCountryId);

      getReportByCountry(Slug).then((res) => {
        res.data.pop();
        setReport(res.data)
      });
    }

  }, [countries, selectedCountryId])
  return (
    <Container style={{marginTop:20}}>
      <Typography variant='h2' component='h2'>
       Thống kê COVID-19
      </Typography>
      <Typography>
        {moment().format('LLL')}
      </Typography>
      <CountrySelector countries={countries} handleOnchange={handleOnchange} value={selectedCountryId} />
      <HighLight report={report} />
      <Summary report={report} countryId={selectedCountryId} />
    </Container>
  );
}

export default App;
