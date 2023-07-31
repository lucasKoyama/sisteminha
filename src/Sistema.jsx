import { useEffect, useState } from 'react';
import './Sistema.css';
import Player from './Player';

function Sistema() {
  const [newPlayer, setNewPlayer] = useState('');
  const [color, setColor] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [players, setPlayers] = useState({});
  const [dice, setDice] = useState([]);

  const phoneMask = (number) => {
    const cleaned = ('' + number).replace(/\D/g, '');
    let maskedNumber = cleaned.length === 11 ? "(__) _____-____" : "(__) ____-____";
    for (let i = 0; i < cleaned.length; i++) {
      maskedNumber = maskedNumber.replace('_', cleaned.charAt(i));
    }
    return maskedNumber;
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Backspace') {
      setCellphone((prevNumber) => prevNumber.slice(0, -1));
      event.preventDefault();
    }
  };

  const handleAddPlayer = (event) => {
    event.preventDefault();
    const updatedPlayers = {
      ...players,
      [newPlayer]: {
        bank: 25000,
        color,
        cellphone,
      }
    };
    setPlayers(updatedPlayers);
    localStorage.setItem('save', JSON.stringify(updatedPlayers));
  };

  const handleReset = (event) => {
    event.preventDefault();
    localStorage.clear();
    setNewPlayer('');
    setPlayers({});
    setCellphone('');
    setColor('');
    setDice([]);
  };

  const roll = (event) => {
    event.preventDefault();
    const dice1 = Math.floor(1 + Math.random() * 6);
    const dice2 = Math.floor(1 + Math.random() * 6);
    setDice([dice1, dice2]);
  };

  useEffect(() => {
    const savedPlayers = localStorage.getItem('save');
    if (savedPlayers) { setPlayers(JSON.parse(savedPlayers)); }
  }, []);

  const diceNum = ['one', 'two', 'three', 'four', 'five', 'six'];

  return (
    <>
      <form>
        <fieldset className='add-player'>
          <div className='inputs-add-player'>
            <input
              onChange={(event) => setNewPlayer(event.target.value) }
              placeholder='Lucas'
              value={ newPlayer }
              style={ { backgroundColor: color } }
            />
            <input
              className='color'
              onChange={(event) => setColor(event.target.value) }
              type="color"
              name="color"
              id="color"
            />
            <input
              className='cellphone'
              onChange={ (event) => setCellphone(event.target.value) }
              onKeyDown={ handleKeyDown }
              value={ phoneMask(cellphone) }
              placeholder='(19) 99540-5067'
              type="tel"
              name="cellphone"
              id="cellphone"
            />
          </div>
          <div className='buttons-add-player'>
            <button onClick={ (event) => handleAddPlayer(event) }>Adicionar</button>
            <button onClick={ (event) => roll(event) }>
              Dados
              <i className="fa-solid fa-dice" />
            </button>
            <div className='dices'>
              <i className={`fa-solid fa-dice-${diceNum[dice[0] - 1]}`} />
              <i className={`fa-solid fa-dice-${diceNum[dice[1] - 1]}`} />
              <h5>{ dice.length ? dice[0] + dice[1] : '' }</h5>
            </div>
            <button onClick={ (event) => handleReset(event) }>Reset</button>
          </div>
        </fieldset>
      </form>
      <table className='sistema'>
        <thead>
          <tr>
            <th>Jogador</th>
            <th>Conta</th>
            <th>Adicionar</th>
            <th>Remover</th>
            <th>Isenções</th>
          </tr>
        </thead>
        <tbody>
          { Object.entries(players).map((player) => (
              <Player key={ player.name } player={ player } players={ players } setPlayers={ setPlayers } />
          )) }
        </tbody>
      </table>
    </>
  );
}

export default Sistema;