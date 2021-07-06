import React, { useState, useEffect } from "react";
import "./MyForm.css";

const MyForm = ({ id }) => {
  const initialResp = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
  };
  const [questions, setQuestions] = useState();

  useEffect(() => {
    fetch("http://localhost:3000/form")
      .then((response) => response.json())
      .then((questions) => setQuestions(questions));
  }, []);

  const [responses, setResponses] = useState(initialResp);

  useEffect(() => {
    try {
      fetch(`http://localhost:3000/showresponses/${id}`)
        .then((data) => data.json())
        .then((responses) => {
          if (responses.length) {
            console.log(responses);
            let rows = [];
            responses.forEach((element) => {
              rows.push(Object.values(element));
            });
            setResponses(Object.fromEntries(rows));
          }
        });
    } catch (error) {
      alert("there was an error fetching your responses");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResponses({
      ...responses,
      [name]: value,
    });
  };

  const onButtonSubmit = () => {
    fetch(`http://localhost:3000/updateresponses/${id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(responses),
    })
      .then((response) => {
        alert("Form Submitted");
        console.log(response);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <div className="container center">
        <form className="form center pa4 br3 shadow-5">
          <label>{questions && questions[0].question}</label>
          <input
            className="f4 pa2 w-70 center"
            type="text"
            value={responses && responses[1]}
            name="1"
            onChange={handleInputChange}
          />
          <label>{questions && questions[1].question}</label>
          <input
            className="f4 pa2 w-70 center"
            type="text"
            name="2"
            value={responses && responses[2]}
            onChange={handleInputChange}
          />
          <label>{questions && questions[2].question}</label>
          <input
            className="f4 pa2 w-70 center"
            type="text"
            name="3"
            value={responses && responses[3]}
            onChange={handleInputChange}
          />
          <label>{questions && questions[3].question}</label>
          <input
            className="f4 pa2 w-70 center"
            type="text"
            name="4"
            value={responses && responses[4]}
            onChange={handleInputChange}
          />
          <label>{questions && questions[4].question}</label>
          <input
            className="f4 pa2 w-70 center"
            type="text"
            name="5"
            value={responses && responses[5]}
            onChange={handleInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onButtonSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyForm;
