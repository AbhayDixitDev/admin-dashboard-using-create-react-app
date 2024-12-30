import axios, { all } from 'axios';
import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function UserCreate() {
  const [isLoading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch countries on component mount from local db.json
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:4000/countries');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };
  const fetchStates = async (countryCode) => {
    if (!countryCode) return;
    try {
      const response = await axios.get(`http://localhost:4000/states`);
      const statesData = response.data;
      setStates(statesData[countryCode])
      myFormik.setFieldValue('state', '');
      myFormik.setFieldValue('city', '');
      setCities([]);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async (stateCode) => {
    if (!stateCode) return;
    try {
      const response = await axios.get(`http://localhost:4000/cities`);
      const citiesData = response.data;
      console.log(citiesData);
      setCities(citiesData[stateCode]);
      console.log(citiesData[stateCode]);
      myFormik.setFieldValue('city', '');
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const myFormik = useFormik(
    {
      initialValues: {
        username: "",
        email: "",
        city: "",
        state: "",
        country: "",
        password:""
      },
      validate: (values) => {
        let errors = {}

        if (!values.username) {
          errors.username = "Please enter username";
        } else if (values.username.length < 5) {
          errors.username = "Name shouldn't be less than 3 letters";
        } else if (values.username.length > 20) {
          errors.username = "Name shouldn't be more than 20 letters";
        }

        if (!values.email) {
          errors.email = "Please enter email";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }

        if (!values.city) {
          errors.city = "Please select Arraya city";
        }

        if (!values.state) {
          errors.state = "Please select a state";
        }

        if (!values.country) {
          errors.country = "Please select a country";
        }

        if (!values.password) {
          errors.password = "Please enter password";
        }

        return errors;
      },
      onSubmit: async (values) => {
        try {
          setLoading(true);
          await axios.post("http://localhost:4000/users", values);
          navigate("/portal/user-list");
        } catch (error) {
          console.log(error);
          alert("Validation failed");
          setLoading(false);
        }
      }
    });

  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    myFormik.setFieldValue('country', countryCode);
    fetchStates(countryCode);
  };

  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    myFormik.setFieldValue('state', stateCode);
    fetchCities(stateCode);
  };

  return (
    <div className='container'>
      <form onSubmit={myFormik.handleSubmit}>
        <div className='row'>
          <div className="col-lg-6">
            <label>Name</label>
            <input name='username' value={myFormik.values.username} onChange={myFormik.handleChange} type={"text"}
              className={`form-control ${myFormik.errors.username ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.username}</span>
          </div>

          <div className="col-lg-6">
            <label>E-Mail</label>
            <input name='email' value={myFormik.values.email} onChange={myFormik.handleChange} type={"mail"}
              className={`form-control ${myFormik.errors.email ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.email}</span>
          </div>

          <div className='col-lg-4'>
            <label>Country</label>
            <select name='country' value={myFormik.values.country} onChange={handleCountryChange}
              className={`form-control ${myFormik.errors.country ? "is-invalid" : ""} `} >
              <option value="">----Select Country----</option>
              {countries.map(country => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </select>
            <span style={{ color: "red" }}>{myFormik.errors.country}</span>
          </div>

          <div className='col-lg-4'>
            <label>State</label>
            <select name='state' value={myFormik.values.state} onChange={handleStateChange}
              className={`form-control ${myFormik.errors.state ? "is-invalid" : ""} `}
              disabled={!myFormik.values.country} >
              <option value="">----Select State----</option>
              {states.map(state => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
            <span style={{ color: "red" }}>{myFormik.errors.state}</span>
          </div>

          <div className='col-lg-4'>
            <label>City</label>
            <select name='city' value={myFormik.values.city} onChange={myFormik.handleChange}
              className={`form-control ${myFormik.errors.city ? "is-invalid" : ""} `}
              disabled={!myFormik.values.state} >
              <option value="">----Select City----</option>
              {cities.map(city => (
                <option key={city.code} value={city.code}>
                  {city.name}
                </option>
              ))}
            </select>
            <span style={{ color: "red" }}>{myFormik.errors.city}</span>
          </div>

          <div className='col-lg-4'>
            <label>Password</label>
            <input name='password' value={myFormik.values.password} onChange={myFormik.handleChange} type={"password"}
              className={`form-control ${myFormik.errors.password ? "is-invalid" : ""} `} />
            <span style={{ color: "red" }}>{myFormik.errors.password}</span>
          </div>

          <div className='col-lg-12 mt-4'>
            <div className='text-center'>
              <input disabled={isLoading} type="submit" value={isLoading ? "Submitting..." : "Create"} className='btn btn-primary' />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserCreate