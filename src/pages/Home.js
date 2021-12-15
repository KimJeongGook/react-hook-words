import React, { useState, useEffect } from "react";
import { Word, Input, Button } from "../components";
import logo from "../assets/images/logo_big.jpg"
import './Home.css'

const Home = () => {
    console.log(Button)
    const [wordList, setWordList] = useState([])
    const [loading, setLoading] = useState(true)
    const [words, setWords] = useState([])
    const [query, setQuery] = useState('') //검색 구현
    const [mag, setMag] = useState('')

    useEffect(() => {
        fetch('https://dictionary-search-words.herokuapp.com/api/words')
            .then(res => res.json())
            .then(result => {
                const { words } = result
                console.log(words)
                setLoading(false)
                // setWords(words)
                setWordList(words)
            })
    }, [])

    const handleChange = (e) => {
        if (e.target.value === '') {
            console.log('keyword is empty !')
            setQuery('')
            setWords([])
        }
        const { value } = e.target
        setQuery(value)
    }
    // 특수문자
    const checkIfStringHasSpecialCharacter = (str) => {
        const sp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/;
        const np = /\d/
        const ep = /[a-z]/
        return sp.test(str) || np.test(str) || ep.test(str);
    }
    const handleClicks = () => {
        if (checkIfStringHasSpecialCharacter(query)) {
            setMag(`다시 검색 하세요`)
            return
        }
        if (query) {
            const wordsFiltered = wordList.filter(word => {
                const r_word = word.r_word.toLowerCase()
                return r_word.includes(query)
            })
            setWords(wordsFiltered)
            setMag('')
        }
    }
    const HomeUI = () => {
        console.log(query, words)
        return (
            <>
                {mag ? mag : words.map(word => <Word
                    key={word._id}
                    r_word={word.r_word}
                    r_link={word.r_link}
                    r_seq={word.r_seq}
                    r_chi={word.r_chi}
                    r_pos={word.r_pos}
                    r_des={word.r_des}
                />
                )}
            </>
        )
    }

    return (
        <>
            {loading ? 'Loading...' : <div className="Home-container">
                <div><a href='/'>
                    <img src={logo} width='420px' /></a>
                </div><br />
                <Input name='search' type='text' placeholder="Search words ..."
                    value={query} onChange={handleChange} />
                <Button handleClick={handleClicks}>검색</Button>
                <br /><br />
                <div>검색 결과 : <b>{query}</b>&nbsp;&nbsp;{words.length}개</div>
                <hr /><br />
                <div>{query ? <HomeUI /> : <p>단어를 검색하세요 ... <br /><br />
                    예시 단어 : 학교, 학원, 소설, 수학, 역사</p>}</div>
            </div>}
        </>
    )
}

export default Home;