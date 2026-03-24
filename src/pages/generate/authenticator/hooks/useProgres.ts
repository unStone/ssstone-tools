import { useEffect, useRef, useState } from 'react';
import { TOTP } from 'totp-generator';

import { Values } from '../types'

const getPercent = (cycle: number) => {
  return (((new Date().getTime() / 1000) % cycle) / cycle) * 100;
}

const getDynamicCode = async (data: Values) => {
  const { secretKey, cycle = 30, digit = 6, algorithm = 'SHA-1' } = data;

  try {
    const result = await TOTP.generate(secretKey, {
      digits: digit,
      algorithm,
      period: cycle,
    });

    return result.otp;
  } catch (error: any) {
    return '错误：' + error?.message;
  }
}

const useProgres = (data: Values) => {
  const { cycle = 30 } = data;
  const [dynamicCode, setDynamicCode] = useState<string>('');
  const [percent, setPercent] = useState<number>(100);
  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    const refreshCode = async () => {
      setPercent(getPercent(cycle));
      setDynamicCode(await getDynamicCode(data));
    };

    refreshCode();
    timer.current = setInterval(refreshCode, 300);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [cycle, data]);

  return { dynamicCode, percent }
}

export default useProgres;
