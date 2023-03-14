import { classType } from "./data";

type props = {
    classes: classType[];
    setClasses: (cls: classType[]) => void;
    setModalOpen: (value: boolean) => void;
    class_: classType;
    setClassName: (className: string) => void;
};

export const ShowDataLogic = ({
    classes,
    setClasses,
    setModalOpen,
    class_,
    setClassName,
}: props) => {
    const showCorrectAddStudentButton = () => {
        if ((class_.students.length / class_.maxNoOfStudents) * 100 !== 100) {
            return (
                <button
                    className="button"
                    onClick={() => {
                        setModalOpen(true);
                        setClassName(class_.name);
                    }}
                >
                    Add Student
                </button>
            );
        } else {
            return (
                <button style={{ backgroundColor: "#bfbfbf" }}> Add Student</button>
            );
        }
    };

    const searchForElementToDelete = () =>
        setClasses(
            classes.filter((class_1: classType) => class_1.name !== class_.name)
        );

    return (
        <>
            <div className="card">
                <div>
                    <div className="card-content">
                        <b>{class_.name}</b>
                        <p>{class_.teacher}</p>
                    </div>
                </div>
                <div className="buttons">
                    <button className="button" onClick={() => searchForElementToDelete()}>
                        Delete
                    </button>
                    {showCorrectAddStudentButton()}
                </div>
            </div>
        </>
    );
};
