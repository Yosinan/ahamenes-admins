import React, { useEffect, useState } from 'react';
import './App.css';
import useAuth from './components/hooks/useAuth';
import Status from './components/Status/Status';
import axios from 'axios';
import { Form, Button } from "react-bootstrap";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const App = () => {


  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatuses, setStepStatuses] = useState([false, false, false]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [pass, setPass] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [file, setfile] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [validated, setValidated] = useState(false);

  const authenticated = useAuth();

  useEffect(() => {
    if (username && pass && name && role && description && file) {
      setValidated(true);
    }
  }, [username, pass, name, role, description, file]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleroleChange = (event) => {
    setRole(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePassChange = (e) => {
    setPass(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files);
    console.log(filesArray);
    setfile(filesArray);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {


      console.log("Posting Team...");
      await axios.post("http://localhost:5000/api/team/add", {
        name: name,
        role: role,
        description: description,
        username: username,
        password: pass
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setName("");
      setRole("");
      setDescription("");
      setfile("");
      handleSuccess();

      window.location = "/";
      console.log("Team posted successfully");
    } catch (error) {
      console.error("Error posting Team:", error.message);
      handleError(error.message);
    }

    setValidated(true);
  };

  const handleSuccess = () => {
    setSuccessMessage('Team posted successfully.');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleError = (text) => {

    if (text.includes('403')) {
      text = 'Invalid credentials. Please try again.';
    }

    if (text.includes('400')) {
      text = 'Please fill in all required fields.';
    }

    if (text.includes('500')) {
      text = 'Something went wrong. Please try again.';
    }
    setErrorMessage(text);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleNextClick = () => {
    const updatedStepStatuses = [...stepStatuses];
    updatedStepStatuses[currentStep] = true;
    setStepStatuses(updatedStepStatuses);
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousClick = () => {
    const updatedStepStatuses = [...stepStatuses];
    updatedStepStatuses[currentStep] = false;
    setStepStatuses(updatedStepStatuses);
    setCurrentStep(currentStep - 1);
  };

  const handleStepClick = (stepIndex) => {
    setCurrentStep(stepIndex);
  };



  return (
    <>
      {successMessage && <Status message={successMessage} type="success" />}
      {errorMessage && <Status message={errorMessage} type="error" />}
      {/* <button className='btn btn-outline-grey' onClick={() => window.location = "/"}><FontAwesomeIcon icon={faArrowLeft} /> Go back</button> */}
      <div>
        <div class="wrapper">

          <Form noValidate validated={validated} id="order-form" onSubmit={handleSubmit}>
            <Form.Group className="ordershadow" id="wizard" controlId="formName">
              <h3>Our Teams</h3>

              <ul className="steps">
                {["", "", ""].map((step, index) => (
                  <li key={index} className={`${stepStatuses[index] ? "completed" : ""
                    } ${currentStep === index ? "checked" : ""}`}>
                    <a className='' onClick={() => handleStepClick(index)}>{step}</a>
                  </li>
                ))}
              </ul>
              <h4></h4>

              {currentStep === 0 && (
                <section>
                  {validated && (
                    <p className="error-message">Please fill in all required fields.</p>
                  )}
                  <div className="form-group">
                    <h5>Username <span className="required-indicator">*</span></h5>
                    <div className="form-row">
                      <input
                        required
                        type="text"
                        className="form-control-lg"
                        placeholder="username"
                        value={username}
                        onChange={handleUsernameChange}
                      />
                    </div>
                  </div>
                  <h5>Password <span className="required-indicator">*</span></h5>
                  <div className="form-row">
                    <input
                      required
                      type="password"
                      className="form-control-lg"
                      value={pass}
                      onChange={handlePassChange}
                      placeholder="password"
                    />
                  </div>
                  <Button variant='primary' onClick={handleNextClick}><FontAwesomeIcon icon={faArrowRight} /></Button>
                </section>
              )}
              <h4></h4>
              {currentStep === 1 && (
                <section>
                  {validated && (
                    <p className="error-message">Please fill in all required fields.</p>
                  )}
                  <div className="form-group">
                    <h5>Name <span className="required-indicator">*</span></h5>
                    <div className="form-row">
                      <input
                        required
                        type="text"
                        className="form-control-lg"
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                      />
                    </div>
                  </div>
                  <h5>Role <span className="required-indicator">*</span></h5>
                  <div className="form-row">
                    <input
                      required
                      type="text"
                      className="form-control-lg"
                      value={role}
                      onChange={handleroleChange}
                      placeholder="Role"
                    />
                  </div>
                  <h5>Photo <span className="required-indicator">*</span></h5>
                  <div className="form-row">
                    <input
                      type="file"
                      className="form-control-"
                      onChange={handleFileChange}
                      multiple={true}
                      placeholder="Add Photo"
                    />
                  </div>
                  <div className="form-row">
                    <h5>Description <span className="required-indicator">*</span></h5>
                    <textarea
                      className="form-control-lg"
                      placeholder="Description"
                      type="text"
                      value={description}
                      onChange={handleDescriptionChange}
                      style={{ Height: "108px" }}
                    ></textarea>
                  </div>
                  <button className='btn btn-light' onClick={handlePreviousClick}> <FontAwesomeIcon icon={faArrowLeft} /> </button>
                  <Button variant='primary' onClick={handleNextClick}><FontAwesomeIcon icon={faArrowRight} /></Button>
                </section>
              )}



              <h4></h4>
              {currentStep === 2 && (
                <>
                  {validated ? (
                    <section className='svg'>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
                        <circle class="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1" />
                        <polyline class="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 " />
                      </svg>
                      <p>Ready to Post </p>
                      <button type="submit" className='btn-lg btn-success'>Post</button>
                    </section>
                  ) : (
                    <section>
                      <p className="error-message">Please fill in all required fields.</p>
                      <button className='btn btn-outline-danger' onClick={handlePreviousClick}>Go Back</button>
                    </section>
                  )}

                </>
              )}
            </Form.Group>
          </Form>
        </div>
      </div>

    </>
  )
}


export default App;
