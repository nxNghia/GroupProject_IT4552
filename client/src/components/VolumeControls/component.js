import React, { useState } from "react";
import PropTypes from "prop-types";
import "./VolumeControls.css";

// class VolumeControls extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       volume: props.volume
//     };
//   }

//   updateVolume = e => {
//     this.setState({
//       volume: e.target.value
//     });

//     this.props.updateVolume(Math.ceil(e.target.value / 10) * 10);
//   };

//   render() {
//     return (
//       <div className="volume-container">
//         <i className="fa fa-volume-up" aria-hidden="true" />
//         <input
//           className="volume"
//           type="range"
//           min={0}
//           max={100}
//           value={this.state.volume}
//           onChange={this.updateVolume}
//         />
//       </div>
//     );
//   }
// }

const VolumeControls = ({
    volume,
    updateVolume
}) => {
    const [_volume, setVolume] = useState(volume)
  
    const updateVolumeHandle = e => {
        setVolume(e.target.volume)
  
        updateVolume(Math.ceil(e.target.value / 10) * 10);
    };
  
    return (
        <div className="volume-container">
            <i className="fa fa-volume-up" aria-hidden="true" />
            <input
                className="volume"
                type="range"
                min={0}
                max={100}
                value={_volume}
                onChange={updateVolumeHandle}
            />
        </div>
    );
}

VolumeControls.propTypes = {
  volume: PropTypes.number,
  updateVolume: PropTypes.func
};

export default VolumeControls;
