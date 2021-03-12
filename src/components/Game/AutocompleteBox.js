import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const AutocompleteBox = (props) => {

    const [activeSuggestion, setActiveSuggestion] = useState(0)
    const [filteredSuggestions, setFilteredSuggestions] = useState(null) 
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [userInput, setUserInput] = useState('')
    const [wordList, setWordList] = useState([])

    const handleChange = (e) => {
        setUserInput(e.target.value)
        const splitInput = e.target.value.split(' ')
        const currentWord = splitInput[splitInput.length-1]

        const suggestions = filteredSuggestions.filter(
            suggestion => {
                suggestion.toLowerCase().includes(currentWord.toLowerCase())
            }
        )

        setFilteredSuggestions(suggestions)
        if (suggestions.length > 0) {
            showSuggestions(true)
        }
    }

    const handleKeyDown = (e) => {
        e.preventDefault()
        if (e.keyCode === 40) {
            if (activeSuggestion < filteredSuggestions.length) {
                setActiveSuggestion(activeSuggestion++)
            }
        } else if (e.keyCode === 38) {
            if (activeSuggestion > 0) {
                setActiveSuggestion(activeSuggestion--)
            }
        } else if (e.keyCode === 13) {
            setActiveSuggestion(0)
            setShowSuggestions(false)

            let tempWordList = wordList
            tempWordList.push(filteredSuggestions[activeSuggestion])

            setWordList([...tempWordList])
            setUserInput('')
        }
    }

    return (
        <>
        </>
    )
}

export default AutocompleteBox