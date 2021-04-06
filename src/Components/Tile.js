function Tile(props) {

    let top = -100 * Math.floor(props.tile.currentPosition / props.gW);
    let left = -100 * (props.tile.currentPosition % props.gW)

    function switchable() {
        // console.log(props.tile.index)
        if (props.canSwitch(props.tile.index)) {
            props.switch(props.tile.index);
        }

    }

    return (
        <div className="col col-3 border overflow-hidden position-relative square">
        {/* {console.log(props.tile.gW)} */}
            <div className="" onClick={switchable /*? click : null*/}>
                {props.tile.blank ? null : <img className="position-absolute" src="../img/toiletMonster.png" style={{top, left}} alt="" />}
            </div>
        </div>
    )
}

export default Tile;