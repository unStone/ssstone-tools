import { ChangeEventHandler, FocusEventHandler, useMemo, useState } from "react"

import { isDecimal, isHexadecimal, isOctalSystem, isBinarySystem, toDecimal, hexToDecimal, octalDecimal, binaryToDecimal } from "utils/number";
import CopyButton from "components/clipboard/copy-button";
import PasteButton from "components/clipboard/paste-button";

const NumberType = () => {
  const [decimalismValue, setDecimalismValue] = useState('10');

  const hexadecimalismValue = useMemo(() => {
    return Number(decimalismValue).toString(16);
  }, [decimalismValue])

  const octalNumberSystemValue = useMemo(() => {
    return Number(decimalismValue).toString(8);
  }, [decimalismValue])

  const binarySystemValue = useMemo(() => {
    return Number(decimalismValue).toString(2);
  }, [decimalismValue])

  const decimalism = (value: string | null) => {
    if (!value) return;
    if (!isDecimal(value)) {
      return setDecimalismValue('0');
    }
    setDecimalismValue(toDecimal(value).toString());
  }

  const hexadecimalism = (value: string | null) => {
    if (!value) return;
    if (!isHexadecimal(value)) {
      return setDecimalismValue('0');
    }
    setDecimalismValue(hexToDecimal(value).toString());
  }

  const octalNumberSystem = (value: string | null) => {
    if (!value) return;
    if (!isOctalSystem(value)) {
      return setDecimalismValue('0');
    }
    setDecimalismValue(octalDecimal(value).toString());
  }
  
  const binarySystem = (value: string | null) => {
    if (!value) return;
    if (!isBinarySystem(value)) {
      return setDecimalismValue('0');
    }
    setDecimalismValue(binaryToDecimal(value).toString());
  }


  const onChangeDecimalism: ChangeEventHandler<HTMLInputElement> = (e) => {
    decimalism(e.target.value);
  }

  const onChangeHexadecimalism: ChangeEventHandler<HTMLInputElement> = (e) => {
    hexadecimalism(e.target.value);
  }

  const onChangeOctalNumberSystem: ChangeEventHandler<HTMLInputElement> = (e) => {
    octalNumberSystem(e.target.value);
  }

  const onChangeBinarySystem: ChangeEventHandler<HTMLInputElement> = (e) => {
    binarySystem(e.target.value);
  }

  const selectInput: FocusEventHandler<HTMLInputElement> = (e) => {
    setTimeout(() => e.target.select())
  }

  return (
    <div>
      <p>十进制</p>
      <input onFocus={selectInput} value={decimalismValue} onChange={onChangeDecimalism}/><CopyButton value={decimalismValue} /><PasteButton onCallback={decimalism} />
      <p>十六进制</p>
      <input onFocus={selectInput} value={hexadecimalismValue} onChange={onChangeHexadecimalism}/><CopyButton value={hexadecimalismValue} /><PasteButton onCallback={hexadecimalism} />
      <p>八进制</p>
      <input onFocus={selectInput} value={octalNumberSystemValue} onChange={onChangeOctalNumberSystem}/><CopyButton value={octalNumberSystemValue} /><PasteButton onCallback={octalNumberSystem} />
      <p>二进制</p>
      <input onFocus={selectInput} value={binarySystemValue} onChange={onChangeBinarySystem}/><CopyButton value={binarySystemValue} /><PasteButton onCallback={binarySystem} />
    </div>
  )
}

export default NumberType;
