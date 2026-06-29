import { BabyCardSimple } from "./BabyCardSimple";

export const BabyCardList = ({ babies = [] }) => {
    if (!babies.length) {
        return (
            <p className="text-slate-400 text-sm">
                No tienes bebés registrados aún.
            </p>
        );
    }

    return (
        <div className="flex flex-row flex-wrap gap-4">
            {babies.map((baby) => (
                <BabyCardSimple key={baby.id} baby={baby} />
            ))}
        </div>
    );
};