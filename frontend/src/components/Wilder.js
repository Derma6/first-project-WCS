import React from 'react';
import { easyFetch } from '../App';
import blank_profile from '../assets/blank_profile.png';
import Skill from './Skill';

const Wilder = ({ data, setWildersData }) => {
    return (
        <article className="card">
            <button
                className="button"
                onClick={() => {
                    const easyDelete = async () => {
                        try {
                            await fetch(
                                `http://localhost:3001/api/wilder?id=${data.id}`,
                                {
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    method: 'DELETE',
                                }
                            );
                        } catch {
                            alert('Une erreur est survenu.');
                        } finally {
                            easyFetch(
                                'http://localhost:3001/api/wilder',
                                setWildersData
                            );
                        }
                    };
                    easyDelete();
                }}
            >
                X
            </button>
            <img src={blank_profile} alt="Jane Doe Profile" />
            <h3>{data.name}</h3>
            <p>{data.description}</p>
            <h4>Wild Skills</h4>
            <ul className="skills">
                {data.grades.map((data, index) => {
                    return (
                        <Skill
                            key={index}
                            title={data.skill.name}
                            votes={data.level}
                        />
                    );
                })}
            </ul>
        </article>
    );
};

export default Wilder;
