import { useEffect, useState } from "react";
import { classType } from "./data";

type props = {
    classesNr: () => number;
    classes: classType[];
};

export const ShowPercentageLogic = ({ classesNr, classes }: props) => {
    const [percentage, setPercentage] = useState<number[]>([]);

    useEffect(() => {
        const updatedPercentage: number[] = classes.map((class_) =>
            Math.round((class_.students.length / class_.maxNoOfStudents) * 100)
        );

        setPercentage(updatedPercentage);
    }, [classesNr(), classes]);

    const progressBars: any = {
        red: (
            <div className="progressBar" style={{ backgroundColor: "#ff6464" }}></div>
        ),
        yellow: (
            <div className="progressBar" style={{ backgroundColor: "#efef94" }}></div>
        ),
        green: (
            <div className="progressBar" style={{ backgroundColor: "#7fc87f" }}></div>
        ),
    };

    const showCorrectPercentageColor = () =>
        percentage.map((pa: number) => {
            let color = "red";
            if (pa < 25) color = "green";
            else if (pa >= 25 && pa < 75) color = "yellow";

            return (
                <div className="progressBarHolder">
                    <div className="progressBarPercentage">{pa}%</div>
                    {progressBars[color]}
                </div>
            );
        });

    return (
        <>
            <div>{showCorrectPercentageColor()}</div>
        </>
    );
};
