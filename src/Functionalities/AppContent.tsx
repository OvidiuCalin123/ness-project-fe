import "./cardStyle.css";
import { useState } from "react";
import Modal from "./Modal";
import { classesMock, classType } from "./data";
import { ShowDataLogic } from "./ShowDataLogic";
import { ShowPercentageLogic } from "./ShowPercentageLogic";

export function AppContent() {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<classType[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [classes, setClasses] = useState<classType[]>(classesMock);
    const [className, setClassName] = useState<string>("");

    const getData = () => {
        return classes.map((class_: classType) => (
            <ShowDataLogic
                classes={classes}
                setClasses={setClasses}
                setModalOpen={setModalOpen}
                class_={class_}
                setClassName={setClassName}
            />
        ));
    };

    const getDataSearch = () => {
        return searchResults.map((class_: classType) => (
            <ShowDataLogic
                classes={classes}
                setClasses={setClasses}
                setModalOpen={setModalOpen}
                class_={class_}
                setClassName={setClassName}
            />
        ));
    };

    const handleClickEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);

        const results = classes.filter((person) =>
            person.teacher.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setSearchResults(results);
    };

    return (
        <>
            {modalOpen && (
                <Modal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    canAssignStudent={(valid: boolean, student: string) => {
                        if (valid) {
                            let classesTmp: classType[] = classes;

                            classesTmp.map((class_): void => {
                                if (class_.name === className) {
                                    class_.students.push({ name: student });
                                }
                            });

                            setClasses(classesTmp);
                        }
                    }}
                />
            )}
            <div className="page">
                <div className="app">
                    <div className="appBodyWrapper">
                        <div className="searchBarWrapper">
                            <div className="searchBar">
                                <input
                                    className="input"
                                    value={searchTerm}
                                    type="text"
                                    placeholder="Search for teacher's name"
                                    onChange={handleClickEvent}
                                />
                            </div>
                        </div>
                        <div className="contentWrapperForContentWrapper">
                            <div className="contentWrapper">
                                {searchTerm === "" ? getData() : getDataSearch()}
                            </div>
                        </div>
                    </div>
                    <div className="progressBarWrapper">
                        <div>
                            <ShowPercentageLogic
                                classes={classes}
                                classesNr={(): number => {
                                    for (const class_ of classes) {
                                        if (class_.name === className) {
                                            let count = 0;
                                            for (const student of class_.students) {
                                                count += 1;
                                            }
                                            return count;
                                        }
                                        // I did this implementation because for some reason the useEffect in ShowPercentageLogic the dependency 
                                        //array wouldnt trigger even tho `classes` was changing
                                    }
                                    return 0;
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
