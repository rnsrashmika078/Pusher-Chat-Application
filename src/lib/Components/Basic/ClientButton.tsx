import React from "react";

interface Props {
    formType: string;
    onClick?: () => void;
}
const ClientButton: React.FC<Props> = ({ formType, onClick }) => {
    return (
        <button>
            {formType === "signIn" ? (
                <span>
                    Don&apos;t have an account?
                    <span
                        onClick={onClick}
                        className="text-blue-500 hover:cursor-pointer"
                    >
                        {" Sign Up"}
                    </span>
                </span>
            ) : (
                <span>
                    Already have an account?
                    <span
                        onClick={onClick}
                        className="text-blue-500 hover:cursor-pointer"
                    >
                        {" Sign In"}
                    </span>
                </span>
            )}
        </button>
    );
};

export default ClientButton;
