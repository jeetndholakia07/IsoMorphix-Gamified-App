import { type FC } from "react";
import { useMediaQuery } from "../../../utils/useMediaQuery.js";
import "../../../components/Animations/Monster/animation.css";

type Props = {
    monsterPosition: any;
    spacing?: number;
    monsterMessage: string;
};

const MonsterDisplay: FC<Props> = ({ monsterPosition, spacing = 70, monsterMessage }) => {
    const isMobile = useMediaQuery('(max-width: 800px)');

    return (
        <div
            className={`absolute flex items-center justify-center text-white font-bold`}
            style={{
                top: `${monsterPosition.row * (isMobile ? 50 : spacing) + (isMobile ? 40 : spacing)}px`,
                right: isMobile ? "2rem" : "4rem",
            }}
        >
            <div className="relative flex flex-col items-center">
                {/* Chat Bubble */}
                <div
                    className={`absolute text-nowrap bottom-full mb-2 flex items-center chat-bubble`}
                    style={{
                        maxWidth: isMobile ? "15rem" : "20rem",
                        fontSize: isMobile ? "0.75rem" : "0.875rem",
                        right: isMobile ? "5rem" : "1.5625rem",
                        top: isMobile ? "1.25rem" : "0"
                    }}
                >
                    <div
                        className={`bg-blue-500 text-white px-4 py-2 rounded-md ml-2 chat-bubble-text`}
                        style={{
                            maxWidth: isMobile ? "15rem" : "20rem",
                            fontSize: isMobile ? "0.75rem" : "0.875rem",
                            right: isMobile ? "1.25rem" : "1.5625rem",
                            top: isMobile ? "1.25rem" : "0"
                        }}
                    >
                        <p>{monsterMessage}</p>
                    </div>
                </div>

                {/* Monster Image */}
                <img
                    src="/assets/images/monster.png"
                    alt="Monster"
                    className={`monster ${isMobile ? 'h-16 w-16' : 'h-20 w-20'}`}
                />
            </div>
        </div>
    );
};

export default MonsterDisplay;
