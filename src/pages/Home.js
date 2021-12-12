import React, { useState, useEffect} from "react";
import { Word } from "../components";

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [words, setWords] = useState([])

    useEffect( () => {
        fetch('https://dictionary-search-words.herokuapp.com/api/words')
        .then( res => res.json())
        .then( result => {
            const {words} = result
            console.log(words)
            setLoading(false)
            setWords(words)
        })
    }, [])

    const homeUI = words.map(word => <Word key={word._id}
                                            r_word={word.r_word} 
                                            r_link={word.r_link}
                                            r_seq={word.r_seq}
                                            r_chi={word.r_chi}
                                            r_pos={word.r_pos}
                                            r_des={word.r_des}
                                        />
        )
    return (
        <div>
            {loading? 'Loading...' : homeUI}
        </div>
    )
}

export default Home;