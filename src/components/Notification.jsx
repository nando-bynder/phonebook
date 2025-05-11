const Notifier = ({ message }) => {
    const notificationStyle =
    {
        color: 'green',
        backgroud: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid'
    }

    if (message === null) {
      return null
    }
    
    return (
      <div style ={notificationStyle}>
        {message}
      </div>
    )
  }


  export default Notifier