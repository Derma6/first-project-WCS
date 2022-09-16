import React, { useEffect, useState } from 'react';
import { easyFetch } from '../App';
import SkillBloc from './SkillBloc';

const AddWilderForm = ({ setWildersData, setDisplayAddWilderForm }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [possibleSkill, setPossibleSkill] = useState([]);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        easyFetch('http://localhost:3001/api/skill', setPossibleSkill);
    }, []);

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const postData = async () => {
                        try {
                            await fetch('http://localhost:3001/api/wilder', {
                                headers: {
                                    Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                method: 'POST',
                                body: JSON.stringify({ name, description }),
                            });

                            await fetch(
                                'http://localhost:3001/api/wilder/add-skill',
                                {
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                    },
                                    method: 'POST',
                                    body: JSON.stringify(skills),
                                }
                            );
                        } catch {
                            alert('Une erreur est survenu.');
                        } finally {
                            await easyFetch(
                                'http://localhost:3001/api/wilder',
                                setWildersData
                            );
                            setDisplayAddWilderForm(false);
                        }
                    };
                    postData();
                }}
            >
                <div>
                    <h3>Nouveau Wilder</h3>
                    <input
                        type="text"
                        // value={name}
                        placeholder={'Name'}
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                    />
                    <textarea
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <div className="add-skill-title-bloc">
                        <h3>Ajouter des skills</h3>
                        <button
                            className="button"
                            type="button"
                            onClick={() => {
                                setSkills([
                                    ...skills,
                                    { name, skill: '', grade: '5' },
                                ]);
                            }}
                        >
                            +
                        </button>
                    </div>
                    {skills.map((obj, index) => {
                        return (
                            <SkillBloc
                                key={index}
                                possibleSkill={possibleSkill}
                                index={index}
                                skills={skills}
                                setSkills={setSkills}
                            />
                        );
                    })}
                </div>
                <button className="button" type="submit">
                    Ajouter
                </button>
            </form>
        </div>
    );
};

export default AddWilderForm;
