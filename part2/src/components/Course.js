import React from "react";

const Course = ({course}) => {
    let total = 0;
    total = course[0].parts.map( (part) => total += part.exercises);

    return (
        <div>
            <h1>{course[0].name}</h1>
            {course[0].parts.map((part) => <p key={part.id}>{part.name}  {part.exercises}</p>)}
            <p>total of {total[course[0].parts.length-1]} exercises</p>
            <NodeJs courses={course[1]}/>
        </div>
    )
};

const NodeJs = ({courses}) => {
    return (
        <div>
            <h1>
                {courses.name}
            </h1>
            {courses.parts.map( (part) => <p key={part.id}>{part.name}</p>)}
        </div>
    )
}

export default Course
