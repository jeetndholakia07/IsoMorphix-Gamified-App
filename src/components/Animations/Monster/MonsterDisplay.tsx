import type { FC } from "react";
import "../../../components/Animations/Monster/animation.css";

type Props = {
    monsterPosition: any;
    spacing?: number;
    monsterMessage: string;
}

const MonsterDisplay: FC<Props> = ({ monsterPosition, spacing = 70, monsterMessage }) => {
    return (
        <div
            className="absolute flex items-center right-[0.5rem] md:right-[4rem] justify-center text-white text-xl font-bold"
            style={{
                top: `${monsterPosition.row * spacing + spacing}px`,
            }}
        >
            <div className="relative flex flex-col items-center">
                {/* SVG Chat Bubble */}
                <div className="absolute text-wrap right-25 top-0 bottom-full mb-2 w-30 flex items-center chat-bubble">
                    <div className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 max-w-xs chat-bubble-text">
                        <p className="text-sm">{monsterMessage}</p>
                    </div>
                </div>

                {/* Monster Image */}
                <img
                    src="/assets/images/monster.png"
                    alt="Monster"
                    className="monster h-20 w-20"
                />
            </div>
        </div>
    )
}
export default MonsterDisplay;