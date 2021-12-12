import React from "react";

const Word = ({ r_word, r_seq, r_chi, r_pos, r_des, r_link}) => {
    return (
        <div>
            <a href = {r_link} target="_blank">{r_word}</a>
            <sup>{r_seq ? r_seq : ""}</sup>
            {r_chi}
            {r_pos}
            <p>{r_des}
                <button type="button" className="btn btn-outline-dark">
                    <a href={r_link} target="_blank" rel="noreferrer">자세히 보기</a>
                </button>
            </p>
        </div>
    )
}

export default Word;