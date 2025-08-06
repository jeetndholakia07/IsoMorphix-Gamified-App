import { useState, useEffect, useImperativeHandle, forwardRef, type ForwardRefRenderFunction } from "react";
import type { GridBond, Point } from "./bondUtils";
import { isSameBond, getDotCenter, connectionExists } from "./bondUtils";
import SuccessModal from "../../../components/Modal/SuccessModal";
import AlertModal from "../../../components/Modal/AlertModal";
import AnimateHint from "../../../components/Animations/HintMove";
import AnimateSuperPower from "../../../components/Animations/SuperPower";
import AnimateReverseMove from "../../../components/Animations/ReverseMove";
import AnimateSolution from "../../../components/Animations/ShowSolution";
import "./animation.css";
import { useToast } from "../../../components/Toast/ToastContext";
import { useScore } from "../../../context/userSlice";
import { type Atom } from "./bondUtils";
import { useTranslation } from "react-i18next";
import StartGame from "./StartGame";
import { useMediaQuery } from "../../../utils/useMediaQuery";

interface AtomGridProps {
  rows?: number;
  cols?: number;
  hintBonds?: GridBond[];
  validBonds: GridBond[];
  specialAtoms?: Atom[];
  specialBonds?: GridBond[];
  setMonsterAppeared: (visible: boolean) => void;
  setMonsterMessage: (msg: string) => void;
  setMonsterPosition: (pos: Point) => void;
  points: number;
}

// Define the methods you want to expose via ref
export interface AtomGridRef {
  resetGame: () => void;
  reverseMove: () => void;
  hintMove: () => void;
  superPower: () => void;
  showSolution: () => void;
  spacing: number;
}

