import React, { ReactNode } from "react";
import { H2 } from "../atomic";

type  PropsCard = {
    title: string;
    children: ReactNode;
    className?: string;
}

export const Card: React.FC<PropsCard> = ({className, title, children}) => (
    <div className={`card w-96 bg-primary-content ${className}`}>
        <div className="card-body">
            <H2 classname="card-title" content={title} />
            {children}
        </div>
    </div>
);