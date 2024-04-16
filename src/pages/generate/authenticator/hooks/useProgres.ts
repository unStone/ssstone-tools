import { useEffect, useRef, useState } from'react';
import { TOTP } from "totp-generator";

import { Values } from '../types'

const getPercent = (cycle: number) => {
  return (((new Date().getTime() / 1000) % cycle) / cycle) * 100;
}

const getDynamicCode = (data: Values) => {
  const { secretKey, cycle = 30, digit = 6, algorithm = 'SHA-1' } = data;

  let otp = '';
  try {
    otp = TOTP.generate(secretKey, {
      digits: digit,
      algorithm,
      period: cycle,
    }).otp
  } catch (error: any) {
    otp = '错误：' + error?.message;
  }
  return otp;
}

const useProgres = (data: Values) => {
  const { cycle = 30 } = data;
  const [ dynamicCode, setDynamicCode ] = useState<string>('');
  const [ percent, setPercent ] = useState<number>(100);
  const timer = useRef<number>();

  useEffect(() => {
    timer.current = setInterval(() => {
      setPercent(getPercent(cycle));
      setDynamicCode(getDynamicCode(data));
    }, 300)
  }, [])

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, [])
  
  return { dynamicCode, percent }
}

export default useProgres;
