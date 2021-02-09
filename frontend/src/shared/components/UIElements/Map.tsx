import React from 'react';

import './Map.css';

declare global {
  interface Window {
      ol: any;
  }
}

interface LocationProps {
  lat: number;
  lng: number;
};

interface MapProps {
  className?: string;
  style?: React.CSSProperties;
  center: LocationProps;
  zoom: number;
};

const Map = ({className, style, center, zoom}: MapProps) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
 
  React.useEffect(() => {
    new window.ol.Map({
      target: mapRef?.current?.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM()
        })
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom
      })
    });
  }, [center, zoom]);
  return (
    <div
      ref={mapRef}
      className={`map ${className}`}
      style={style}
      id="map"
    ></div>
  )
};

export default Map;