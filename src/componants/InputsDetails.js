import React, { useEffect } from "react";
import { useGlobalState } from "..";

const InputsDetails = (props) => {

    console.log(props)

    const [inputVals, setInputVals] = useGlobalState('inputVals')


    const handleChange = (e) => {
        setInputVals({
            ...inputVals,
            details: {
                ...inputVals.details,
                [e.target.id]: {
                    ...inputVals.details[e.target.id],
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
           <input placeholder="Valeur" id={props.value} name="value" onChange={handleChange} />
        </>
    )
}

export default InputsDetails