const AtomGrid: ForwardRefRenderFunction<AtomGridRef, AtomGridProps> = ({
  rows = 5,
  cols = 5,
  hintBonds = [],
  validBonds,
  specialAtoms = [],
  specialBonds = [],
  setMonsterAppeared,
  setMonsterMessage,
  setMonsterPosition,
  points
},
  ref
) => {
  useImperativeHandle(ref, () => ({
    resetGame,
    reverseMove,
    hintMove,
    superPower,
    showSolution,
    spacing
  }));

  const [selected, setSelected] = useState<Point[]>([]);
  const [correctConnections, setCorrectConnections] = useState<GridBond[]>([]);
  const [wrongConnections, setWrongConnections] = useState<GridBond[]>([]);
  type EatenMove = { bond: GridBond; dots: Point[] };
  const [eatenMoves, setEatenMoves] = useState<EatenMove[]>([]);
  const [moveHistory, setMoveHistory] = useState<{ type: "correct" | "wrong"; bond: GridBond }[]>([]);
  const [isChallengeComplete, setIsChallengeComplete] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [sucessOpen, setSuccessOpen] = useState<boolean>(false);
  const handleClose = () => setSuccessOpen(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [powerUpsActivated, setPowerUpsActivated] = useState({
    hintMove: false,
    reverseMove: false,
    superPower: false,
    solutionPower: false
  });
  const matches = useMediaQuery('(max-width: 800px)');
  const [spacing, setSpacing] = useState(70);
  const [dotSize, setDotSize] = useState(15);
  const [fontSize, setFontSize] = useState(18);
  const { t } = useTranslation();

  const { showToast } = useToast();

  useEffect(() => {
    if (matches) {
      setDotSize(25);
      setSpacing(70);
      setFontSize(dotSize * 1.2);
    } else {
      setDotSize(20);
      setSpacing(70);
      setFontSize(dotSize * 1.5);
    }
  }, []);

  // Dynamically calculate the viewBox size based on grid size
  const viewBoxWidth = cols * spacing + spacing * 1;
  const viewBoxHeight = rows * spacing + spacing * 2;

  const visibleDots = new Set<string>();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      visibleDots.add(`${r},${c}`);
    }
  }
  eatenMoves.forEach(move => {
    move.dots.forEach(dot => {
      visibleDots.delete(`${dot.row},${dot.col}`);
    });
  });

  // Random messages to display when a wrong move is made
  const getRandomMessage = () => {
    const messages = [
      "Oops! Wrong move pal !",
      "Now I will eat one of your dot!",
      "Oops! Try again pal!"
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  // Handle the monster animation and "eating" dots
  const handleWrongMove = (bond: GridBond) => {
    setMonsterAppeared(true);
    setMonsterMessage(getRandomMessage());
    setMonsterPosition({ row: Math.floor(rows / 2), col: Math.floor(cols / 2) });

    setTimeout(() => {
      makeDotsInvisible(bond);
    }, 1000);
    showToast("alert", t("alert"), t("Messages.alertEatMove"), 3000);
  };

  // Make some dots invisible after the wrong move
  const makeDotsInvisible = (bond: GridBond) => {
    const remaining: Point[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!eatenMoves.some(m => m.dots.some(d => d.row === r && d.col === c))) {
          remaining.push({ row: r, col: c });
        }
      }
    }

    if (remaining.length === 0) return;

    const randomDot = remaining[Math.floor(Math.random() * remaining.length)];
    const newEaten: EatenMove = { bond, dots: [randomDot] };

    setEatenMoves(prev => [...prev, newEaten]);

    setTimeout(() => {
      setMonsterAppeared(false);
    }, 1000);
  };


  // Function to check if the user has completed the challenge
  const checkChallengeCompletion = () => {
    // Check if the user has drawn all valid bonds
    const allBondsDrawn = validBonds.every(bond =>
      correctConnections.some(
        (userBond) =>
          (userBond.from.row === bond.from.row && userBond.from.col === bond.from.col && userBond.to.row === bond.to.row && userBond.to.col === bond.to.col) ||
          (userBond.to.row === bond.from.row && userBond.to.col === bond.from.col && userBond.from.row === bond.to.row && userBond.from.col === bond.to.col)
      )
    );

    // If all valid bonds are drawn, the challenge is complete
    if (allBondsDrawn) {
      setIsChallengeComplete(true);
      useScore(points);
      setSelected([]); // Deselect any remaining
    }
  };

  // Function to start the game and show preview for 3 seconds
  const startGame = () => {
    setShowPreview(true);
    showToast("info", "Info", t("Messages.rememberPattern"), 2000);    // Show all valid bonds
    setSelected([]);          // Clear any selections
    setGameStarted(true);
    setTimeout(() => {
      setShowPreview(false);  // Hide preview bonds
      showToast("info", "Info", t("Messages.playNow"), 2000);
    }, 3000);
  };

  // When user clicks a dot
  const handleClick = (row: number, col: number) => {
    if (!gameStarted) return; // disable clicks before game starts
    if (isChallengeComplete) return; // Disable clicks after completion
    if (!visibleDots.has(`${row},${col}`)) return null;

    const point = { row, col };

    if (selected.length === 0) {
      setSelected([point]);
    } else if (selected.length === 1) {
      const first = selected[0];
      const second = point;

      if (first.row === second.row && first.col === second.col) {
        setSelected([]);
        return;
      }

      if (connectionExists(first, second, correctConnections) || connectionExists(first, second, wrongConnections)) {
        setSelected([]);
        return;
      }

      const isCorrect = validBonds.some((bond) => isSameBond(first, second, bond));

      if (isCorrect) {
        setCorrectConnections((prev) => [...prev, { from: first, to: second }]);
        setMoveHistory((prev) => [...prev, { type: "correct", bond: { from: first, to: second } }]);
        setSelected([]);
        checkChallengeCompletion();
      } else {
        if (powerUpsActivated.superPower) {
          setAlertOpen(true);
          // Clear the selected dot so user can start fresh
          setSelected([]);
        } else {
          const wrongBond = { from: first, to: second };
          if (powerUpsActivated.superPower) {
            setAlertOpen(true);
          } else {
            setWrongConnections(prev => [...prev, wrongBond]);
            setMoveHistory(prev => [...prev, { type: "wrong", bond: wrongBond }]);
            handleWrongMove(wrongBond);
          }
          setSelected([]);
        }
      }
    };
  }

  // Reset game state
  const resetGame = () => {
    setCorrectConnections([]);
    setWrongConnections([]);
    setSelected([]);
    setIsChallengeComplete(false);
    setMoveHistory([]);
    setEatenMoves([]);
    setGameStarted(false);
    setShowPreview(false);
  };

  //Handle hint moves
  const hintMove = () => {
    const remaining = validBonds.filter(valid =>
      !correctConnections.some(conn => isSameBond(conn.from, conn.to, valid))
    );

    if (remaining.length === 0) return;

    const random = remaining[Math.floor(Math.random() * remaining.length)];
    setCorrectConnections(prev => [...prev, random]);
    setMoveHistory(prev => [...prev, { type: "correct", bond: random }]);
    checkChallengeCompletion();
    // Trigger hint move animation for 2 seconds
    setPowerUpsActivated({ ...powerUpsActivated, hintMove: true });
    setTimeout(() => setPowerUpsActivated({ ...powerUpsActivated, hintMove: false }), 2000);
  };

  // Reverse the last move
  const reverseMove = () => {
    if (moveHistory.length === 0) return;

    const lastMove = moveHistory[moveHistory.length - 1];

    if (lastMove.type === "correct") {
      setCorrectConnections((prev) => prev.slice(0, -1));
    } else {
      setWrongConnections((prev) => prev.slice(0, -1));
      // Reverse last eaten dot
      if (eatenMoves.length > 0) {
        setEatenMoves((prev) => prev.slice(0, -1));
      }
    }

    setMoveHistory((prev) => prev.slice(0, -1));
    // Trigger reverse move animation for 2 seconds
    setPowerUpsActivated({ ...powerUpsActivated, reverseMove: true });
    setTimeout(() => setPowerUpsActivated({ ...powerUpsActivated, reverseMove: false }), 2000);
    setIsChallengeComplete(false);
  };

  const superPower = () => {
    // Revert all eaten dots from previous wrong moves
    const remainingCorrectMoves = moveHistory.filter(m => m.type === "correct");
    setMoveHistory(remainingCorrectMoves);
    // Trigger super power move animation for 2 seconds
    setEatenMoves([]); // Restore all dots
    setWrongConnections([]);
    setPowerUpsActivated({ ...powerUpsActivated, superPower: true });
  };

  const showSolution = () => {
    // Set all valid bonds as correct connections (the full solution)
    setCorrectConnections(validBonds);

    // Clear wrong connections since we are revealing the full solution
    setWrongConnections([]);

    // Restore any dots that were eaten due to wrong connections
    setEatenMoves([]);

    // Trigger solution move animation for 2 seconds
    setPowerUpsActivated({ ...powerUpsActivated, solutionPower: true })
    setTimeout(() => setPowerUpsActivated({ ...powerUpsActivated, solutionPower: false }), 2000);
  }

  useEffect(() => {
    const allBondsDrawn = validBonds.every((bond) =>
      correctConnections.some((userBond) =>
        isSameBond(bond.from, bond.to, userBond)
      )
    );

    if (allBondsDrawn && !isChallengeComplete) {
      setIsChallengeComplete(true);
      setSelected([]); // Deselect any active dot
      setWrongConnections([]);
      setSuccessOpen(true);
    }
  }, [correctConnections, validBonds, isChallengeComplete]);

  return (
    <>
      {/* Show start button only before game starts */}
      {!gameStarted && (
        <StartGame handleClick={startGame} />
      )}
      {
        powerUpsActivated.reverseMove && <AnimateReverseMove />
      }
      {
        powerUpsActivated.hintMove && <AnimateHint />
      }
      {
        powerUpsActivated.superPower && <AnimateSuperPower />
      }
      {
        powerUpsActivated.solutionPower && <AnimateSolution />
      }
      {
        gameStarted && (
          <div className="flex w-100 h-100 justify-center items-center overflow-auto relative">
            <svg
              viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
              preserveAspectRatio="xMidYMid meet"
              className="flex items-center justify-center"
              style={{
                width: "100%",
                maxWidth: "800px",
                height: "100%",
                maxHeight: "800px",
                pointerEvents: gameStarted ? "auto" : "none" // disable svg pointer events until start
              }}
            >
              {/* Render valid bonds preview (during showPreview) */}
              {showPreview && validBonds.map((bond, idx) => {
                const from = getDotCenter(bond.from.row, bond.from.col, spacing);
                const to = getDotCenter(bond.to.row, bond.to.col, spacing);
                return (
                  <line
                    key={`preview-${idx}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#3b82f6" // blue color for preview
                    strokeWidth={4}
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Render hint bonds (background hexagon) */}
              {hintBonds.map((bond, idx) => {
                const from = getDotCenter(bond.from.row, bond.from.col, spacing);
                const to = getDotCenter(bond.to.row, bond.to.col, spacing);
                return (
                  <line
                    key={`hint-${idx}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#22c55e"
                    strokeWidth={6}
                    strokeDasharray="6,4"
                  />
                );
              })}

              {/* Render correct connections (solid green lines) */}
              {correctConnections.map((bond, idx) => {
                const from = getDotCenter(bond.from.row, bond.from.col, spacing);
                const to = getDotCenter(bond.to.row, bond.to.col, spacing);
                return (
                  <line
                    key={`correct-${idx}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#22c55e"
                    strokeWidth={6}
                    strokeLinecap="round"
                    className={`${powerUpsActivated.hintMove && "correct-bond hint-bond"} ${powerUpsActivated.solutionPower && "correct-bond hint-bond"}`}
                  />
                );
              })}

              {/* Render wrong connections (red dashed lines) */}
              {wrongConnections.map((bond, idx) => {
                const from = getDotCenter(bond.from.row, bond.from.col, spacing);
                const to = getDotCenter(bond.to.row, bond.to.col, spacing);
                return (
                  <line
                    key={`wrong-${idx}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="#ef4444"
                    strokeWidth={6}
                    strokeDasharray="6,4"
                    strokeLinecap="round"
                    className={`${powerUpsActivated.reverseMove ? "reverse-move-bond" : ""} ${powerUpsActivated.superPower ? "superpower-fade-in superpower-glow-effect" : ""} `}
                  />
                );
              })}

              {/* Render different atoms (O, H, N etc.) */}
              {specialAtoms.map((atom) => {
                const from = getDotCenter(atom.bond.from.row, atom.bond.from.col, spacing);
                const to = getDotCenter(atom.bond.to.row, atom.bond.to.col, spacing);
                const alignment = atom.align;
                return (
                  <g key={`special-atom-${atom.id}`}>
                    <circle
                      cx={from.x}
                      cy={to.y}
                      r={dotSize}
                      fill="#a855f7"
                      strokeWidth={2}
                    />
                    <text
                      x={from.x}
                      y={`${alignment === "top" ? to.y - dotSize * 1.0 : to.y + dotSize * 2.0}`}
                      textAnchor="middle"
                      dominantBaseline="baseline"
                      fontSize={fontSize}
                      fill="white"
                      style={{ pointerEvents: 'none' }}
                    >
                      {atom.type}
                    </text>
                  </g>
                );
              })}

              {/* Render dots */}
              {[...Array(rows)].map((_, r) =>
                [...Array(cols)].map((_, c) => {
                  if (!visibleDots.has(`${r},${c}`)) return null;
                  const disabled = isChallengeComplete || showPreview;
                  const isEaten = eatenMoves.some(move => move.dots.some(dot => dot.row === r && dot.col === c));

                  return (
                    <circle
                      key={`dot-${r}-${c}`}
                      cx={c * spacing + spacing}
                      cy={r * spacing + spacing}
                      r={dotSize}
                      fill={disabled ? "#4b5563" : "#2563eb"}
                      stroke={selected.length === 1 && selected[0].row === r && selected[0].col === c ? "#fbbf24" : "none"}
                      strokeWidth={4}
                      style={{
                        cursor: disabled ? "not-allowed" : "pointer",
                        pointerEvents: disabled ? "none" : "auto",
                        transition: "fill 0.3s ease"
                      }}
                      onClick={() => !disabled && handleClick(r, c)}
                      className={`${powerUpsActivated.superPower && "superpower-restored-dot"}${isEaten && "eaten-dot"}`}
                    />
                  );
                })
              )}
            </svg>
          </div>
        )
      }
      {sucessOpen && <SuccessModal score={points} showModal={sucessOpen} handleClose={handleClose} />}
      {
        alertOpen &&
        <AlertModal
          open={alertOpen}
          onClose={() => setAlertOpen(false)}
          title={t("Messages.superPowerActivated")}
          message={t("Messages.alertWrongMove")}
          buttonText={t("gotItBtn")}
        />
      }
    </>
  );
};

export default forwardRef(AtomGrid);