const Person = (props) =>{
    return(
    <li>{props.name} - {props.number}
    <button onClick = {props.removeName}> delete </button>
    </li>
    )
}

export default Person