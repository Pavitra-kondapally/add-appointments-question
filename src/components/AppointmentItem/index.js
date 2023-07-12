// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appDetails, toggleIsStarred} = props
  const {appTitle, appDate, isStarred, id} = appDetails

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarIcon = () => {
    toggleIsStarred(id)
  }

  return (
    <li className="app-list-item">
      <div className="app-item-top-container">
        <p className="app-title-styling">{appTitle}</p>
        <button type="button" className="star-btn" onClick={onClickStarIcon}>
          <img src={starImage} data-testid="star" alt="star" />
        </button>
      </div>
      <p className="app-date-styling">{appDate}</p>
    </li>
  )
}

export default AppointmentItem
