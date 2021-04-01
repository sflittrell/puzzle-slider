function Tile(props) {

    function click() {
        props.switch(props.tile.index);
    }

    function switchable() {
        props.canSwitch(props.tile.index);
    }

    return (
        <div className="col col-3 border">
            <div className="" onClick={switchable ? click : null}>
                {props.tile.blank ? null : props.tile.image}
            </div>
        </div>
    )
}

export default Tile;