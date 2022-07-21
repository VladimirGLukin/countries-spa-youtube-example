import axios from 'axios';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IoArrowBack } from 'react-icons/io5';
import { searchByCountry } from '../config';
//import { Button } from '@salutejs/plasma-ui'; //'../components/Button';
import { Button } from '../components/Button';
import { Info } from '../components/Info';

export const Details = () => {
  const { name } = useParams();
  const { push, goBack } = useHistory();
  const [country, setCountry] = useState(null);

  console.log(country);

  useEffect(() => {
    axios.get(searchByCountry(name)).then(({ data }) => setCountry(data[0]));
  }, [name]);

  return (
    <>
    <div>
      <Button text="Back" contentLeft={<IoArrowBack />} onClick={goBack}>
        <IoArrowBack />
        <span>Back</span>
      </Button>
      {country && <Info push={push} {...country} />}
    </div>
  </>
  );
};
