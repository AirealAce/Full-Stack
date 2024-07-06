import React from "react"

const Event = (props) => {
  const navigateToUrl = () => {
    window.location.href = props.url; 
  };

  return (
    <td className={'Event ' + props.color}>
      <div className="event-container">
        <img src={props.imageUrl} alt={props.event} className="event-image" />
        <div className="event-details">
          <h5>{props.event}</h5>
          <h6>{props.resourcetype}</h6>
          <p>{props.description}</p>
          <button onClick={navigateToUrl} className="menu-button">
            View
          </button>
        </div>
      </div>
    </td>
  )
}



export default Event;