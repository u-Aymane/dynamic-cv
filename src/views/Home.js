import React, { useEffect, useState } from "react";
import InputsDetails from "../componants/InputsDetails";
import InputsCompetence from "../componants/InputsCompetence";
import { useGlobalState } from "..";

const Home = () => {

    const [counter, setCounter] = useState(0)
    const [inputVals, setInputVals] = useGlobalState('inputVals')
    const [LeftInputs, setLeftInputs] = useState([<InputsDetails value={counter}/>])

    const [details, setDetails] = useState([])
    const [competence, setCompetence] = useState([])


    

    const addLeftInput = () => {
        setLeftInputs([
            ...LeftInputs,
            <InputsDetails value={counter + 1}/>
        ])

        setCounter(counter + 1)

        
    }

    const minusLeftInput = () => {
        setLeftInputs([
            ...LeftInputs.slice(1)
        ])
    }

    const [RightInputs, setRightInputs] = useState([<InputsCompetence value={counter}/>])

    const addRightInput = () => {
        setRightInputs([
            ...RightInputs,
            <InputsCompetence value={counter + 1} />
        ])

        setCounter(counter + 1)
    }

    const minusRightInput = () => {
        setRightInputs([
            ...RightInputs.slice(1)
        ])
    }
    

    useEffect(() => {
      let temp = []
      Object.keys(inputVals.details).map((val) => {
        return temp.push(
            <div className="element">
                <label>{inputVals.details[val].title}</label>
                <p>{inputVals.details[val].value}</p>
            </div>
        )
      })

      setDetails(temp)
    }, [inputVals.details])


    useEffect(() => {
        let temp = []
        Object.keys(inputVals.competence).map((val) => {
            const competence = inputVals.competence[val]
            return temp.push(
                <div className="wrp-details">
                    <label>{competence.title}</label>
                    <label>{competence.subtitle}</label>
                    <div className="li-wrapper">
                        {competence.value ? competence.value.split(",").map((vals) => {
                            return <li>{vals}</li>
                        }) : null}
                    </div>
                </div>
            )
        })

        setCompetence(temp)
      }, [inputVals.competence])

      const handleChange = (e) => {
        setInputVals({
            ...inputVals,
            name: e.target.value
        })
      }


      const handleUpload = (e) => {
        const file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            setInputVals({
                ...inputVals,
                photo: reader.result
            })
        }.bind();
        
    }

    const resetConfig = () => {
        setInputVals({
            details: [],
            competence: [],
            name: "Sofia Benjelloun",
            photo: "/assets/img/avatar.jpg"
        })
    }

    

    return (
        <>
        <div className="navbar">
            <img src="/assets/img/logo.png" alt="logo" className="logo"/>
        </div>
        <div className="wrapper">
            <div className="cv-w">
                <div className="fields-wrapper">
                    <label>Nom & Prenom</label>
                    <input placeholder="Nom & Prenom" name="name" onChange={handleChange} />
                    <div className="navigation">
                        <label htmlFor="upload" className="upload">Upload Photo</label>
                        <input id="upload" name="upload" type="file" style={{display: "none"}} onChange={handleUpload}/>
                        <button className="upload" onClick={resetConfig}>Réinitialiser le CV</button>
                    </div>

                    <div className="detail-container">
                        <div className="add">
                            <label htmlFor="prenom" className="menu">Partie gauche</label>    
                            <div className="navigation">
                                <button className="add-btn" onClick={addLeftInput}>+</button>
                                <button className="remove-btn" onClick={minusLeftInput}>-</button>
                            </div>
                        </div>
                        {LeftInputs}
                    </div>

                    <div className="detail-container">
                        <div className="add">
                            <label htmlFor="prenom" className="menu">Partie droite</label>    
                            <div className="navigation">
                                <button className="add-btn" onClick={addRightInput}>+</button>
                                <button className="remove-btn" onClick={minusRightInput}>-</button>
                            </div>
                        </div>
                        {RightInputs}
                    </div>

                </div>
                <div className="cv-wrapper">
                    <div className="cv-header">
                        <div className="avatar-wrapper">
                            <img src={inputVals.photo} alt="avatar" />
                        </div>
                        <div className="name">{inputVals.name.toUpperCase()}</div>
                        
                    </div>
                    <div className="cv-body">
                        <div className="detail">
                            <label>Information personnel :</label>
                            <div className="detail-cv">
                                {details}
                            </div>
                            
                        </div>

                        <div className="competence">
                            {competence}
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
        
        </>
    )
}

export default Home