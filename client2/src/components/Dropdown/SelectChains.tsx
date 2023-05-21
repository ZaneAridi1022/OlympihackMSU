import React, { useState } from 'react';
import Select from 'react-select';
import styles from './SelectChains.module.scss';
import avalancheSrc from '../../assets/avalanche.png';
import etheruemSrc from '../../assets/ethereum.png';
import fantomSrc from '../../assets/fantom.png';
import polygonSrc from '../../assets/polygon.png';


function SelectChains({ onSelect }) {
  const chainOptions = [
    { value: 'mainnet', label: 'Ethereum', imageSrc: etheruemSrc },
    { value: 'polygon', label: 'Polygon', imageSrc: polygonSrc },
    { value: 'avalanche', label: 'Avalanche', imageSrc: avalancheSrc },
    { value: 'fantom', label: 'Fantom', imageSrc: fantomSrc },
  ];

  const [selectedChain, setSelectedChain] = useState("");

  const handleChange = (option) => {
    setSelectedChain(option);
    onSelect(option.value);
  };

  const customOptionRenderer = ({ data }) => (
    <div className={styles.options}>
      <button className={styles.clear} onClick={() => handleChange(data)}>
        <img src={data.imageSrc} alt={data.label} className={styles.optionImage} />
        <span>{data.label}</span>
      </button>
    </div>
  );

  return (
    <div>
      <img src={etheruemSrc} alt="hello" className="chain-option-image" />
      <h2>Select Chains</h2>

      <Select
        options={chainOptions}
        value={selectedChain}
        onChange={handleChange}
        className={styles.dropdown}
        components={{ Option: customOptionRenderer }}
      />
    </div>
  );
}

export default SelectChains;