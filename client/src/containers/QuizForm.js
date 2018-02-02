import React, { Component } from "react";
import QuestionForm from "./QuestionForm";
import "./QuizForm.css";

const MAX_QUESTIONS_LENGTH = 3;

function validate(name, category, questions) {
  let questionsArray = questions.map((question) => {
    return {
      question_desc: question.question_desc.length === 0,
      option_1: question.option_1.length === 0,
      option_2: question.option_2.length === 0,
      option_3: question.option_3.length === 0,
      correct_answer: question.correct_answer.length === 0
    }
  }) 
  return {
    name: name.length === 0,
    category: category.length === 0,
    questions: questionsArray
  }
}

class QuizForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      category: "Games",
      questions: [],
      touched: {
        name: false,
        category: false,
        questions: []
      },
      errorMessages: [],
      nameUnique: true
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDisabledSubmit = this.handleDisabledSubmit.bind(this);
    this.handleAddQuestion = this.handleAddQuestion.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleQuestionRemove = this.handleQuestionRemove.bind(this);
    this.canBeSubmitted = this.canBeSubmitted.bind(this);
  }

  handleBlur = (field) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true}
    });   
  }

  handleQuestionBlur = (field, idx) => (evt) => {
    let newQuestionsTouched = this.state.touched.questions.map((question, qidx) => {
      if (qidx !== idx) return question;
      return {...question, [field]: true}
    });
    this.setState({touched: {...this.state.touched, questions: newQuestionsTouched}});
  }

  handleDisabledSubmit() {
    let newQuestionsTouched = this.state.touched.questions.map((question) => {
      return {
        question_desc: true,
        option_1: true,
        option_2: true,
        option_3: true,
        correct_answer: true
      }
    })

    let newTouched = {
      name: true,
      category: true,
      questions: newQuestionsTouched
    }

    this.setState({touched: newTouched});
  }

  handleSubmit(e) {
    e.preventDefault();
    let body = {
      name: this.state.name,
      category: this.state.category,
      questions: this.state.questions
    }

    fetch("/api/quizzes/create", {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    })
    .then(data => {
      if (data.ok) {
        this.props.doFetch();
        this.setState({      
          name: "",
          category: "Games",
          questions: [],
          touched: {
            name: false,
            category: false,
            questions: []
          },
          errorMessages: [],
          nameUnique: true
        })  
      } else if (data.status === 400) {
        data.json().then(data => {
          console.log(data.message);
          let newErrorMessages = Object.keys(data.message).map((key) => {
            return data.message[key].message;
          })
          this.setState({errorMessages: newErrorMessages});
        });
      }
    })
  }

  async handleNameChange(event) {
    let target = event.target
    this.setState({[target.name]: target.value}, () => {
      if (this.state.name) {
        let fullURL = "api/quizzes/exists/?name=" + this.state.name;
        fetch(fullURL, {
          headers: new Headers({
            "Content-Type": "application/json"
          })
        })
        .then(data => {
          if (data.ok) {
            data.json().then(jsonData => {
              this.setState({nameUnique: !jsonData.results})
            })
          } else {
            console.log(data.status);
          }
        })
      }
    })
  }

  handleCategoryChange(event) {
    let target = event.target
    this.setState({[target.name]: target.value})
  }

  handleQuestionChange = (idx) => (evt) => {
    let questionsChange = this.state.questions.map((question, qidx) => {
      if (qidx !== idx) return question;
      return {...question, [evt.target.name]: evt.target.value}
    }); 
    this.setState({questions: questionsChange});
  }

  handleAddQuestion() {
    let newQuestion = [{
      question_desc: "",
      option_1: "",
      option_2: "",
      option_3: "",
      correct_answer: ""
    }]
    let newQuestiontouched = [{
      question_desc: false,
      option_1: false,
      option_2: false,
      option_3: false,
      correct_answer: false
    }]
    this.setState({
      questions: this.state.questions.concat(newQuestion),
      touched: {...this.state.touched, questions: this.state.touched.questions.concat(newQuestiontouched)}
    });
  }

  handleQuestionRemove = (idx) => () => {
    let newQuestions = this.state.questions.filter((question, qidx) => {
      return qidx !== idx;
    });
    let newQuestionsTouched = this.state.touched.questions.filter((question, qidx) => {
      return qidx !== idx;
    })
    this.setState({
      questions: newQuestions,
      touched: {...this.state.touched, questions: newQuestionsTouched}
    });
  }

  canBeSubmitted(errors) {
    let questionsInvalid = errors.questions.some(x => Object.keys(x).some(z => x[z]))
    return !(questionsInvalid || Object.keys(errors).some(x => errors[x] === true || !this.state.nameUnique));
  }

  render() {
    const errors = validate(this.state.name, this.state.category, this.state.questions);
    const isEnabled = this.canBeSubmitted(errors);

    const shouldMarkError = (field) => {
      return errors[field] && this.state.touched[field]
    }  

    const shouldMarkQuestionError = (field, idx) => {
      return errors.questions[idx][field] && this.state.touched.questions[idx][field];
    }

    return(
      <form onSubmit={this.handleSubmit}>
      {this.state.errorMessages.map((error) => (
        <div key="error">{error}</div>
      ))}
        <label>
          Name: 
          <input 
            name="name"
            className={shouldMarkError("name") ? "error" : ""}
            onBlur={this.handleBlur("name")}
            type="text"
            maxLength="255"
            value={this.state.name}
            onChange={this.handleNameChange} />
        </label>
        <label>
        {!this.state.nameUnique && <div>That name is already taken</div>}
          category:
          <select name="category" className={shouldMarkError("category") ? "error" : ""} value={this.state.category} onChange={this.handleCategoryChange}>
            <option value="Games">Games</option>  
            <option value="Sports">Sports</option>
            <option value="Music">Music</option>
            <option value="Other">Other</option>
          </select>  
        </label>
        {this.state.questions.map((question, idx) => (
          <div key={idx}>
            <QuestionForm 
              question={question} 
              idx={idx} 
              handleChange={this.handleQuestionChange}
              handleRemove={this.handleQuestionRemove} 
              handleBlur={this.handleQuestionBlur}
              shouldMarkError={shouldMarkQuestionError}/>
          </div>    
        ))}
        {this.state.questions.length < MAX_QUESTIONS_LENGTH && 
          <button type="button" onClick={this.handleAddQuestion}>Add Question</button>}
        {!isEnabled ? <button type="button" onClick={this.handleDisabledSubmit} className="disabled">upload</button> : 
        <button>upload</button>}
      </form>  
    )
  }
}

export default QuizForm;