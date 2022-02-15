import './Loading.css'

const Loading = () => {
    return (
        <div className="loading">
            <div className="text-flex">
                <div className="text" id="U"><div>U</div><div className="dot"></div></div>
                <div className="text" id="S"><div>S</div><div className="dot"></div></div>
                <div className="text" id="T"><div>T</div><div className="dot"></div></div>
                <div className="text" id="H"><div>H</div><div className="dot"></div></div>
            </div>
        </div>
    )
}

export default Loading
