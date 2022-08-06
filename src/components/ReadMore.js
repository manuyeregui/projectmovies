import { React, useState } from 'react'

function ReadMore(props) {

    const [isTruncated, setIsTruncated] = useState(true);

    const text = props.text;

    const subText = text.substring(0, props.limit);

    const resultString = isTruncated ? subText : text

    const toggleIsTruncated = () => {
        setIsTruncated(!isTruncated)
    }

    return (
        text.length >= (props.limit + 50) ?
        <p>
            {isTruncated ? resultString + '...' : resultString}
            <span className='read-more-button' onClick={toggleIsTruncated}> {isTruncated ? ' more' : ' less'} </span>
        </p>
        :
        <p>
            {text}
        </p>
    )
}

export default ReadMore