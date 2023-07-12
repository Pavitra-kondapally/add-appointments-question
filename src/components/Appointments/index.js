// Write your code here
import {Component} from 'react'
import './index.css'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    appTitle: '',
    appDate: '',
  }

  onChangingTitle = event => {
    this.setState({
      appTitle: event.target.value,
    })
  }

  onChangingDate = event => {
    const inputDate = event.target.value
    const formatedDate = format(inputDate, 'dd MMMM yyyy, EEEE')
    this.setState({
      appDate: formatedDate,
    })
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onAddingAppointment = event => {
    event.preventDefault()
    const {appTitle, appDate} = this.state
    const newAppointment = {
      id: uuidv4(),
      appTitle,
      appDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [prevState.appointmentsList, newAppointment],
      appTitle: '',
      appDate: '',
    }))
  }

  onSelectingStarred = () => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      ),
    }))
  }

  render() {
    const {appointmentsList} = this.state
    return (
      <div className="container">
        <div className="card-container">
          <div className="top-part-container">
            <form
              className="appointment-form-container"
              onSubmit={this.onAddingAppointment}
            >
              <h1 className="heading-style">Add Appointment</h1>
              <label className="title-style" htmlFor="titleLabel">
                TITLE
              </label>
              <input
                type="text"
                id="titleLabel"
                className="title-input-box"
                onChange={this.onChangingTitle}
              />
              <br />
              <label className="date-style" htmlFor="dateLabel">
                DATE
              </label>
              <input
                type="date"
                id="dateLabel"
                onChange={this.onChangingDate}
              />
              <br />
              <button className="button-styling" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              className="appointments-image"
              alt="appointments"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="bottom-header-container">
            <h1 className="app-list-title-style">Appointments</h1>
            <button
              className="starred-btn"
              type="button"
              onClick={this.onSelectingStarred}
            >
              Starred
            </button>
          </div>
          <ul className="app-list-container">
            {appointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
