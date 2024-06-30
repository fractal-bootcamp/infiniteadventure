import React, { useEffect, useState } from 'react';
import { Pokemon, Move } from './app.types';
import "./App.css";
import { motion } from "framer-motion";
import { usePokeController } from './data';


const PokemonCard: React.FC<{ pokemon: Pokemon; isOpponent: boolean }> = ({ pokemon, isOpponent }) => (
  <motion.div
    className={`absolute ${isOpponent ? 'top-4 right-4' : 'bottom-4 left-4'} border rounded-lg p-4 bg-white shadow-lg`}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-xl font-bold mb-2">{pokemon.name}</h2>
    <img 
      src={isOpponent ? pokemon.frontImg : pokemon.backImg} 
      alt={pokemon.name} 
      className="w-32 h-32 mx-auto"
    />
    <p>HP: {pokemon.hp}</p>
    <p>Type: {pokemon.type}</p>
  </motion.div>
);

const MoveButton: React.FC<{ move: Move; onClick: () => void }> = ({ move, onClick }) => (
  <motion.button 
    onClick={onClick} 
    className="w-full mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-left"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <div className="font-bold">{move.name}</div>
    <div className="text-sm">Type: {move.type} | Power: {move.power} | Accuracy: {move.accuracy}</div>
  </motion.button>
);

const VanishingAlert = ({message, timeout}: {message: string | null, timeout: number}) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), timeout);
  }, [timeout, message]);
  
  if (!message) return null;

  return (
    <motion.div 
      className="absolute top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      {message}
    </motion.div>
  );
};

const BattleResultModal: React.FC<{ isWin: boolean; onKeep: () => void; onSwap: () => void; onRetry: () => void }> = ({ isWin, onKeep, onSwap, onRetry }) => {
  return (
    <motion.div 
      className="fixed inset-0 bg-black/50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        {isWin ? (
          <>
            <h2 className="text-2xl font-bold text-green-600">Victory!</h2>
            <p className="my-4">You have defeated your opponent!</p>
            <button onClick={onKeep} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2">Keep Pokemon</button>
            <button onClick={onSwap} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Swap Pokemon</button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-red-600">Defeat!</h2>
            <p className="my-4">You have been defeated! Try again?</p>
            <button onClick={onRetry} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Retry Battle</button>
          </>
        )}
      </div>
    </motion.div>
  );
};


const PokemonFightScene: React.FC<{ userPokemon: Pokemon; opponentPokemon: Pokemon, onSwap: () => void, onFreshPokemon: () => void }> = ({ userPokemon, opponentPokemon, onSwap, onFreshPokemon }) => {
  const [userHP, setUserHP] = useState(userPokemon.hp);
  const [opponentHP, setOpponentHP] = useState(opponentPokemon.hp);
  const [attackAnimation, setAttackAnimation] = useState<{ isUser: boolean; x: number; y: number } | null>(null);
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const [attackTimeout, setAttackTimeout] = useState<Timer | null>(null);

  useEffect(() => {
    // reset if the pokemon changes
    setUserHP(userPokemon.hp);
    setOpponentHP(opponentPokemon.hp);
    setIsUserTurn(true);
  }, [userPokemon, opponentPokemon]);
  
  const handleAttack = (move: Move, isUser: boolean) => {
    const damage = Math.floor(move.power * (Math.random() * 0.4 + 0.8) / 3);
    if (isUser) {
      setOpponentHP(prev => Math.max(0, prev - damage));
      setAttackAnimation({ isUser: true, x: window.innerWidth * 0.75, y: window.innerHeight * 0.25 });
      setIsUserTurn(false);
    } else {
      setUserHP(prev => Math.max(0, prev - damage));
      setAttackAnimation({ isUser: false, x: window.innerWidth * 0.25, y: window.innerHeight * 0.75 });
      setIsUserTurn(true);
    }
    
    setMessage(`${isUser ? userPokemon.name : opponentPokemon.name} used ${move.name} and did ${damage} damage.`);
    
    setTimeout(() => {
      setAttackAnimation(null);
      if (isUser) {
        setAttackTimeout(setTimeout(() => opponentAttack(), 1000));
      }
    }, 500);
  };
  const isBattleResultModalOpen = userHP <= 0 || opponentHP <= 0;

  useEffect(() => {
    if (isBattleResultModalOpen) {
      if (attackTimeout) {
        clearTimeout(attackTimeout);
      }
    }
  }, [attackTimeout]);

  const opponentAttack = () => {
    if (isBattleResultModalOpen) return;

    if (opponentPokemon.moves.length > 0) {
      const randomMove = opponentPokemon.moves[Math.floor(Math.random() * opponentPokemon.moves.length)];
      handleAttack(randomMove, false);
    }
  };

  const resetBattle = () => {
    setUserHP(userPokemon.hp);
    setOpponentHP(opponentPokemon.hp);
    setIsUserTurn(true);
  };

  
  return (
    <div className="relative w-screen h-screen bg-green-200 overflow-hidden">
      <VanishingAlert message={message} timeout={2000} />
      {isBattleResultModalOpen && (
        <BattleResultModal isWin={userHP > 0} onKeep={onFreshPokemon} onSwap={onSwap} onRetry={resetBattle} />
      )}
      <PokemonCard pokemon={opponentPokemon} isOpponent={true} />
      <PokemonCard pokemon={userPokemon} isOpponent={false} />
      
      <div className="absolute bottom-16 right-4 w-64 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Select a Move</h2>
        {userPokemon.moves.map((move, index) => (
          <MoveButton 
            key={index} 
            move={move} 
            onClick={() => {
              if (isUserTurn) {
                handleAttack(move, true);
              }
            }} 
          />
        ))}
      </div>

      {/* HP Bars */}
      <div className="absolute top-4 left-4 w-64 bg-white p-2 rounded-lg shadow-lg">
        <div className="text-sm font-bold mb-1">Opponent HP</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(opponentHP / opponentPokemon.hp) * 100}%` }}></div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 w-64 bg-white p-2 rounded-lg shadow-lg">
        <div className="text-sm font-bold mb-1">Your HP</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(userHP / userPokemon.hp) * 100}%` }}></div>
        </div>
      </div>

      {/* Attack Animation */}
      {attackAnimation && (
        <motion.div 
          className={`absolute w-4 h-4 bg-yellow-400 rounded-full`}
          style={{ left: attackAnimation.x, top: attackAnimation.y }}
          initial={{ scale: 0 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        ></motion.div>
      )}
    </div>
  );
};


const PokemonFightSceneWithData = () => {
  const { userPokemon, opponentPokemon, onSwap, onFreshPokemon } = usePokeController();

  // if no userPokemon or opp, render a super sick motion framer loading animation
  if (!userPokemon || !opponentPokemon) {
    return (
      <motion.div
        className="flex justify-center items-center w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-xl font-bold">Loading...</div>
      </motion.div>
    );
  }

  return (
    <PokemonFightScene userPokemon={userPokemon} opponentPokemon={opponentPokemon} onSwap={onSwap} onFreshPokemon={onFreshPokemon} />
  );
}

export default PokemonFightSceneWithData;