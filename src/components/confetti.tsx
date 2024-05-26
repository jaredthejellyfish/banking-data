'use client';

import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'usehooks-ts';

export default function SuccessConfetti() {
  const [numberOfPieces, setNumberOfPieces] = useState(200);

  const { width, height } = useWindowSize();

  useEffect(() => {
    setNumberOfPieces(200);

    const timer = setTimeout(() => {
      setNumberOfPieces(0);
    }, 2000);

    return () => {
      setNumberOfPieces(0);
      clearTimeout(timer);
    };
  }, []);

  return (
    <Confetti width={width} height={height} numberOfPieces={numberOfPieces} />
  );
}
