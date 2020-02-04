import React, { useState, useEffect } from 'react';

const SpriteAnimator = ({ sprite, fps, size, frameSize, nFrames, spacer, className, controller }) => {
  const [spriteLine, setSpriteLine] = useState(1);
  const [currentFrame, setCurrentFrame] = useState(0);
  const frameDelay = Math.floor(1000 / fps);

  const timeouts = [];

  useEffect(() => {
    const updateFrame = () => {
      const t = setTimeout(() => {
        const nextFrame = currentFrame + 1 < nFrames ? currentFrame + 1 : 0;
        setCurrentFrame(nextFrame);
      }, frameDelay);
      timeouts.push(t);
    }
    if (controller && !controller.stopped) {
      setSpriteLine(1);
      window.requestAnimationFrame(updateFrame);
    } else {
      setSpriteLine(0);
      setCurrentFrame(0);
    }

    return (() => {
      if (timeouts.length > 0) {
        timeouts.forEach(t => clearTimeout(t));
      }
    })
  }, [currentFrame, nFrames, timeouts, frameDelay, controller])

  const renderAnimationFrame = () => {

    const framePosX = currentFrame * frameSize.w + ((currentFrame + 1) * spacer);
    const framePosY = spriteLine * frameSize.h + (spriteLine + 1) * spacer;

    const flip = controller && !controller.sopped && controller.fw ? -1 : 1;
    const spriteStyles = {
      opacity: 1,
      zIndex: 5,
      width: `${frameSize.w}px`,
      height: `${frameSize.h}px`,
      backgroundImage: `url(${sprite})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${size.w}px ${size.h}px`,
      backgroundPosition: `${-framePosX}px ${-framePosY}px`,
      transform: `rotate(0.1deg) scaleX(${flip})`
    };

    return <div style={spriteStyles} className={className} />;
  };

  return renderAnimationFrame();
}

SpriteAnimator.defaultProps = {
  fps: 9,
  spacer: 4,
  frameSize: { h: 162, w: 125 },
  size: { h: 500, w: 520 },
  nFrames: 4,
  className: 'spriteAnimator'
}

export default SpriteAnimator;