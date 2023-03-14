import React, { useState } from "react";
import "./cardStyle.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    canAssignStudent: (valid: boolean, student: string) => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, canAssignStudent }) => {
    const [inputValue, setInputValue] = useState("");
    const [displayValidationError, setDisplayValidationError] =
        useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
                inputValue
            )
        ) {
            canAssignStudent(true, inputValue);
            setDisplayValidationError(false);
            onClose();
        } else {
            canAssignStudent(false, "");
            setInputValue("");
            setDisplayValidationError(true);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modalCard">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <label>
                            {displayValidationError === false ? (
                                <input
                                    type="text"
                                    placeholder="Enter student name"
                                    value={inputValue}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <input
                                    type="text"
                                    style={{ backgroundColor: "#ff8181" }}
                                    value={inputValue}
                                    placeholder="Invalid name"
                                    onChange={handleInputChange}
                                />
                            )}
                        </label>
                        <div className="styleSmth">
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                            <div>
                                <button type="button" onClick={onClose}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
