import React from 'react'
import './index.css'
class Map extends React.Component {
  componentDidMount() {
    const { BMap } = window
    const map = new BMap.Map('container')
    const point = new BMap.Point(116.404, 39.915)
    map.centerAndZoom(point, 15)
  }

  render() {
    return (
      <div className="map">
        <div id="container"></div>
      </div>
    )
  }
}
export default Map
