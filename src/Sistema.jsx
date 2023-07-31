import { useEffect, useState } from 'react';
import './Sistema.css';
import Player from './Player';

function Sistema() {
  const [newPlayer, setNewPlayer] = useState('');
  const [color, setColor] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [players, setPlayers] = useState({});
  const [dice, setDice] = useState([]);

  const handleAddPlayer = (event) => {
    event.preventDefault();
    const updatedPlayers = { ...players, [newPlayer]: { bank: 25000, color } };
    setPlayers(updatedPlayers);
    localStorage.setItem('save', JSON.stringify(updatedPlayers));
  };

  const handleReset = (event) => {
    event.preventDefault();
    localStorage.clear();
    setNewPlayer('');
    setPlayers({});
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
            placeholder='(19) 99540-5067'
            type="tel"
            name="cellphone"
            id="cellphone"
          />
          <button onClick={ (event) => handleAddPlayer(event) }>Adicionar</button>
          <button onClick={ (event) => roll(event) }>
            Dados
            <i class="fa-solid fa-dice" />
          </button>
          <div className='dices'>
            <i class={`fa-solid fa-dice-${diceNum[dice[0] - 1]}`} />
            <i class={`fa-solid fa-dice-${diceNum[dice[1] - 1]}`} />
            <h5>{ dice.length ? dice[0] + dice[1] : '' }</h5>
          </div>
          <button onClick={ (event) => handleReset(event) }>Reset</button>
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
            <Player player={ player } players={ players } setPlayers={ setPlayers } />
          )) }
        </tbody>
      </table>
    </>
  );
}

export default Sistema;