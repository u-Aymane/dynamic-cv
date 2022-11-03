import React  from "react";
import { useGlobalState } from "..";
import { useEffect } from "react";

const InputsCompetence = (props) => {

    console.log(props)

    const [inputVals, setInputVals] = useGlobalState('inputVals')


    const handleChange = (e) => {
        setInputVals({
            ...inputVals,
            competence: {
                ...inputVals.competence,
                [e.target.id]: {
                    ...inputVals.competence[e.target.id],
                    [e.target.name]: e.target.value
                }
                
            }
        })

    }
    

    useEffect(() => {
      console.log(inputVals)
    }, [inputVals])
    



    return (
        <>
           <input placeholder="Titre" id={props.value} name="title" onChange={handleChange} />
           <input placeholder="Sous-titre" id={props.value} name="subtitle" onChange={handleChange} />
           <input placeholder="Valeur" id={props.value} name="value" onChange={handleChange} />
        </>
    )
}

export default InputsCompetence