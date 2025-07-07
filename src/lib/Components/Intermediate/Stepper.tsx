"use client";
import React, { useState } from "react";
import Button from "../Basic/Button";
import Spinner from "./Spinner";
interface StepsProperties {
    title: string;
}
interface StepperProps {
    steps: StepsProperties[];
}
const Stepper = ({ steps }: StepperProps) => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [complete, setComplete] = useState<number>(0);
    const handleStepIncrement = (status: string) => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            setComplete(currentStep + 1);
        }
        if (status === "Finish") {
            setComplete(currentStep + 1);
        }
    };
    const handleStepDecrement = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setComplete(currentStep - 1);
        }
    };

    const width =
        currentStep == 0 ? "w-0" : `w-${currentStep}/${steps.length - 1}`;

    if (steps.length < 2)
        return <div className="text-center">Least 2 steps need</div>;
    return (
        <div>
            <div className="relative flex z-0 justify-between max-w-sm m-auto">
                {steps.map((step, index) => (
                    <div key={index} className="z-50">
                        <div className="flex flex-col gap-1 justify-center items-center">
                            <span
                                className={`transition-all duration-900 flex justify-center items-center rounded-full w-5 h-5 p-6  text-white text-2xl ${
                                    currentStep >= index
                                        ? complete > index
                                            ? "bg-green-600"
                                            : "bg-blue-500"
                                        : "bg-gray-500"
                                }`}
                            >
                                {complete == index ? "-" : index + 1}
                            </span>
                            <p className=" text-center text-gray-600">
                                {step.title}
                            </p>
                        </div>
                    </div>
                ))}
                <div
                    className={`z-0 absolute h-1 rounded-l-2xl bg-gray-600 flex justify-between mx-11 w-9/12 my-6`}
                >
                    <div
                        className={`transition-all duration-300  z-0 relative h-1 rounded-l-2xl  bg-green-500 ${width}`}
                    ></div>
                </div>
            </div>
            <div className="flex justify-center gap-5">
                <Button
                    name={currentStep == steps.length - 1 ? "Finish" : "Next"}
                    size="md"
                    radius="full"
                    onClick={() =>
                        handleStepIncrement(
                            currentStep == steps.length - 1 ? "Finish" : "Next"
                        )
                    }
                />
                <Button
                    name="Back"
                    size="md"
                    radius="xl"
                    variant="windows"
                    onClick={handleStepDecrement}
                    disabled={steps.length > complete ? false : true}
                />
            </div>
        </div>
    );
};

export default Stepper;
