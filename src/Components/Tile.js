function Tile(props) {

    // function click() {
    //     props.switch(props.tile.index);
    // }

    function switchable() {
        // console.log(props.tile.index)
        if (props.canSwitch(props.tile.index)) {
            props.switch(props.tile.currentPosition, props.tile.index);
        }

    }

    return (
        <div className="col col-3 border">
            <div className="" onClick={switchable /*? click : null*/}>
                {props.tile.blank ? null : props.tile.image}
            </div>
        </div>
    )
}

export default Tile;