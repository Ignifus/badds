import React, {Component} from 'react'
import TimeAgo from 'react-time-ago'

class LastUpdated extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <small className="text-muted">
        Actualizado <TimeAgo locale="es-AR">{this.props.date}</TimeAgo>
      </small>
    );
  }
}

export default LastUpdated;
