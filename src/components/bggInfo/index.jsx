import useBGGdata from "./useBGGdata";
import clsx from "clsx";
const NO_RANK_VALUE = 999999999;

const BGGinfoLabel = ({ label, children, contextFor }) => {
  return (
    <div className="j">
      <div className="whitespace-nowrap leading-none">
        <span
          className={clsx("text-[10px] mr-1", {
            "opacity-60": contextFor === "black",
            "opacity-90": contextFor !== "black",
          })}
        >
          {label}
        </span>
      </div>
      {children}
    </div>
  );
};

const BGGinfo = ({ game, contextFor = "black", className }) => {
  const { isInBGG, rate, rateColor, rank, weight, weightVotes, dependency } =
    useBGGdata({ game });

  return (
    game &&
    isInBGG && (
      <div className={className}>
        <div className="flex flex-wrap gap-x-4 gap-y-4">
          <BGGinfoLabel label="Rating">
            <div
              className="mt-1 text-sm text-center font-bold w-10 ssh-8 leading-6 rounded-full text-white"
              style={{ backgroundColor: rateColor }}
            >
              {rate}
            </div>
          </BGGinfoLabel>
          <BGGinfoLabel label="Ranking" contextFor={contextFor}>
            <div className="text-xs">{rank === NO_RANK_VALUE ? "-" : rank}</div>
          </BGGinfoLabel>
          <BGGinfoLabel label="Dificultad" contextFor={contextFor}>
            <div className="text-xs">
              <span className="font-bold">{weight}</span> / 5
            </div>
          </BGGinfoLabel>
          <BGGinfoLabel label="Dependencia" contextFor={contextFor}>
            <div className="text-xs">{dependency} / 5</div>
          </BGGinfoLabel>
        </div>
      </div>
    )
  );
};

export default BGGinfo;
