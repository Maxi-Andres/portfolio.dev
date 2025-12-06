const NeonBackgroundEffect = () => {
  return (
    <div className="pointer-events-none absolute top-0 left-0 -z-50 h-full w-screen overflow-hidden">
      <div className="header-bg-elipse-1 absolute top-1/30 left-1/2 -translate-x-1/90 md:top-1/16"></div>
      <div className="header-bg-elipse-2 absolute top-1/30 left-1/2 -translate-x-1/2 md:top-1/16"></div>
      <div className="header-bg-elipse-3 absolute top-1/30 right-1/2 translate-x-1/90 md:top-1/16"></div>

      {/* azul arriba izquierda */}
      <div className="header-bg-elipse-1 absolute top-0 -left-70 translate-y-[380%]"></div>

      {/* cyan y violeta derecha medio */}
      <div className="header-bg-elipse-2 absolute -right-90 translate-y-[365%]"></div>
      <div className="header-bg-elipse-3 absolute -right-70 translate-y-[910%]"></div>

      {/* violeta izquierda medio */}
      <div className="header-bg-elipse-3 absolute -left-80 translate-y-[810%]"></div>

      {/* azul cyan izquierda medio abajo */}
      <div className="header-bg-elipse-1 absolute -left-90 translate-y-[910%]"></div>
      <div className="header-bg-elipse-2 absolute -left-120 translate-y-[675%]"></div>

      {/* violeta derecha medio abajo */}
      <div className="header-bg-elipse-3 absolute -right-80 translate-y-[1390%]"></div>

      {/* azul cyan abajo */}
      <div className="header-bg-elipse-2 absolute -right-110 translate-y-[930%]"></div>
      <div className="header-bg-elipse-1 absolute -left-110 translate-y-[1390%]"></div>
    </div>
  )
}

export default NeonBackgroundEffect
