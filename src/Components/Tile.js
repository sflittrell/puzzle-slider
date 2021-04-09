function Tile(props) {

    let top = -100 * Math.floor(props.tile.currentPosition / props.gW);
    let left = -100 * (props.tile.currentPosition % props.gW)

    return (
        <div className="col col-3 border overflow-hidden position-relative square">
        {/* {console.log(props.tile.gW)} */}
            <div className="" onClick={() => props.switch(props.tile.index)}>
                {props.tile.blank ? null : <img className="position-absolute" src="../img/toiletMonster.png" style={{top, left}} alt="" />}
            </div>
        </div>
    )
}

export default Tile;