import { useState } from 'react';
import PropTypes from 'prop-types';

function Player({player, players, setPlayers}) {
  const [addValue, setAddValue] = useState('');
  const [removeValue, setRemoveValue] = useState('');
  const [acquittance, setAcquittance] = useState('');

  const handleAdd = (player) => {
    const updatedAccount = Number(player[1].bank) + Number(addValue);
    const updatedPlayers = {...players, [player[0]]: { ...player[1], bank: updatedAccount }};
    setPlayers(updatedPlayers);
    localStorage.setItem('save', JSON.stringify(updatedPlayers));
    setAddValue('');
  };

  const handleRemove = (player) => {
    const updatedAccount = Number(player[1].bank) - Number(removeValue);
    const updatedPlayers = {...players, [player[0]]: { ...player[1], bank: updatedAccount }};
    setPlayers(updatedPlayers);
    localStorage.setItem('save', JSON.stringify(updatedPlayers));
    setRemoveValue('');
  };

  return (
    <tr key={ player[0] } style={ { backgroundColor: player[1].color } } >
      <td>{ player[0] }</td>
      <td>
        { `R$ ${player[1].bank}` }
        <a
          className='bank-account-msg'
          href={`https://api.whatsapp.com/send/?phone=${player[1].cellphone}&text=Conta: R$${player[1].bank}`}
          target='_blank'
          rel='noreferrer'
        >
          <i className="fa-solid fa-mobile-screen-button" />
        </a>
      </td>
      <td className='add'>
        <input
          type='number'
          onChange={ (event) => setAddValue(event.target.value) }
          value={addValue}
          onKeyUp={ (event) => { if (event.key === 'Enter') { handleAdd(player) }}}
        />
        <button className='operation' onClick={ () => handleAdd(player) }>
          <i className="fa-solid fa-plus" />
        </button>
      </td>
      <td className='remove'>
        <input
          type='number'
          onChange={ (event) => setRemoveValue(event.target.value) }
          value={removeValue}
          onKeyUp={ (event) => { if (event.key === 'Enter') { handleRemove(player) }}}
        />
        <button className='operation' onClick={ () => handleRemove(player) }>
          <i className="fa-solid fa-minus" />
        </button>
      </td>
      <td className='acquittance'>
        <input
          type="number"
          name="acquittance"
          id="acquittance"
          onChange={ (event) => setAcquittance(event.target.value) }
          value={ acquittance } 
        />
      </td>
    </tr>
  );
}

Player.propTypes = ({
  player: PropTypes.array,
}).isRequired;

export default Player;