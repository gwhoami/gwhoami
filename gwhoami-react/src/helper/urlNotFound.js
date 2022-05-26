import { faFaceFrown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const UrlNotFound = React.memo(({iconSize="text-8xl", message="OOPS URL not found!"}) => {
    return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <div className="container max-w-xl mx-auto flex-1 flex items-center justify-center">
                <FontAwesomeIcon icon={faFaceFrown} className={`${iconSize} text-dodge-b`}/>
                <div className="text-4xl ml-5">{message}</div>
            </div>
        </div>
    );
});

export default UrlNotFound;