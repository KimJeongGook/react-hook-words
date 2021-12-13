import React, { useState, useEffect } from "react";
import { Word, Input } from "../components";
import './Home.css'

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [words, setWords] = useState([])
    const [query, setQuery] = useState('') //검색 구현

    useEffect(() => {
        fetch('https://dictionary-search-words.herokuapp.com/api/words')
            .then(res => res.json())
            .then(result => {
                const { words } = result
                console.log(words)
                setLoading(false)
                setWords(words)
            })
    }, [])

    const handleChange = (e) => {
        const { value } = e.target
        setQuery(value)
    }

    const homeUI = words
        .filter(word => {
            const r_word = word.r_word.toLowerCase()
            const q = query.toLowerCase()
            return r_word.includes(q)
        })
        .map(word => <Word
            key={word._id}
            r_word={word.r_word}
            r_link={word.r_link}
            r_seq={word.r_seq}
            r_chi={word.r_chi}
            r_pos={word.r_pos}
            r_des={word.r_des}
        />
        )
    return (
        <>

            {loading ? 'Loading...' : <div className="Home-container">
                <div><a href='/'>
                    <img src="./src/assets/images/logo_big.jpg" width='420px' /></a>
                </div><br />

                <Input name='search' type='text' placeholder="Search words ..."
                    value={query} onChange={handleChange} />
                <br /><br />
                <div>검색 결과 : {query ? homeUI.length : '0'}개</div>
                <hr />
                <br />
                <div>{query ? homeUI : <p>단어를 검색하세요 ... <br /><br />
                    예시 단어 : 학교, 학원, 소설, 수학, 역사</p>}</div>
            </div>}
        </>
    )
}

export default Home;