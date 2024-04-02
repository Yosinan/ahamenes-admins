import { useEffect, useState } from "react";
import "./App.css";
import useAuth from "./components/hooks/useAuth";
import Status from "./components/Status/Status";
import { Carousel, Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import {  faArrowRight } from "@fortawesome/free-solid-svg-icons";
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
    if (name && role && description && file) {
      setValidated(true);
    }
  }, [name, role, description, file]);

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
    setfile(filesArray);
  };

  const handleKeyPress = (event) => {
    if (event.key === "-" || event.key === "+" || event.key === "e") {
      event.preventDefault();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/team/add", {
        name: name,
        role: role,
        description: description,
        // images: file,
        username: username,
        password: pass,
      });

      setName("");
      setRole("");
      setDescription("");
      setfile("");
      handleSuccess();

      // window.location = "/dashboard";
      console.log("Team posted successfully");
    } catch (error) {
      console.error("Error posting Team:", error.message);
      handleError();
    }

    setValidated(true);
  };

  const handleSuccess = () => {
    setSuccessMessage("Team posted successfully.");
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleError = (text = "Something went wrong. Please try again.") => {
    setErrorMessage(text);
    setTimeout(() => {
      setErrorMessage("");
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


  const teamData = [
    {
      id: 1,
      name: "John Doe",
      photo: "https://via.placeholder.com/150",
      role: "Developer",
    },
    {
      id: 2,
      name: "Jane Smith",
      photo: "https://via.placeholder.com/150",
      role: "Designer",
    },
    {
      id: 3,
      name: "Alice Johnson",
      photo: "https://via.placeholder.com/150",
      role: "Manager",
    },
  ];
  return (
    <>
      {successMessage && <Status message={successMessage} type="success" />}
      {errorMessage && <Status message={errorMessage} type="error" />}
      {/* <button className='btn btn-outline-grey' onClick={() => window.location = "/"}><FontAwesomeIcon icon={faArrowLeft} /> Go back</button> */}
      <div>
        <div className="wrapper">
          <Form
            noValidate
            validated={validated}
            id="order-form"
            onSubmit={handleSubmit}
          >
            <Form.Group
              className="ordershadow"
              id="wizard"
              controlId="formName"
            >
              <h3>Our Teams</h3>
              <ul className="steps">
                {["", "", ""].map((step, index) => (
                  <li
                    key={index}
                    className={`${stepStatuses[index] ? "completed" : ""} ${
                      currentStep === index ? "checked" : ""
                    }`}
                  >
                    <a className="" onClick={() => handleStepClick(index)}>
                      {step}
                    </a>
                  </li>
                ))}
              </ul>
              <h4></h4>
              {currentStep === 0 && (
                <section>
                  <div className="form-group">
                    <h5>
                      Username <span className="required-indicator">*</span>
                    </h5>
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
                  <h5>
                    Password <span className="required-indicator">*</span>
                  </h5>
                  <div className="form-row">
                    <input
                      required
                      type="text"
                      className="form-control-lg"
                      value={pass}
                      onKeyDown={handleKeyPress}
                      onChange={handlePassChange}
                      placeholder="password"
                    />
                  </div>
                  <Button variant="primary" onClick={handleNextClick}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Button>
                </section>
              )}
              <h4></h4>
              {currentStep === 1 && (
                <section>
                  <div className="form-group">
                    <h5>
                      Name <span className="required-indicator">*</span>
                    </h5>
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
                  <h5>
                    Role <span className="required-indicator">*</span>
                  </h5>
                  <div className="form-row">
                    <input
                      required
                      type="text"
                      className="form-control-lg"
                      value={role}
                      onKeyDown={handleKeyPress}
                      onChange={handleroleChange}
                      placeholder="Role"
                    />
                  </div>
                  <h5>
                    Photo <span className="required-indicator">*</span>
                  </h5>
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
                    <h5>
                      Description <span className="required-indicator">*</span>
                    </h5>
                    <textarea
                      className="form-control-lg"
                      placeholder="Description"
                      type="text"
                      value={description}
                      onChange={handleDescriptionChange}
                      style={{ Height: "108px" }}
                    ></textarea>
                  </div>
                  <Button variant="primary" onClick={handleNextClick}>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Button>
                </section>
              )}

              <h4></h4>
              {currentStep === 2 && (
                <>
                  {validated ? (
                    <section className="svg">
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 130.2 130.2"
                      >
                        <circle
                          className="path circle"
                          fill="none"
                          stroke="#73AF55"
                          strokeWidth="6"
                          strokeMiterlimit="10"
                          cx="65.1"
                          cy="65.1"
                          r="62.1"
                        />
                        <polyline
                          className="path check"
                          fill="none"
                          stroke="#73AF55"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          points="100.2,40.2 51.5,88.8 29.8,67.5 "
                        />
                      </svg>
                      <p>Ready to Post </p>
                      <button type="submit" className="btn-lg btn-success">
                        Post
                      </button>
                    </section>
                  ) : (
                    <section>
                      <p className="error-message">
                        Please fill in all required fields.
                      </p>
                      <button
                        className="btn btn-outline-danger"
                        onClick={handlePreviousClick}
                      >
                        Go Back
                      </button>
                    </section>
                  )}
                </>
              )}
            </Form.Group>
          </Form>
        </div>
      </div>

      <div className="container">
        <Row>
          <Col>
            <div>
              <h2>leaders</h2>
              <Carousel>
                {teamData.map((teamMember) => (
                  <Carousel.Item key={teamMember.id}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={teamMember.photo}
                        alt={teamMember.name}
                      />
                      <Card.Body>
                        <Card.Title>{teamMember.name}</Card.Title>
                        <Card.Text>{teamMember.role}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Col>
          <Col>
            {" "}
            <div>
              <h2>Members</h2>
              <Carousel>
                {teamData.map((teamMember) => (
                  <Carousel.Item key={teamMember.id}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={teamMember.photo}
                        alt={teamMember.name}
                      />
                      <Card.Body>
                        <Card.Title>{teamMember.name}</Card.Title>
                        <Card.Text>{teamMember.role}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Col>
          <Col>
            {" "}
            <div>
              <h2>Founders</h2>
              <Carousel>
                {teamData.map((teamMember) => (
                  <Carousel.Item key={teamMember.id}>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={teamMember.photo}
                        alt={teamMember.name}
                      />
                      <Card.Body>
                        <Card.Title>{teamMember.name}</Card.Title>
                        <Card.Text>{teamMember.role}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default App;
