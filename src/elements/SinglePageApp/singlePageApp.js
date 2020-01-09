import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Navigation from '../navigation';
import FitBox from 'react-fitbox';
import SpriteAnimator from '../spriteAnimator';
import rick from '../../static/rick-sprite.png'
import morty from '../../static/morty-sprite.png'
import { ReactComponent as Gh } from '../../static/github.svg';
import './demo.scss';

const SinglePageApp = ({ config }) => {
  const [moving, setMoving] = useState('Fw');
  const height = useSelector(state => state.deviceInfoReducer.height);
  const width = useSelector(state => state.deviceInfoReducer.width);

  const containerRef = useRef();

  useEffect(() => {
    const handleClickEvent = (e) => {
      if (!e.defaultPrevented) {
        const dir = e.clientX >= width / 2 ? 'Fw' : 'Bw';
        setMoving(dir);
      }
    }
    document.addEventListener('click', handleClickEvent);
    return (() => {
      document.removeEventListener('click', handleClickEvent);
    })
  })

  const stopMoving = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setMoving(false);
  }

  const controller = () => {
    return {
      stopped: moving === false,
      fw: moving === 'Fw',
      bw: moving === 'Bw'
    };
  }

  const fetchRoadClass = () => {
    let base = 'road';
    let baseMove = 'move'
    let result = moving === false ? base : `${base} ${baseMove}${moving}`
    return result;
  }

  return (
    <div className="spa" style={{ height: `${height}px`, width: `${width}px` }}>
      <Navigation config={config} />
      <div ref={containerRef} className="container">
        <FitBox ratio={.5} size={{ h: 360, w: 500 }} fitWidth container={containerRef} >
          <span className="text">&lt;FitBox/&gt;</span>
          <SpriteAnimator sprite={rick} className="rick" controller={controller()} />
          <SpriteAnimator sprite={morty} className="morty" controller={controller()} />
          <div className={fetchRoadClass()} onClick={stopMoving}>
            <div className="shadow"></div>
          </div>
        </FitBox>
        <div className="github">
          <Gh onClick={() => { window.location.href = "https://github.com/sergioavazquez/fitbox" }} />
        </div>
      </div>
    </div>
  )
};
export default SinglePageApp;